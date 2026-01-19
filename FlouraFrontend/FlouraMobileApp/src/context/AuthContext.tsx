import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
    token: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

/**
 * DEV ONLY
 * Hardcoded token to unblock navigation, drawer & routing.
 * REMOVE when real auth flow is implemented.
 */

const DEV_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYxNWI0MzU1LTY2YTYtNDRmZS05ODQ0LThkZDVhZGZjNDQ0NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImVtbWFAdGVzdC5kayIsImV4cCI6MTc2ODU2NzUyMSwiaXNzIjoiRmxvdXJhQXBpIiwiYXVkIjoiRmxvdXJhQXBwIn0.XdLcYAW9ffbAOPRKjtRrQHbGxwtnsBE3qKfTakXLw6k";

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

    /**
     * Load token on app start
     */

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("userToken");

                if (storedToken) {
                    setToken(storedToken);
                } else if (__DEV__) {
                // DEV fallback so app is usable without login
                setToken(DEV_TOKEN);
                }
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    /**
     * DEV signIn 
     * (real API login will replace this later)
     */


    const signIn = async (email: string, password: string) => {
        await SecureStore.setItemAsync("userToken", DEV_TOKEN);
        setToken(DEV_TOKEN);
    };

    /**
     * Sign out
     */

    const signOut = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}