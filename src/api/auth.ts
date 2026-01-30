import apiClient from './client';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

export const authApi = {
    // Login
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    // Register
    register: async (data: RegisterRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/register', data);
        return response.data;
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    },

    // Logout (client-side only)
    logout: async (): Promise<void> => {
        // Clear local storage - handled by store
    },
};
