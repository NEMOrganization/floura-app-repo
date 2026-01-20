import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

import { authService } from "../services/authService";
import { LoginDTO } from "../api/dto/AuthDTO";

type AuthContextType = {
    token: string | null;
    loading: boolean;
    signIn: (credentials: LoginDTO) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("userToken");

                if (storedToken) {
                    setToken(storedToken);
                }
            } finally {
            setLoading(false); 
            }
        };
        loadToken();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { token } = await authService.login({ email, password });

        console.log('Token received from API:', token);
        
        await SecureStore.setItemAsync("userToken", token);
        setToken(token);
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}