import { useState, useEffect, useContext } from "react";
import './profile.css';
import AuthContext from '../../AuthContext';


const Profile = (props)=>{

    const {isAuthenticated} = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

    useEffect(()=>{
        if(isAuthenticated)
            setUserName(localStorage.getItem("userName"));
    }, []);

    const logoutHandler = ()=>{
        localStorage.clear();
        props.logout();
    }

    return (
        <AuthContext.Consumer>
            {()=>(
                <div>
                    <span className="nav-text">{userName}!</span> <a type='button' onClick={logoutHandler} className='nav-link d-inline'>Logout</a>
                </div>
            )}
        </AuthContext.Consumer>
    )
}

export default Profile;