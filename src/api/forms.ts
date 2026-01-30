import apiClient from './client';
import { Form, DynamicEntity } from '../types';

// Form Builder API
export const formBuilderApi = {
    getAll: async (): Promise<Form[]> => {
        const response = await apiClient.get<Form[]>('/formbuilder');
        return response.data;
    },

    getById: async (id: string): Promise<Form> => {
        const response = await apiClient.get<Form>(`/formbuilder/${id}`);
        return response.data;
    },

    create: async (data: Omit<Form, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<Form> => {
        const response = await apiClient.post<Form>('/formbuilder', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Form>): Promise<Form> => {
        const response = await apiClient.put<Form>(`/formbuilder/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/formbuilder/${id}`);
    },
};

// Dynamic Entity API
export const dynamicEntityApi = {
    getAll: async (formId: string): Promise<DynamicEntity[]> => {
        const response = await apiClient.get<DynamicEntity[]>(`/dynamic/${formId}`);
        return response.data;
    },

    getById: async (formId: string, entityId: string): Promise<DynamicEntity> => {
        const response = await apiClient.get<DynamicEntity>(`/dynamic/${formId}/${entityId}`);
        return response.data;
    },

    create: async (formId: string, data: Record<string, any>): Promise<DynamicEntity> => {
        const response = await apiClient.post<DynamicEntity>(`/dynamic/${formId}`, { data });
        return response.data;
    },

    update: async (formId: string, entityId: string, data: Record<string, any>): Promise<DynamicEntity> => {
        const response = await apiClient.put<DynamicEntity>(`/dynamic/${formId}/${entityId}`, { data });
        return response.data;
    },

    delete: async (formId: string, entityId: string): Promise<void> => {
        await apiClient.delete(`/dynamic/${formId}/${entityId}`);
    },
};
