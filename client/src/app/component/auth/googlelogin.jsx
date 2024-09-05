import {  GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"

const LoginGoogle = ()=>{
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/userinfo.profile'
      });

      return (
        <>
            <button onClick={()=>googleLogin()}>Sign in with Google</button>
        </>
      )
}

export default LoginGoogle;