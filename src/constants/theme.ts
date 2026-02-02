// Theme Constants for Light and Dark Modes

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface Theme {
    // Background Colors
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;

    // Surface Colors
    surface: string;
    surfaceSecondary: string;

    // Text Colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Primary Colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Border Colors
    border: string;
    borderLight: string;
    borderDark: string;

    // Special Colors
    shadow: string;
    overlay: string;

    // Tab Bar
    tabBarBackground: string;
    tabBarBorder: string;
    tabBarActive: string;
    tabBarInactive: string;

    // Header
    headerBackground: string;
    headerText: string;

    // Card
    cardBackground: string;
    cardBorder: string;

    // Input
    inputBackground: string;
    inputBorder: string;
    inputText: string;
    inputPlaceholder: string;
}

export const lightTheme: Theme = {
    // Background Colors
    background: '#F8FAFC',
    backgroundSecondary: '#FFFFFF',
    backgroundTertiary: '#F1F5F9',

    // Surface Colors
    surface: '#FFFFFF',
    surfaceSecondary: '#F8FAFC',

    // Text Colors
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#94A3B8',
    textInverse: '#FFFFFF',

    // Primary Colors
    primary: '#1E3A8A',
    primaryLight: '#3B82F6',
    primaryDark: '#1E293B',

    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Border Colors
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    borderDark: '#CBD5E1',

    // Special Colors
    shadow: '#000000',
    overlay: 'rgba(15, 23, 42, 0.8)',

    // Tab Bar
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#F1F5F9',
    tabBarActive: '#1E3A8A',
    tabBarInactive: '#94A3B8',

    // Header
    headerBackground: '#1E3A8A',
    headerText: '#FFFFFF',

    // Card
    cardBackground: '#FFFFFF',
    cardBorder: '#F1F5F9',

    // Input
    inputBackground: '#FFFFFF',
    inputBorder: '#E2E8F0',
    inputText: '#0F172A',
    inputPlaceholder: '#94A3B8',
};

export const darkTheme: Theme = {
    // Background Colors
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    backgroundTertiary: '#334155',

    // Surface Colors
    surface: '#1E293B',
    surfaceSecondary: '#334155',

    // Text Colors
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    textInverse: '#0F172A',

    // Primary Colors
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#2563EB',

    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Border Colors
    border: '#334155',
    borderLight: '#475569',
    borderDark: '#1E293B',

    // Special Colors
    shadow: '#000000',
    overlay: 'rgba(0, 0, 0, 0.9)',

    // Tab Bar
    tabBarBackground: '#1E293B',
    tabBarBorder: '#334155',
    tabBarActive: '#60A5FA',
    tabBarInactive: '#64748B',

    // Header
    headerBackground: '#1E293B',
    headerText: '#F1F5F9',

    // Card
    cardBackground: '#1E293B',
    cardBorder: '#334155',

    // Input
    inputBackground: '#334155',
    inputBorder: '#475569',
    inputText: '#F1F5F9',
    inputPlaceholder: '#64748B',
};

export const getTheme = (mode: ThemeMode, systemColorScheme: 'light' | 'dark'): Theme => {
    if (mode === 'auto') {
        return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return mode === 'dark' ? darkTheme : lightTheme;
};
