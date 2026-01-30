// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    tenantId: string;
}

// Product Types
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// Company Types
export interface Company {
    id: string;
    name: string;
    code: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// Role Types
export interface Role {
    id: string;
    name: string;
    description?: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// Form Builder Types
export interface FormField {
    id: string;
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date';
    required: boolean;
    options?: string[];
    order: number;
}

export interface Form {
    id: string;
    name: string;
    description?: string;
    fields: FormField[];
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// Dynamic Entity Types
export interface DynamicEntity {
    id: string;
    formId: string;
    data: Record<string, any>;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// Navigation Types
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Products: undefined;
    ProductDetail: { id: string };
    Companies: undefined;
    CompanyDetail: { id: string };
    Roles: undefined;
    RoleDetail: { id: string };
    Users: undefined;
    UserDetail: { id: string };
    FormBuilder: undefined;
    FormDetail: { id: string };
    DynamicForms: undefined;
    DynamicFormDetail: { formId: string; entityId?: string };
    Profile: undefined;
};
