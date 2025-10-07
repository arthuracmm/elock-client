import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    axios.defaults.withCredentials = true;

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, { withCredentials: true });
            setUser(response.data);
            setIsLoggedIn(true);
            console.log("user logado: ", response.data)
        } catch (err) {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchUserData().finally(() => setIsLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, { withCredentials: true });
            await fetchUserData();
        } catch (err) {
            setUser(null);
            setIsLoggedIn(false);
            throw err;
        }
    };


    const logout = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true })
            .finally(() => {
                setUser(null);
                setIsLoggedIn(false);
            });
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, refreshUserData: fetchUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};
