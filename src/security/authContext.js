//1: Create Context

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()


export const useAuth = () => useContext(AuthContext)



//2: Share the context with other component
export function AuthProvider({children}){
    // put some data in the context
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    
    return(
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}