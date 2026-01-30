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
} from 'react-native';
import { userApi } from '../api/master';
import { User } from '../types';
import Loading from '../components/Loading';
import Button from '../components/Button';

const UsersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await userApi.getAll();
            setUsers(data);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch users';
            if (Platform.OS === 'web') {
                alert(message);
            } else {
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

    const handleDelete = async (id: string) => {
        const confirmDelete = () => {
            Alert.alert(
                'Delete User',
                'Are you sure you want to delete this user?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                await userApi.delete(id);
                                fetchUsers();
                                if (Platform.OS === 'web') {
                                    alert('User deleted successfully');
                                } else {
                                    Alert.alert('Success', 'User deleted successfully');
                                }
                            } catch (error: any) {
                                const message = error.response?.data?.message || 'Failed to delete user';
                                if (Platform.OS === 'web') {
                                    alert(message);
                                } else {
                                    Alert.alert('Error', message);
                                }
                            }
                        },
                    },
                ]
            );
        };

        if (Platform.OS === 'web') {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    await userApi.delete(id);
                    fetchUsers();
                    alert('User deleted successfully');
                } catch (error: any) {
                    alert(error.response?.data?.message || 'Failed to delete user');
                }
            }
        } else {
            confirmDelete();
        }
    };

    const renderUser = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.userCard}
            activeOpacity={0.7}
        >
            <View style={styles.userInfo}>
                <View style={styles.userHeader}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userRole}>{item.role}</Text>
                </View>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userTenant}>Tenant: {item.tenantId}</Text>
                <Text style={styles.userDate}>
                    Joined: {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return <Loading message="Loading users..." />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Users</Text>
                <Text style={styles.count}>{users.length} users</Text>
            </View>

            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No users found</Text>
                        <Text style={styles.emptySubtext}>Users will appear here</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        ...Platform.select({
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
        }),
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
    deleteButton: {
        padding: 8,
        justifyContent: 'center',
    },
    deleteIcon: {
        fontSize: 24,
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
