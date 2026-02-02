import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';
import { ThemeMode } from '../constants/theme';

const ThemeSelector: React.FC = () => {
    const { mode, setThemeMode, theme } = useThemeStore();

    const options: { value: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
        { value: 'light', label: 'Light', icon: 'sunny' },
        { value: 'dark', label: 'Dark', icon: 'moon' },
        { value: 'auto', label: 'Auto', icon: 'phone-portrait' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.surface }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <Ionicons name="color-palette" size={20} color={theme.primary} />
                <Text style={[styles.headerText, { color: theme.text }]}>Theme</Text>
            </View>

            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.option,
                            {
                                backgroundColor: mode === option.value ? theme.primary : theme.inputBackground,
                                borderColor: mode === option.value ? theme.primary : theme.border,
                            }
                        ]}
                        onPress={() => setThemeMode(option.value)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={option.icon}
                            size={24}
                            color={mode === option.value ? theme.textInverse : theme.textSecondary}
                        />
                        <Text
                            style={[
                                styles.optionText,
                                { color: mode === option.value ? theme.textInverse : theme.text }
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 2,
    },
    optionText: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 8,
    },
});

export default ThemeSelector;
