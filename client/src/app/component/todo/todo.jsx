import AddTask from "./addtask";
import { Modal } from "@material-ui/core";
import {useState, useEffect} from 'react';
import { fetchData, postData } from '../../../service/service';
import { Tooltip } from 'react-tooltip'

const ToDo = ()=>{

    const [todoList, setTodoList] = useState([]);
    const [completedTodoList, setCompletedTodoList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // const handleAddClick = (data)=>{

    //     const existingItem= todoList.findIndex((item)=>data.taskName.toLowerCase() === item.taskName.toLowerCase());
    //     if(existingItem < 0)
    //     {
    //         const existingTodo = todoList.slice(); //creates a shallow copy of an array into a new object
    //         existingTodo.push(data);
    //         setTodoList(existingTodo);
    //     }

    //     const completedItem = completedTodoList.findIndex((item)=>data.taskName.toLowerCase() === item.taskName.toLowerCase());
    //     if(completedItem >= 0)
    //     {
    //         const existingCompletedToDo = completedTodoList.slice();
    //         existingCompletedToDo.splice(completedItem, 1);
    //         setCompletedTodoList(existingCompletedToDo);
    //     }

    // }

    const completeTask = (data)=>{
        const existingTodo = todoList.slice();
        const existingCompletedToDo = completedTodoList.slice();

        let index = existingTodo.findIndex((item)=> data.taskName.toLowerCase() === item.taskName.toLowerCase());
        if(index >= 0)
        {
            existingTodo.splice(index,1);
        }

        if(existingCompletedToDo.findIndex((item)=> data.taskName.toLowerCase() === item.taskName.toLowerCase()) <0)
            existingCompletedToDo.push(data);

        setTodoList(existingTodo);
        setCompletedTodoList(existingCompletedToDo);

    }

    const btnClearTasksClick = ()=>{
        setConfirmDialog(true);
    }

    const confirmClick = (response)=>{
        if(response == 1)
            setCompletedTodoList([]);

        setConfirmDialog(false);
    }

    const handleConfirmDialogClose = function(){
        setConfirmDialog(false);
    }

    const loadTasks = async ()=>{
        const response = await fetchData("task");
        if(response != null && response.message == undefined)
        {
            setTodoList(response);
        }
    }

    useEffect(()=>{
        loadTasks();
    }, [])

    const saveClick = async (e)=>{

        setErrorMessage('');
        //call API to save the task and reload the grid
        let action = 'POST';
        if(e.id > 0)
        {
           action = 'PUT';
        }
       
        const response = await postData("task", e, action);
       if(response != null && response.statusCode == 200)
       {
           //save successful. now reload the list
           setErrorMessage('');
           await loadTasks();
       }
       else
       {
            console.log(response.value.message);
           setErrorMessage(response.value.message);
           //setSelectedCategory(e);

       }
   }

   const onDeleteClick = async (e)=>{
        const response = await postData("task/" + e, {}, "DELETE");

        if(response != null && response.message == undefined)
        {
            await loadTasks();
        }
        else
        {
            console.log(response.message);
        }
   }

   const onEditClick = (e)=>{

   }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col"><h3>Task Assistant</h3></div>
                </div>
                <div className="row mt-5">
                    <div className="col"><AddTask onAdd={(data)=>{saveClick(data)}} errorMessage={errorMessage}></AddTask></div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        {todoList.length == 0? <div className="text-start"><em>No Tasks! Start Adding Tasks</em></div>: ''}
                        <table className="table table-bordered">
                            {
                            todoList.length > 0? 
                            <thead>
                                <tr>
                                    <td><strong>Actions</strong></td>
                                    <td className="text-start"><span className="px-3"><strong>Task</strong></span></td>
                                </tr>
                            </thead>
                            : ''
                            }
                            <tbody>
                                {
                                    todoList.map((item)=>{
                                    return <tr key={item.taskName}>
                                                <td className="col-2">
                                                    <img src='/images/complete.png' data-tooltip-id='tt-complete' data-tooltip-content='Complete Task' className='grid-image action-link' type="checkbox" onClick={()=>completeTask(item)} alt='Complete'></img>
                                                    <Tooltip id="tt-complete" />
                                                    <img src='/images/delete.png' data-tooltip-id='tt-delete' data-tooltip-content='Delete Task' className='grid-image action-link mx-2' onClick={()=>onDeleteClick(item.id)} alt="Delete"></img>
                                                    <Tooltip id="tt-delete" />
                                                    <img src='/images/edit.png' data-tooltip-id='tt-edit' data-tooltip-content='Edit Task' className='grid-image action-link' onClick={()=>onEditClick(item.id)}></img>
                                                    <Tooltip id="tt-edit" />
                                                </td>
                                                <td className="text-start"><span className="px-3">{item.taskName}</span></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>

                        <div className="mt-5">
                        { 
                            completedTodoList.length > 0?
                            <div>
                            <span className="text-start"><h6><strong>Completed Tasks</strong></h6></span>

                            <table className="mt-4 table table-bordered">
                                <thead>
                                    <tr>
                                        <td className="text-start"><span className="px-3"><strong>Task</strong></span></td>
                                    </tr>
                                </thead>
                                <tbody>
                                        {completedTodoList.map((item) =>{
                                            return <tr key={item.taskName}>
                                                <td className="text-start"><span className="px-3">{item.taskName}</span></td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>
                            </div>
                            : ''
                        }
                        
                        </div>
                    </div>
                </div>
                {
                    completedTodoList.length > 0?
                    <div className="row">
                        <div className="col text-start">
                            <button onClick={btnClearTasksClick} className='btn btn-light'>Clear Completed Tasks</button>
                            <Modal open={confirmDialog} onClose={handleConfirmDialogClose} 
                            style={{
                                position: 'fixed',
                                height: 200,
                                width: 340,
                                left: 50,
                                top: 100,
                                margin: 'auto',
                                border: '1px solid black',
                                padding: '2%',
                                background: 'lightgray',
                                boxshadow: "2px solid black",
                            }} >
                            <>
                                <div>Are you sure?</div>
                                <div className="py-3">
                                    <button className='btn btn-dark ' onClick={()=>confirmClick(1)}>Yes</button>
                                    <button className='btn btn-ligh' onClick={()=>confirmClick(0)}>No</button>
                                </div>
                            </>
                        </Modal>
                        </div>
                    </div>
                    : ''
                }
            </div>

        </>
    )
}

export default ToDo;