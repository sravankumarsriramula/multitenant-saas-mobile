import apiClient from './client';
import { Company, Role, User } from '../types';

// Companies API
export const companyApi = {
    getAll: async (): Promise<Company[]> => {
        const response = await apiClient.get<Company[]>('/master/companies');
        return response.data;
    },

    getById: async (id: string): Promise<Company> => {
        const response = await apiClient.get<Company>(`/master/companies/${id}`);
        return response.data;
    },

    create: async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<Company> => {
        const response = await apiClient.post<Company>('/master/companies', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Company>): Promise<Company> => {
        const response = await apiClient.put<Company>(`/master/companies/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/master/companies/${id}`);
    },
};

// Roles API
export const roleApi = {
    getAll: async (): Promise<Role[]> => {
        const response = await apiClient.get<Role[]>('/master/roles');
        return response.data;
    },

    getById: async (id: string): Promise<Role> => {
        const response = await apiClient.get<Role>(`/master/roles/${id}`);
        return response.data;
    },

    create: async (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<Role> => {
        const response = await apiClient.post<Role>('/master/roles', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Role>): Promise<Role> => {
        const response = await apiClient.put<Role>(`/master/roles/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/master/roles/${id}`);
    },
};

// Users API
export const userApi = {
    getAll: async (): Promise<User[]> => {
        const response = await apiClient.get<User[]>('/users');
        return response.data;
    },

    getById: async (id: string): Promise<User> => {
        const response = await apiClient.get<User>(`/users/${id}`);
        return response.data;
    },

    update: async (id: string, data: Partial<User>): Promise<User> => {
        const response = await apiClient.put<User>(`/users/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/users/${id}`);
    },
};
