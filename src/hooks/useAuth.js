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
        const tokenExp = localStorage.getItem('tokenExp');
        const token = localStorage.getItem('user');
        if (tokenExp) {
            console.log(tokenExp, Date.now() / 1000);
            const isExpired = tokenExp < Date.now() / 1000;
            if (!isExpired) {
                setUser(token);
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('tokenExp');
                localStorage.removeItem('userEmail');
            }
        }
        setLoading(false);
    }, []);

    const signin = async (credentials) => {
        const response = await login(credentials);
        if (response.status) {
            const { data } = response;
            setUser(data);
            localStorage.setItem('user', data.token);
            localStorage.setItem('tokenExp', data.decoded.exp);
            localStorage.setItem('userEmail', credentials.email);
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
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('userEmail');
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
