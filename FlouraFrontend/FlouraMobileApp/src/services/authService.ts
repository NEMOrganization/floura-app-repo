import { apiClient } from "../api/client";
import { LoginDTO, RegisterDTO } from "../api/dto/AuthDTO";

export const authService = {
    login: async (data: LoginDTO): Promise<{ token: string }> => {
        try {
            return await apiClient.post("/auth/login", data);
        } catch (err: any) {
            throw err.response?.data || err;    
        }
    },

    register: async (data: RegisterDTO): Promise<{ token: string }> => {
        return apiClient.post("/auth/register", data);
    }
};