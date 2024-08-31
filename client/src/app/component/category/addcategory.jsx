import {useState, useEffect} from 'react';
import './addcategory.css';

const AddCategory = (props)=>{

    const [category, setCategory] = useState({Id: '0', categoryName: ''});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        console.log('selected category input')
        setCategory(props.selectedCategory);

    }, [props.selectedCategory])

    useEffect(()=>{
        setErrorMessage(props.errorMessage);
    }, [props.errorMessage]);

    const txtCategoryNameChangeHandler=(e)=>{
        setErrorMessage('');
        setCategory((prevCategory)=>({...prevCategory, categoryName: e.target.value}));
    }

    const btnSaveClick=()=>{
        if(category.categoryName != '')
        {
            //Propage the save to parent screen where API is called to save to the database
            props.save(category);
        }
        else
            setErrorMessage('Category Name is required');
        setCategory({categoryName: ''});
    }

    const btnClearClick = ()=>{
        setCategory({categoryName: ''});
    }

    return (
        <>
            <div className="mt-5">
                <div className="container mt-5">
                    <div className="row mb-3">
                        <label for='txtCategoryName' className='col-sm-2 col-form-label'>Category Name</label>
                        <div className="col-auto">
                            <input type='text' id='txtCategoryName' required value={category.categoryName} className='form-input' onChange={(e)=>txtCategoryNameChangeHandler(e)}></input>
                            <span className='error-messages mx-3'>{errorMessage}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-2'>
                        </div>
                        <div className='col-auto text-start'>
                            <button className='btn btn-info' onClick={btnSaveClick}>Save</button>
                            <button className='btn btn-info mx-3' onClick={btnClearClick}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory;