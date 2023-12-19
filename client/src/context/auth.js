import axios from 'axios';
import React, {useState, useContext, createContext, useEffect } from 'react';

/**create context for storev a variabel */
const AuthContext = createContext();

/**if want use context have to create provider */
const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    /** default axios set */
    axios.defaults.headers.common["Authorization"] = auth?.token;

    /**get the topken and user data from local storage */
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
  }, []);

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

/**custom hooks */
const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}