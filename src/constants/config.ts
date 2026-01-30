// API Configuration
// For local emulator/simulator testing
// export const API_BASE_URL = __DEV__
//     ? 'http://192.168.0.6:5000/api' // Development - Local IP for Device
//     : 'https://your-production-api.com/api'; // Production

export const API_BASE_URL = 'https://multitenant-node-postgres-api.onrender.com/api';

// Note: For Android emulator, you may need to use 'http://10.0.2.2:5000/api'
// Note: For physical device with Expo Go, use 'http://192.168.0.6:5000/api'

export const API_TIMEOUT = 30000; // 30 seconds

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: '@auth_token',
    USER_DATA: '@user_data',
    TENANT_ID: '@tenant_id',
} as const;

// App Configuration
export const APP_CONFIG = {
    name: 'EXIM SaaS',
    version: '1.0.0',
} as const;
