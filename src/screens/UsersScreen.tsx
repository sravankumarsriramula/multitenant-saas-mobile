import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Platform,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    tenantId: string;
    createdAt: string;
}

const UsersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();
    const { token } = useAuthStore();

    // State
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Pagination State
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = useCallback(async (isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            let data = response.data;
            // Handle possible response structures
            if (data.data && Array.isArray(data.data)) {
                data = data.data;
            } else if (!Array.isArray(data)) {
                data = [];
            }

            // Client-side search filtering
            let filtered = data.filter((u: User) =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Client-side pagination
            const total = Math.ceil(filtered.length / limit);
            setTotalPages(total || 1);
            setTotalUsers(filtered.length);

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginated = filtered.slice(start, end);

            setUsers(paginated);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            // Fallback default on error
            setUsers([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [page, searchQuery, limit, token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchUsers(true);
    };

    const handleCreateUser = () => {
        navigation.navigate('GenericForm', { title: 'User', mode: 'create', viewMode: 'detail' });
    };

    const handleEditUser = (user: User) => {
        navigation.navigate('GenericForm', { title: 'User', roleId: user.id, mode: 'edit', initialData: user, viewMode: 'detail' });
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const renderUserItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={[styles.listItem, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}
            activeOpacity={0.7}
            onPress={() => handleEditUser(item)}
        >
            <View style={styles.cardContent}>
                <View style={[styles.avatar, { backgroundColor: item.role.toLowerCase() === 'admin' || item.role.toLowerCase() === 'super admin' ? '#FEE2E2' : '#E0F2FE' }]}>
                    <Text style={[styles.avatarText, { color: item.role.toLowerCase() === 'admin' || item.role.toLowerCase() === 'super admin' ? '#EF4444' : '#0284C7' }]}>
                        {item.name.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{item.email}</Text>
                    <View style={styles.metaRow}>
                        <View style={[styles.roleBadge, {
                            backgroundColor: '#F1F5F9',
                            borderColor: '#CBD5E1'
                        }]}>
                            <Text style={[styles.roleText, { color: '#475569' }]}>
                                {item.role.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.headerText} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText, marginLeft: 8 }]}>Users ({totalUsers})</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.addButton}>
                        <Ionicons name={showSearch ? "search" : "search-outline"} size={24} color={theme.headerText} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCreateUser} style={styles.addButton}>
                        <Ionicons name="add" size={24} color={theme.headerText} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            {showSearch && (
                <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
                    <View style={[styles.searchInputParams, { backgroundColor: theme.inputBackground }]}>
                        <Ionicons name="search" size={20} color={theme.textTertiary} />
                        <TextInput
                            style={[styles.searchInput, { color: theme.text }]}
                            placeholder="Search Users..."
                            placeholderTextColor={theme.textTertiary}
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                setPage(1);
                            }}
                            autoFocus={true}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={18} color={theme.textTertiary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            {/* List */}
            {
                loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={users}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
                        }
                        ListEmptyComponent={
                            <View style={styles.centerContainer}>
                                <Text style={{ color: theme.textSecondary }}>No users found.</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={styles.paginationContainer}>
                                <TouchableOpacity
                                    onPress={handlePreviousPage}
                                    disabled={page === 1}
                                    style={[styles.pageButton, page === 1 && styles.disabledButton]}
                                >
                                    <Ionicons name="chevron-back" size={20} color={page === 1 ? '#9CA3AF' : theme.primary} />
                                </TouchableOpacity>
                                <Text style={[styles.pageText, { color: theme.text }]}>
                                    Page {page} of {totalPages}
                                </Text>
                                <TouchableOpacity
                                    onPress={handleNextPage}
                                    disabled={page === totalPages}
                                    style={[styles.pageButton, page === totalPages && styles.disabledButton]}
                                >
                                    <Ionicons name="chevron-forward" size={20} color={page === totalPages ? '#9CA3AF' : theme.primary} />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        elevation: 4,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 4,
    },
    addButton: {
        padding: 4,
    },
    searchContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    searchInputParams: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    listContent: {
        padding: 0,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    listItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 12,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    roleBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
    },
    roleText: {
        fontSize: 10,
        fontWeight: '700',
    },
    dateText: {
        fontSize: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 16,
    },
    pageButton: {
        padding: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    pageText: {
        fontSize: 14,
        fontWeight: '600',
    }
});

export default UsersScreen;
