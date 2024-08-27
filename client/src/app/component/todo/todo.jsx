import AddTask from "./addtask";
import {useState} from 'react';
import { Modal } from "@material-ui/core";

const ToDo = ()=>{

    const [addedText, setAddedText] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [completedTodoList, setCompletedTodoList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const handleAddClick = (data)=>{
        setAddedText(data);

        const existingItem= todoList.findIndex((item)=>data.toLowerCase() === item.toLowerCase());
        if(existingItem < 0)
        {
            const existingTodo = todoList.slice(); //creates a shallow copy of an array into a new object
            existingTodo.push(data);
            setTodoList(existingTodo);
        }

        const completedItem = completedTodoList.findIndex((item)=>data.toLowerCase() === item.toLowerCase());
        if(completedItem >= 0)
        {
            const existingCompletedToDo = completedTodoList.slice();
            existingCompletedToDo.splice(completedItem, 1);
            setCompletedTodoList(existingCompletedToDo);
        }

    }

    const completeTask = (data)=>{
        const existingTodo = todoList.slice();
        const existingCompletedToDo = completedTodoList.slice();

        let index = existingTodo.findIndex((item)=> data.toLowerCase() === item.toLowerCase());
        if(index >= 0)
        {
            existingTodo.splice(index,1);
        }

        if(existingCompletedToDo.findIndex((item)=> data.toLowerCase() === item.toLowerCase()) <0)
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

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col"><h3>To Do Application</h3></div>
                </div>
                <div className="row mt-5">
                    <div className="col"><AddTask onAdd={(data)=>{handleAddClick(data)}}></AddTask></div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        {todoList.length == 0? <div className="text-start"><em>No Tasks! Start Adding Tasks</em></div>: ''}
                        <table className="table table-bordered">
                            {
                            todoList.length > 0? 
                            <thead>
                                <tr>
                                    <td><strong>Action</strong></td>
                                    <td className="text-start"><span className="px-3"><strong>Task</strong></span></td>
                                </tr>
                            </thead>
                            : ''
                            }
                            <tbody>
                                {
                                    todoList.map((item)=>{
                                    return <tr key={item}>
                                                <td className="col-1"><input type="checkbox" onClick={()=>completeTask(item)}></input></td>
                                                <td className="text-start"><span className="px-3">{item}</span></td>
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
                                            return <tr key={item}>
                                                <td className="text-start"><span className="px-3">{item}</span></td>
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