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
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYxNWI0MzU1LTY2YTYtNDRmZS05ODQ0LThkZDVhZGZjNDQ0NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImVtbWFAdGVzdC5kayIsImV4cCI6MTc2ODU2NzUyMSwiaXNzIjoiRmxvdXJhQXBpIiwiYXVkIjoiRmxvdXJhQXBwIn0.XdLcYAW9ffbAOPRKjtRrQHbGxwtnsBE3qKfTakXLw6k";
    const [token, setToken] = useState<string | null>(testToken);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("userToken");
            if (storedToken) setToken(storedToken);
            setLoading(false);
        };
        loadToken();
    }, []);

    const signIn = async (email: string, password: string) => {
        const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYxNWI0MzU1LTY2YTYtNDRmZS05ODQ0LThkZDVhZGZjNDQ0NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImVtbWFAdGVzdC5kayIsImV4cCI6MTc2ODU2NzUyMSwiaXNzIjoiRmxvdXJhQXBpIiwiYXVkIjoiRmxvdXJhQXBwIn0.XdLcYAW9ffbAOPRKjtRrQHbGxwtnsBE3qKfTakXLw6k";
        await SecureStore.setItemAsync("userToken", testToken);
        setToken(testToken);
    };

/*     const signIn = async (email: string, password: string) => {
        try {
            await SecureStore.setItemAsync("userToken", testToken);
            setToken(token);
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
 */
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