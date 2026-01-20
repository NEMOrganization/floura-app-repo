import { apiClient } from "../api/client";
import { LoginDTO, RegisterDTO } from "../api/dto/AuthDTO";

export const authService = {
    login: async (data: LoginDTO): Promise<{ token: string }> => {
        console.log('Login body:', { email : data.email, password: data.password });
        return apiClient.post("/auth/login", data);
    },

    register: async (data: RegisterDTO): Promise<{ token: string }> => {
        return apiClient.post("auth/register", data);
    }
};