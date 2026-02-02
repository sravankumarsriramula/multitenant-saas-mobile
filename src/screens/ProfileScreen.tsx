import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import ThemeSelector from '../components/ThemeSelector';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { user, logout } = useAuthStore();
    const { theme } = useThemeStore();

    const handleLogout = async () => {
        await logout();
    };

    const profileItems = [
        { label: 'Name', value: user?.name || 'N/A' },
        { label: 'Email', value: user?.email || 'N/A' },
        { label: 'Role', value: user?.role || 'User' },
        { label: 'Tenant ID', value: user?.tenantId || 'N/A' },
        { label: 'User ID', value: user?.id || 'N/A' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Standard Header */}
            <View style={[styles.topHeader, { backgroundColor: theme.headerBackground }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color={theme.headerText} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                        <Text style={[styles.avatarText, { color: theme.textInverse }]}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'User'}</Text>
                    <Text style={[styles.userEmail, { color: theme.textTertiary }]}>{user?.email || ''}</Text>
                </View>

                {/* Theme Selector */}
                <ThemeSelector />

                <View style={[styles.section, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Information</Text>
                    {profileItems.map((item, index) => (
                        <View key={index} style={[styles.infoRow, { borderBottomColor: theme.borderLight }]}>
                            <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>{item.label}</Text>
                            <Text style={[styles.infoValue, { color: theme.text }]}>{item.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.section, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Created</Text>
                    <Text style={[styles.dateText, { color: theme.text }]}>
                        {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                            : 'N/A'}
                    </Text>
                </View>

                <View style={styles.actions}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        variant="danger"
                        style={styles.logoutButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        backgroundColor: '#1E3A8A', // Deep Blue
        borderBottomWidth: 0,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    menuButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: 32,
        paddingVertical: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        ...Platform.select({
            web: {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            },
        }),
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#8E8E93',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            },
        }),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    infoLabel: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: '#1C1C1E',
        fontWeight: '600',
        maxWidth: '60%',
        textAlign: 'right',
    },
    dateText: {
        fontSize: 16,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    actions: {
        marginTop: 16,
    },
    logoutButton: {
        marginTop: 8,
    },
});

export default ProfileScreen;
