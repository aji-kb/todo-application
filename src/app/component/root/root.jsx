
import ToDoMenu from "../menu/todomenu";
import ToDo from "../todo/todo"
import { Outlet } from "react-router-dom"


const Root = ()=>{
    return (
        <>
            <div className="toppanel">
                <header>
                    <ToDoMenu></ToDoMenu>
                </header>
            </div>
            <div className="contentpanel">
                <Outlet/>
            </div>
        </>
    )
}

export default Root;