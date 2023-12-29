import React, { createContext, useState, useContext } from 'react';
import { AuthAPIService, removeAuthTokenFromTheApp, setAuthTokenToTheApp } from "../api/authenticationApiService";
import { authenticate } from '../api/test';
import { retrieveUser } from '../api/userApiServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        firstNAme: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        roles: []
    })

    const login = async (username, password) => {
        try {
            //Get Token 
            const response1 = await AuthAPIService(username, password)
            const token = response1.data.token
            setAuthTokenToTheApp(token)
            const isAuthenticated = await authenticate();
            setIsAuthenticated(isAuthenticated);

            //Fetch The User Data
            const response2 = await retrieveUser()
            const retrivedUser = response2.data
            setUser(retrivedUser)
            console.log("success Login")
            return true;
        } catch (error) {
            // console.error('Login error:1', error);
            return false;
        }


    };


    const logout = () => {
        setIsAuthenticated(false);
        setUser({
            id: 0,
            firstNAme: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            roles: []
        })
        removeAuthTokenFromTheApp('');

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);