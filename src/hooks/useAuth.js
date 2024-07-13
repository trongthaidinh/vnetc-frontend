import { useState, useEffect, useContext, createContext } from 'react';
import { login, logout } from '../services/auth/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const decoded = JSON.parse(storedUser);
            const isExpired = decoded.exp < Date.now() / 1000;
            if (!isExpired) {
                setUser(decoded);
            } else {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const signin = async (credentials) => {
        const response = await login(credentials);
        if (response.status) {
            const { data } = response;
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/admin/dashboard');
        } else {
            throw new Error(response.message);
        }
        return response;
    };

    const signout = () => {
        logout();
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return {
        user,
        loading,
        signin,
        signout,
    };
};

export default AuthProvider;
