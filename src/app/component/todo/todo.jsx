import AddTask from "./addtask";
import {useState} from 'react';


const ToDo = ()=>{

    const [addedText, setAddedText] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [completedTodoList, setCompletedTodoList] = useState([]);

    const handleAddClick = (data)=>{
        setAddedText(data);
        const existingTodo = todoList.slice(); //creates a shallow copy of an array into a new object
        if(existingTodo.indexOf(data) < 0)
            existingTodo.push(data);
        setTodoList(existingTodo);
    }

    const completeTask = (item)=>{
        const existingTodo = todoList.slice();
        const existingCompletedToDo = completedTodoList.slice();

        let index = existingTodo.indexOf(item);
        if(index >= 0)
        {
            existingTodo.splice(index,1);
        }

        console.log(existingTodo);

        if(existingCompletedToDo.indexOf(item) <0)
            existingCompletedToDo.push(item);

        console.log(existingCompletedToDo);

        setTodoList(existingTodo);
        setCompletedTodoList(existingCompletedToDo);

    }

    const btnClearTasksClick = ()=>{
        setCompletedTodoList([]);
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
                        </div>
                    </div>
                    : ''
                }
            </div>
        </>
    )
}

export default ToDo;