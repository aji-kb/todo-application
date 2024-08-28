import {Link} from 'react-router-dom';
import './todomenu.css';
import {useState, useEffect, useContext} from 'react'
import Profile from '../auth/profile';
import AuthContext from '../../AuthContext';

const ToDoMenu = ()=>{

    const {isAuthenticated, setIsAuthenticated}  = useContext(AuthContext);

    const [idToken, setIdToken] = useState(localStorage.getItem("id_token"));

    useEffect(()=>{
        if(idToken != null && idToken != '')
        {
            setIsAuthenticated(true);
        }
    }, []);

    const logoutHandler = ()=>{
        console.log('logging the user out');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Consumer>
            {()=>(
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse menu" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/ToDo">Task Manager</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Contact">Contact</Link></li>
                    </ul>
                    <div className='navbar-nav loginbtn'>
                        {
                        (isAuthenticated?<Profile logout={logoutHandler}/>: <Link className='nav-link' to='/login'>Login</Link>)
                        }
                    </div>
                </div>
            </nav>
            )}
        </AuthContext.Consumer>
    )
}

export default ToDoMenu;