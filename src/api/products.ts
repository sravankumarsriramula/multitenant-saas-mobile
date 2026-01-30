import apiClient from './client';
import { Product, PaginatedResponse } from '../types';

export const productApi = {
    // Get all products
    getAll: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/products');
        return response.data;
    },

    // Get product by ID
    getById: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },

    // Create product
    create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<Product> => {
        const response = await apiClient.post<Product>('/products', data);
        return response.data;
    },

    // Update product
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
        const response = await apiClient.put<Product>(`/products/${id}`, data);
        return response.data;
    },

    // Delete product
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/products/${id}`);
    },
};
