import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: any;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    containerStyle,
    secureTextEntry,
    ...props
}) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[styles.input, leftIcon && styles.inputWithLeftIcon]}
                    placeholderTextColor="#999"
                    secureTextEntry={isSecure}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        style={styles.rightIcon}
                    >
                        <Text style={styles.eyeIcon}>{isSecure ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <View style={styles.rightIcon}>{rightIcon}</View>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1C1C1E',
    },
    inputWithLeftIcon: {
        paddingLeft: 8,
    },
    leftIcon: {
        paddingLeft: 12,
    },
    rightIcon: {
        paddingRight: 12,
    },
    eyeIcon: {
        fontSize: 20,
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 4,
        marginLeft: 4,
    },
});

export default Input;
