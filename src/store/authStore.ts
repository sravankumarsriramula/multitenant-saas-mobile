import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginRequest, RegisterRequest } from '../types';
import { authApi } from '../api/auth';
import { STORAGE_KEYS } from '../constants/config';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (credentials: LoginRequest) => {
        try {
            set({ isLoading: true, error: null });
            console.log('🔐 Attempting login with:', { email: credentials.email });

            const response = await authApi.login(credentials);
            console.log('✅ Login response received:', {
                hasToken: !!response.token,
                hasUser: !!response.user,
                userName: response.user?.name,
                hasTenantId: !!response.user?.tenantId
            });

            // Save to AsyncStorage
            await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

            // Only save tenantId if it exists
            if (response.user.tenantId) {
                await AsyncStorage.setItem(STORAGE_KEYS.TENANT_ID, response.user.tenantId);
            }
            console.log('💾 Saved to AsyncStorage');

            set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });
            console.log('✅ Login successful');
        } catch (error: any) {
            console.error('❌ Login error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                fullError: error
            });

            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            set({
                error: errorMessage,
                isLoading: false,
            });
            throw error;
        }
    },

    register: async (data: RegisterRequest) => {
        try {
            set({ isLoading: true, error: null });
            const response = await authApi.register(data);

            // Save to AsyncStorage
            await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

            // Only save tenantId if it exists
            if (response.user.tenantId) {
                await AsyncStorage.setItem(STORAGE_KEYS.TENANT_ID, response.user.tenantId);
            }

            set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.AUTH_TOKEN,
                STORAGE_KEYS.USER_DATA,
                STORAGE_KEYS.TENANT_ID,
            ]);

            set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null,
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    loadUser: async () => {
        try {
            set({ isLoading: true });
            const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
            const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

            if (token && userData) {
                const user = JSON.parse(userData);
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Load user error:', error);
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null }),
}));
