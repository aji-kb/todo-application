import {useState, useEffect} from 'react';
import AddCategory from './addcategory';
import './category.css';
import { fetchData, postData } from '../../../service/service';


const Category = ()=>{

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({id: '0', categoryName: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const onRowSelected = (selectedCategoryId)=>{
        const category = categories.find((x)=>x.id == selectedCategoryId)
        setSelectedCategory(category);
    }

    const loadCategories = async ()=>{
        const savedCategoriesList = await fetchData("task/categories");
        if(savedCategoriesList != null)
        {
            setCategories(savedCategoriesList);
        }
    }

    useEffect(()=>{
        loadCategories();
    },[])

    const saveClick = async (e)=>{

         //call API to save the category and reload the grid
         console.log(e);
         let action = 'POST';
         if(e.id > 0)
         {
            action = 'PUT';
         }
        
         const response = await postData("task/category", e, action);
        if(response != null && response.message == undefined)
        {
            //save successful. now reload the list
            loadCategories();
        }
        else
        {
            setErrorMessage(response.message);
            setSelectedCategory(e);

        }
    }

    const btnDeleteClick = async (id)=>{
        const response = await postData("task/category/" + id, {}, "DELETE");

        if(response != null)
        {
            loadCategories();
        }
        else
        {
            alert('Error during delete');
            console.log(response);
        }
    }

    return (
        <>
            <div className="container w-75">
                <div className="row mb-5">
                    <div className="col">
                        <AddCategory save={(e)=>saveClick(e)} selectedCategory={selectedCategory} errorMessage={errorMessage}/>
                    </div>
                </div>   
                <div className="row mb-5">
                    <div className="col">
                        {
                        categories.length > 0?
                        <div className='text-start'><h6><strong>Categories</strong></h6>
                        <table className="table table-bordered my-4">
                            <thead>
                                <tr>
                                    <td className='text-center action-column'><strong>Actions</strong></td>
                                    <td className="text-start px-4"><span><strong>Category Name</strong></span></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((item)=>{
                                    return <tr key={item.id}>
                                                <td className='action-column'>
                                                    <img src='/images/delete.png' className='grid-image action-link mx-3' onClick={()=>btnDeleteClick(item.id)}></img>
                                                    <img src='/images/edit.png' className='grid-image action-link' onClick={()=>onRowSelected(item.id)}></img>
                                                </td>
                                                <td className="text-start"><span className="px-3">{item.categoryName}</span></td>
                                            </tr>
                                })}
                            </tbody>
                        </table></div>
                        :'No Categories! Start adding categories'}
                    </div>
                </div>
            </div>
            


        </>
    )
}

export default Category;