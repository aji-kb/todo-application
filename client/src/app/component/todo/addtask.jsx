import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './addtask.css';
import Select from "react-select";
import { fetchData, postData } from '../../../service/service';

const AddTask = (props) => {


    const [task, setTask] = useState({taskName: '', dueDate: new Date(), categoryId: 0, isCompleted: false});
    const [options, setOptions] = useState([])

    const btnAddClick= ()=>{
        console.log(task);
        props.onAdd(task);
    }

    const todoTextChange = (e)=>{
        setTask(prevTask => ({...prevTask, taskName: e.target.value}));
    }

    const categoryChangeHandler = (e)=>{
        setTask( prevTask => ({...prevTask, categoryId: e.value}));
    }

    const loadCategories = async ()=>{
        const savedCategoriesList = await fetchData("task/categories");
        if(savedCategoriesList != null)
        {
            const catOptions = savedCategoriesList.map((item)=>({label: item.categoryName, value: item.id}));
            setOptions(catOptions);
            return catOptions;
        }
    }

    useEffect(()=>{
        loadCategories();
    }, []);

    return (
        <>
            <div className="container text-start">
                <div className="row mb-3">
                    <div className="col-sm-6">
                    <span className='error-messages mx-3'>{props.errorMessage}</span>
                    </div>
                </div>
                <div className="row mb-3">
                        <label htmlFor='inputDescription' className='col-sm-2 col-form-label'>Task</label>
                        <div className='col-sm-6'>
                            <input id='inputDescription' className='form-control' type='text' value={task.taskName} onChange={(e)=>{todoTextChange(e)}} placeholder="Task Description"></input>
                        </div>
                        
                </div>
                <div className="row mb-3">
                    <label htmlFor='inputDate' className='col-sm-2 col-form-label'>Due Date</label>
                    <div className="col-sm-6">
                        <DatePicker id='inputDate' selected={task.dueDate} className="form-control" placeholderText="Due Date" onChange={(date)=>setTask(prevTask => ({...prevTask, dueDate: date}))}></DatePicker>
                    </div>
                </div>
                <div className="row mb-5">
                    <label htmlFor='category' className='col-sm-2 col-form-label'>Category</label>
                    <div className="col-sm-6">
                        <Select id='category' defaultValue={task.categoryId} onChange={(e)=>categoryChangeHandler(e)} options={options}/>
                    </div>                                            
                </div>
                <div className="row">
                    <div><input id='btnAdd' type='button' onClick={btnAddClick} className='px-3 btn btn-secondary' value='Add'></input></div>
                </div>
            </div>
        </>
    )
}

export default AddTask;