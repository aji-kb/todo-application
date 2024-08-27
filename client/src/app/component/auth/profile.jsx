import { useState, useEffect } from "react";
import './profile.css';



const Profile = (props)=>{

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(()=>{
        setUserName(localStorage.getItem("userName"));
        setUserEmail(localStorage.getItem("userEmail"));
    }, []);

    const logoutHandler = ()=>{
        localStorage.clear();
        props.logout();
    }

    return (
        <>
            <div>
                <span className="nav-text">{userName}!</span> <a type='button' onClick={logoutHandler} className='nav-link d-inline'>Logout</a>
            </div>
        </>
    )
}

export default Profile;