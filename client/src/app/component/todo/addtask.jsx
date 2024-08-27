import { useState } from "react";

const AddTask = (props) => {

    const [todoText, setTodoText] = useState('');

    const btnAddClick= ()=>{
        props.onAdd(todoText);
    }

    const todoTextChange = (e)=>{
        setTodoText(e.target.value);
    }

    return (
        <>
            <div className='input-group w-50'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'><strong>Description</strong> </span>
                </div>
                <input id='taskText' className='form-control' type='text' value={todoText} onChange={(e)=>{todoTextChange(e)}}></input>
                <input id='btnAdd' type='button' onClick={btnAddClick} className='px-3 btn btn-secondary' value='Add'></input>
            </div>
        </>
    )
}

export default AddTask;