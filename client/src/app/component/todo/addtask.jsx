import { useState } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './addtask.css';
import Select from "react-select";

const AddTask = (props) => {


    const [task, setTask] = useState({taskName: '', taskDate: '', taskCategory: ''});
    const [todoText, setTodoText] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const btnAddClick= ()=>{
        console.log(task);
        props.onAdd(task);
    }

    const todoTextChange = (e)=>{
        setTask(prevTask => ({...prevTask, taskName: e.target.value}));
    }

    const categoryChangeHandler = (e)=>{
        setTask( prevTask => ({...prevTask, taskCategory: e.value}));
    }

    const options = [
        {value: '1', label: 'One'},
        {value: '2', label: 'Two'},
        {value: '3', label: 'Three'},
    ]

    return (
        <>
            <div class="container text-start">
                <div className="row mb-3">
                        <label for='inputDescription' className='col-sm-2 col-form-label'>Task</label>
                        <div className='col-sm-6'>
                            <input id='inputDescription' className='form-control' type='text' value={task.taskName} onChange={(e)=>{todoTextChange(e)}} placeholder="Task Description"></input>
                        </div>
                        
                </div>
                <div className="row mb-3">
                    <label for='inputDate' className='col-sm-2 col-form-label'>Due Date</label>
                    <div className="col-sm-6">
                        <DatePicker id='inputDate' selected={task.taskDate} className="form-control" placeholderText="Due Date" onChange={(date)=>setTask(prevTask => ({...prevTask, taskDate: date}))}></DatePicker>
                    </div>
                </div>
                <div className="row mb-5">
                    <label for='category' className='col-sm-2 col-form-label'>Category</label>
                    <div className="col-sm-6">
                        <Select id='category' defaultValue={task.taskCategory} onChange={(e)=>categoryChangeHandler(e)} options={options}/>
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