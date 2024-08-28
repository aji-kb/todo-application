import {useEffect, useState} from 'react';
import AuthContext from '../../AuthContext';

const AuthProvider = ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;