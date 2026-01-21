import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

import { authService } from "../services/authService";
import { LoginDTO } from "../api/dto/AuthDTO";

type AuthContextType = {
    token: string | null;
    loading: boolean;
    signIn: (credentials: LoginDTO) => Promise<string>;
    signOut: () => Promise<void>;
    signInWithToken: (token: string) => Promise<void>;
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
    

    // 🔹 HACK: FORCE LOGOUT (sletter token og tvinger login) bruges ved at udkommentere ovenstående useEffect og bruge nedenstående i stedet <3
/*     useEffect(() => {
        const forceLogout = async () => {
            console.log('🔥 FORCE LOGOUT HACK AKTIV');
            await SecureStore.deleteItemAsync('userToken'); // 💥 slet gemt token
            setToken(null);
            setLoading(false);
        };

        forceLogout();
    }, []); */

    const signIn = async ({email, password}: LoginDTO) => {
        const { token } = await authService.login({ email, password });
        await SecureStore.setItemAsync("userToken", token);
        setToken(token);
        return token;
    };

    // 🔹 SIGN OUT
    const signOut = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setToken(null);
    };

    const signInWithToken = async (token: string) => {
        await SecureStore.setItemAsync("userToken", token);
        setToken(token);
    }

    return (
        <AuthContext.Provider value={{ token, loading, signIn, signOut, signInWithToken }}>
            {children}
        </AuthContext.Provider>
    );
}
