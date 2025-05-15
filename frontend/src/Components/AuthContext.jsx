import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('accessToken');
            setIsLoggedIn(!!token);
        };
        
        checkAuthStatus();
        
        window.addEventListener('storage', checkAuthStatus);
        
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);
    
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;