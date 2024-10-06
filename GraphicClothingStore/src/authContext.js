import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('token', token);
    };

    const register = async (username, password) => {
        await axios.post('http://localhost:5000/api/auth/register', { username, password });
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

