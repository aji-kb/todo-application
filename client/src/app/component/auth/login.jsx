import {  GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = ()=>{

    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const HandleSuccess = function(e){
        localStorage.setItem("id_token", e.credential);
        fetch(baseUrl + "auth/google?idToken=" + e.credential).then((res)=>res.json()).then((data)=>{
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);      
        });

        navigate('/');
      }
    
      const HandleError = function(e){
        console.log('Error');
        console.log(e);
      }

    return (
        <>
        <div className="container mt-5">
            <GoogleOAuthProvider clientId = {clientId}>
              <GoogleLogin onSuccess={HandleSuccess} onError={HandleError}></GoogleLogin>
            </GoogleOAuthProvider>
        </div>
        </>
    )
}

export default Login;