import {  GoogleOAuthProvider } from "@react-oauth/google"
import AuthContext from '../../AuthContext';

import LoginGoogle from "./googlelogin";

const Login = ()=>{

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <AuthContext.Consumer>
          {()=>(
            <div className="container mt-5">
                <GoogleOAuthProvider clientId = {clientId}>
                    <LoginGoogle></LoginGoogle>
                </GoogleOAuthProvider>
            </div>
        )}
        </AuthContext.Consumer>
    )
}

export default Login;