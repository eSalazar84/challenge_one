import { createContext, useState, useEffect, useCallback } from "react";
import { getAllUser, URL_user } from "../services/authServices";
import { useNavigate } from 'react-router-dom'

export const AuthCtx = createContext();

export const AuthCtxProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [listUser, setListUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate('/');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await getAllUser(URL_user);
            setListUser(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthCtx.Provider value={{ user, handleLogin, handleLogout, fetchData, listUser, error, isLoading }}>
            {children}
        </AuthCtx.Provider>
    );
};

export { AuthCtx, AuthCtxProvider };
