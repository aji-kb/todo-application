import {  GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../AuthContext';
import { postData } from "../../../service/service";

const LoginGoogle = ()=>{

    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const response = await postData("auth/google/token", tokenResponse.code, "POST");

            if(response != null && response.message == undefined)
            {
                console.log(response);

                localStorage.setItem("id_token", response.idToken);
                localStorage.setItem("access_token", response.accessToken);
                localStorage.setItem("userName", response.name);
                localStorage.setItem("userEmail", response.email);      
                setIsAuthenticated(true);
        
                navigate('/');
            }
        },
        flow: 'auth-code',
      });

      return (
        <>
            <button className="btn" onClick={()=>googleLogin()}>Sign in with Google</button>
        </>
      )
}

export default LoginGoogle;