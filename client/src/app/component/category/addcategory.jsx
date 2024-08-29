import {useState, useEffect} from 'react';

const AddCategory = ()=>{

    const [category, setCategory] = useState({categoryName: ''});

    const txtCategoryNameChangeHandler=(e)=>{
        setCategory((prevCategory)=>({...prevCategory, categoryName: e.target.value}));
    }

    const btnSaveClick=()=>{
        console.log(category);
    }

    return (
        <>
            <h6>Add Category</h6>
            <div className="container">
                <div className="row">
                    <label for='txtCategoryName' className='col-2 col-form-label'>Category</label>
                    <div className="col-10">
                        <input type='text' id='txtCategoryName' value={category.categoryName} className='form-control' onChange={(e)=>txtCategoryNameChangeHandler}></input>
                    </div>
                </div>
                <div className="row">
                    <button className='col-4 btn' onClick={btnSaveClick}>Save</button>
                </div>
            </div>
        </>
    )
}

export default AddCategory;