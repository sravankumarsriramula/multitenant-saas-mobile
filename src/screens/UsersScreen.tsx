import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { useAuthStore } from '../store/authStore';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    tenantId: string;
    createdAt: string;
}

const UsersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { token } = useAuthStore();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch users';
            console.error('Error fetching users:', error);
            if (Platform.OS !== 'web') {
                Alert.alert('Error', message);
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchUsers();
    };

    const renderUser = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.userCard}
            activeOpacity={0.7}
        >
            <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: item.role.toLowerCase() === 'admin' ? '#EF4444' : '#10B981' }]}>
                    <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <View style={styles.metaRow}>
                    <View style={[styles.roleBadge, {
                        backgroundColor: item.role.toLowerCase() === 'admin' ? '#FEE2E2' : '#D1FAE5',
                        borderColor: item.role.toLowerCase() === 'admin' ? '#EF4444' : '#10B981'
                    }]}>
                        <Text style={[styles.roleText, {
                            color: item.role.toLowerCase() === 'admin' ? '#EF4444' : '#10B981'
                        }]}>
                            {item.role}
                        </Text>
                    </View>
                    <Text style={styles.joinedText}>
                        {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={24} color="#334155" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Users</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading users...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color="#334155" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Users</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.statsBar}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{users.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {users.filter(u => u.role.toLowerCase() === 'admin').length}
                    </Text>
                    <Text style={styles.statLabel}>Admins</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {users.filter(u => u.role.toLowerCase() === 'user').length}
                    </Text>
                    <Text style={styles.statLabel}>Users</Text>
                </View>
            </View>

            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007AFF']} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="people-outline" size={64} color="#CBD5E1" />
                        <Text style={styles.emptyText}>No users found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    menuButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    addButton: {
        padding: 4,
    },
    statsBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#64748B',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    count: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    userCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
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
    userInfo: {
        flex: 1,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    userRole: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
        backgroundColor: '#007AFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        textTransform: 'uppercase',
    },
    userEmail: {
        fontSize: 15,
        color: '#007AFF',
        marginBottom: 6,
    },
    userTenant: {
        fontSize: 13,
        color: '#8E8E93',
        marginBottom: 4,
    },
    userDate: {
        fontSize: 12,
        color: '#8E8E93',
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    roleBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        marginRight: 12,
    },
    roleText: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    joinedText: {
        fontSize: 11,
        color: '#94A3B8',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#8E8E93',
    },
});

export default UsersScreen;
