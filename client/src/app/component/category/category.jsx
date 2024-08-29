import {useState, useEffect} from 'react';
import AddCategory from './addcategory';

const Category = ()=>{

    return (
        <>
            <AddCategory/>
            <div className="container">
                <span>Category List</span>
            </div>
        </>
    )
}

export default Category;