import { AuthProvider } from "@/src/context/AuthContext";
import { StoriesProvider } from "@/src/context/StoriesContext";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
    return (
        <AuthProvider>
            <StoriesProvider>
                {children}
            </StoriesProvider>
        </AuthProvider>
    );
}