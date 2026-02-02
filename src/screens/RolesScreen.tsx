import React, { useEffect, useState, useCallback } from 'react';
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
    TextInput
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface Role {
    id: number;
    name: string;
    description: string;
    usersCount: number;
    isSystem?: boolean;
    createdAt: string;
    status: 'Active' | 'Inactive';
}

const RolesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();
    const { token } = useAuthStore();

    // State
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Pagination State
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Items per page
    const [totalPages, setTotalPages] = useState(1);
    const [totalRoles, setTotalRoles] = useState(0);

    const fetchRoles = useCallback(async (isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        try {
            // Static Data
            const staticRoles: Role[] = [
                { id: 1, name: 'Accounts', description: 'Accounts Department', usersCount: 4, status: 'Active', createdAt: new Date().toISOString() },
                { id: 2, name: 'Admin', description: 'Administrator', usersCount: 2, status: 'Active', createdAt: new Date().toISOString() },
                { id: 3, name: 'Client', description: 'Client Access', usersCount: 15, status: 'Active', createdAt: new Date().toISOString() },
                { id: 4, name: 'Management', description: 'Management Team', usersCount: 3, status: 'Active', createdAt: new Date().toISOString() },
                { id: 5, name: 'Operations', description: 'Operations Team', usersCount: 8, status: 'Active', createdAt: new Date().toISOString() },
                { id: 6, name: 'Sales', description: 'Sales Department', usersCount: 6, status: 'Active', createdAt: new Date().toISOString() },
                { id: 7, name: 'Super Admin', description: 'Full Access', usersCount: 1, status: 'Active', createdAt: new Date().toISOString() }
            ];

            // Client-side search filtering
            let filtered = staticRoles.filter((r: Role) =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Client-side pagination
            const total = Math.ceil(filtered.length / limit);
            setTotalPages(total || 1);
            setTotalRoles(filtered.length);

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginated = filtered.slice(start, end);

            setRoles(paginated);
        } catch (error: any) {
            console.error('Error setting roles:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [page, searchQuery, limit]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const onRefresh = () => {
        setRefreshing(true);
        // Reset to page 1 on refresh
        setPage(1);
        fetchRoles(true);
    };

    const handleCreateRole = () => {
        // Navigate to Create Screen (or use GenericForm with special param)
        // Reusing GenericForm logic for now, or we can make a new one.
        // Given GenericForm already has "Roles" logic, we can leverage it or replace it.
        // Let's pass 'Roles' title but we might need to handle the detail view better.
        navigation.navigate('GenericForm', { title: 'Roles', mode: 'create', viewMode: 'detail' });
    };

    const handleEditRole = (role: Role) => {
        navigation.navigate('GenericForm', { title: 'Roles', roleId: role.id, mode: 'edit', initialData: role, viewMode: 'detail' });
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const renderRoleItem = ({ item }: { item: Role }) => (
        <TouchableOpacity
            style={[styles.listItem, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}
            activeOpacity={0.7}
            onPress={() => handleEditRole(item)}
        >
            <View style={styles.cardContent}>
                <View style={styles.headerInfo}>
                    <Text style={[styles.roleName, { color: theme.text }]}>{item.name}</Text>
                    <View style={styles.metaRow}>
                        <View style={[styles.statusBadge, {
                            backgroundColor: item.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                            borderColor: item.status === 'Active' ? '#166534' : '#991B1B'
                        }]}>
                            <Text style={[styles.statusText, {
                                color: item.status === 'Active' ? '#166534' : '#991B1B'
                            }]}>
                                {item.status.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={[styles.roleDate, { color: theme.textSecondary }]}>
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
                    <Text style={[styles.headerTitle, { color: theme.headerText, marginLeft: 8 }]}>Roles ({totalRoles})</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.addButton}>
                        <Ionicons name={showSearch ? "search" : "search-outline"} size={24} color={theme.headerText} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCreateRole} style={styles.addButton}>
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
                            placeholder="Search Roles..."
                            placeholderTextColor={theme.textTertiary}
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                setPage(1); // Reset to page 1 on search
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
                        data={roles}
                        renderItem={renderRoleItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
                        }
                        ListEmptyComponent={
                            <View style={styles.centerContainer}>
                                <Text style={{ color: theme.textSecondary }}>No roles found.</Text>
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
        </SafeAreaView >
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
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statsBar: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9', // Fallback
        marginTop: 0,
    },
    statItem: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1, // Center it as sole item
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '500',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E0F2FE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0284C7',
    },
    headerInfo: {
        flex: 1,
    },
    roleName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    roleDate: {
        fontSize: 12,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
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

export default RolesScreen;
