import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { ThemeMode, Theme, getTheme, lightTheme, darkTheme } from '../constants/theme';

const THEME_STORAGE_KEY = '@theme_mode';

interface ThemeState {
    mode: ThemeMode;
    theme: Theme;
    systemColorScheme: 'light' | 'dark';

    // Actions
    setThemeMode: (mode: ThemeMode) => Promise<void>;
    initializeTheme: () => Promise<void>;
    updateSystemColorScheme: (scheme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: 'auto',
    theme: lightTheme,
    systemColorScheme: (Appearance.getColorScheme() || 'light') as 'light' | 'dark',

    setThemeMode: async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            const { systemColorScheme } = get();
            const newTheme = getTheme(mode, systemColorScheme);

            set({
                mode,
                theme: newTheme,
            });
        } catch (error) {
            console.error('Error saving theme mode:', error);
        }
    },

    initializeTheme: async () => {
        try {
            const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            const mode = (savedMode as ThemeMode) || 'auto';
            const systemColorScheme = (Appearance.getColorScheme() || 'light') as 'light' | 'dark';
            const theme = getTheme(mode, systemColorScheme);

            set({
                mode,
                theme,
                systemColorScheme,
            });

            // Listen for system theme changes
            Appearance.addChangeListener(({ colorScheme }) => {
                get().updateSystemColorScheme((colorScheme || 'light') as 'light' | 'dark');
            });
        } catch (error) {
            console.error('Error initializing theme:', error);
        }
    },

    updateSystemColorScheme: (scheme: 'light' | 'dark') => {
        const { mode } = get();
        const newTheme = getTheme(mode, scheme);

        set({
            systemColorScheme: scheme,
            theme: newTheme,
        });
    },
}));
