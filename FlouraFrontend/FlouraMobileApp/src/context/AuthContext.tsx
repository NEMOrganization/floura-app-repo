import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
    token: string | null;
    signIn: (email: string, password: string) => Promise<void>;
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

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("userToken");
            if (storedToken) setToken(storedToken);
        };
        loadToken();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetch("https://floura-api-asfmcdd6fdfkd4df.westeurope-01.azurewebsites.net/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            };

            const data = await response.json(); 
            await SecureStore.setItemAsync("userToken", data.token);
            setToken(data.token);
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}