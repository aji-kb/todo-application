import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './addtask.css';
import Select from "react-select";
import { fetchData, postData } from '../../../service/service';
import { Task } from "../../../common/Task";

const AddTask = (props) => {


    const [task, setTask] = useState(Task);
    const [options, setOptions] = useState([])
    const [btnText, setBtnText] = useState('Add');
    const [selectedOption, setSelectedOption] = useState({label: '', value:0});
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const btnAddClick= async ()=>{

        await props.onAdd(task);
    }

    const todoTextChange = (e)=>{
        setTask(prevTask => ({...prevTask, taskName: e.target.value}));
    }

    const categoryChangeHandler = (e)=>{
        setTask( prevTask => ({...prevTask, categoryId: e.value}));
        setSelectedOption(e);
    }

    const loadCategories = async ()=>{
        const response = await fetchData("task/categories");
        if(response != null && response.message == undefined)
        {
            const catOptions = response.map((item)=>({label: item.categoryName, value: item.id}));
            setOptions(catOptions);
            return catOptions;
        }
        else
        {
            if(response.message)
            {
                setErrorMessage(response.message);
            }
        }
    }

    useEffect(()=>{
        loadCategories();
        setBtnText('Add');
        setErrorMessage('');
        setInfoMessage('');
    }, []);

    useEffect(()=>{
        setErrorMessage(props.errorMessage);
    }, [props.errorMessage]);

    useEffect(()=>{
        setInfoMessage(props.infoMessage);
    }, [props.infoMessage]);

    useEffect(()=>{
        const selectedOption = options.find(x=>x.value == props.selectedTask.categoryId);
        if(selectedOption)
            setSelectedOption(selectedOption);
        else
            setSelectedOption({label: '', value: 0})
        setTask(props.selectedTask);
        setBtnText('Save');
    }, [props.selectedTask])

    const btnResetClick = ()=>{
        setTask(Task);
        setBtnText('Add');
        setSelectedOption({label: '', value:0});
        setErrorMessage('');
        setInfoMessage('');
    }

    return (
        <>
            <div className="container text-start">
                <div className="row mb-3">
                    <div className="col-sm-6">
                    <span className='error-messages mx-3'>{errorMessage}</span>
                    <span className='info-messages mx-3'>{infoMessage}</span>
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
                        <Select id='category' defaultValue={selectedOption} value={selectedOption}
                        getOptionLabel={x=>x.label}
                        getOptionValue={x=>x.value}
                        onChange={(e)=>categoryChangeHandler(e)} name='categoryOptions' options={options}/>
                    </div>                                            
                </div>
                <div className="row">
                    <div>
                        <input id='btnAdd' type='button' onClick={btnAddClick} className='px-3 btn btn-secondary' value={btnText}></input>
                        <input id='btnReset' type='button' onClick={btnResetClick} className='mx-3 px-3 btn btn-secondary' value='Reset'></input>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTask;