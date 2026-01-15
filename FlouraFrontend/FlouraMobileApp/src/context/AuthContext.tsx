import React, { createContext, useContext, useState, useEffect, use } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
    token: string | null;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        SecureStore.getItemAsync("token").then(setToken);
    }, []);

    const signIn = async (t: string) => {
        await SecureStore.setItemAsync("token", t);
        setToken(t);
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}