import {  GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../AuthContext';
import LoginGoogle from "./googlelogin";

const Login = ()=>{

    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const HandleSuccess = function(e){
      console.log(e);
        localStorage.setItem("id_token", e.credential);

        fetch(baseUrl + "auth/google?idToken=" + e.credential).then((res)=>res.json()).then((data)=>{
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);      
          setIsAuthenticated(true);
        });

        navigate('/');
      }
    
      const HandleError = function(e){
        console.log('Error');
        console.log(e);
      }


    

    return (
        <AuthContext.Consumer>
          {()=>(
            <div className="container mt-5">
                <GoogleOAuthProvider clientId = {clientId}>
                    <GoogleLogin onSuccess={HandleSuccess} onError={HandleError}></GoogleLogin>
                </GoogleOAuthProvider>
            </div>
        )}
        </AuthContext.Consumer>
    )
}

export default Login;