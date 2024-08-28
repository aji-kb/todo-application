
import ToDoMenu from "../menu/todomenu";
import ToDo from "../todo/todo"
import { Outlet } from "react-router-dom"
import AuthProvider from '../auth/AuthProvider'


const Root = ()=>{
    return (
        <>
            <AuthProvider>
                <div className="toppanel">
                    <header>
                        <ToDoMenu></ToDoMenu>
                    </header>
                </div>
                <div className="contentpanel">
                    <Outlet/>
                </div>
            </AuthProvider>
        </>
    )
}

export default Root;