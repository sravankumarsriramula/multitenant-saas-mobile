import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle = styles.button;
        const variantStyle = styles[`${variant}Button`];
        const sizeStyle = styles[`${size}Button`];
        const disabledStyle = disabled ? styles.disabledButton : {};

        return { ...baseStyle, ...variantStyle, ...sizeStyle, ...disabledStyle };
    };

    const getTextStyle = (): TextStyle => {
        const baseStyle = styles.text;
        const variantStyle = styles[`${variant}Text`];
        const sizeStyle = styles[`${size}Text`];

        return { ...baseStyle, ...variantStyle, ...sizeStyle };
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? '#007AFF' : '#FFFFFF'} />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
    },
    // Variants
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    secondaryButton: {
        backgroundColor: '#5856D6',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#007AFF',
    },
    dangerButton: {
        backgroundColor: '#FF3B30',
    },
    disabledButton: {
        backgroundColor: '#E5E5EA',
        borderColor: '#E5E5EA',
    },
    // Sizes
    smallButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    mediumButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    largeButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    // Text styles
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#FFFFFF',
    },
    outlineText: {
        color: '#007AFF',
    },
    dangerText: {
        color: '#FFFFFF',
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },
});

export default Button;
