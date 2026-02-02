import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Switch,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';

const { width } = Dimensions.get('window');

const GenericFormScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { theme } = useThemeStore();
    const { title } = route.params || { title: 'Form' };

    // State for Roles Layout
    const [viewMode, setViewMode] = useState<'list' | 'detail'>(route.params?.viewMode || 'list');
    const [selectedRole, setSelectedRole] = useState<string | null>(route.params?.initialData?.name || null);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const rolesList = [
        { name: 'Accounts', status: 'Active', users: 4 },
        { name: 'Admin', status: 'Active', users: 2 },
        { name: 'Client', status: 'Active', users: 15 },
        { name: 'Management', status: 'Active', users: 3 },
        { name: 'Operations', status: 'Active', users: 8 },
        { name: 'Sales', status: 'Active', users: 6 },
        { name: 'Super Admin', status: 'Active', users: 1 }
    ];

    const filteredRoles = rolesList.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // State for Permissions (Mock)
    const [permissions, setPermissions] = useState({
        viewQuotation: true,
        editQuotation: false,
    });

    // --- Actions ---
    const handleRoleSelect = (roleName: string) => {
        setSelectedRole(roleName);
        setViewMode('detail');
    };

    const handleBackPress = () => {
        // Specific handling for Roles to ensure we go back to the Roles List (Tab)
        if (title === 'Roles') {
            navigation.navigate('Roles');
            return;
        }

        if (title === 'User') {
            navigation.navigate('Users');
            return;
        }

        // If we came here with explicit detail mode (e.g. from other screens), just go back
        if (route.params?.viewMode === 'detail') {
            navigation.goBack();
            return;
        }

        if (title === 'Roles' && viewMode === 'detail') {
            setViewMode('list');
            setSelectedRole(null);
        } else {
            navigation.goBack();
        }
    };

    // --- Renderers ---

    const renderCompanyForm = () => (
        <View style={styles.formContainer}>
            <View style={styles.sectionHeaderContainer}>
                <Text style={[styles.sectionHeaderTitle, { color: theme.text }]}>Company Details & Address</Text>
                <Text style={[styles.sectionHeaderSubtitle, { color: theme.textSecondary }]}>These details will be used in Order and Shipping Documents.</Text>
            </View>

            {/* Logo Section */}
            <View style={[styles.logoUploadBox, { borderColor: theme.border, backgroundColor: theme.backgroundTertiary }]}>
                <MaterialCommunityIcons name="image-plus" size={32} color={theme.textTertiary} />
                <Text style={[styles.logoUploadText, { color: theme.textSecondary }]}>Upload Company Logo</Text>
            </View>

            {/* Form Fields Grid */}
            <View style={styles.inputGrid}>
                {[
                    { label: 'Company Name', val: 'Test Company', full: true }, // Full width example if needed
                    { label: 'Currency', val: 'Indian Rupee', isDropdown: true },
                    { label: 'Contact Person Name', val: '', place: 'Enter Name' },
                    { label: 'Contact Person Email', val: '', place: 'Enter Email' },
                    { label: 'Contact Person Phone', val: '91-9825693685' },
                    { label: 'IE Code', val: 'IEC12345' },
                    { label: 'LUT No.', val: 'LUTN12345' },
                    { label: 'Pan No', val: 'PAN12345' },
                    { label: 'GSTIN Number', val: 'GSTIN125' },
                    { label: 'CIN No.', val: 'CIN12345' },
                ].map((field, i) => (
                    <View key={i} style={[styles.gridItem, field.full && { width: '100%' }]}>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>{field.label}</Text>
                        {field.isDropdown ? (
                            <TouchableOpacity style={[styles.input, styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                <Text style={{ color: theme.text }}>{field.val}</Text>
                                <Ionicons name="chevron-down" size={16} color={theme.textTertiary} />
                            </TouchableOpacity>
                        ) : (
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
                                defaultValue={field.val}
                                placeholder={field.place}
                                placeholderTextColor={theme.textTertiary}
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );

    const renderRolesList = () => (
        <View style={{ flex: 1 }}>
            {/* Search & Filter Header */}
            <View style={[styles.searchHeader, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
                <View style={[styles.roleSearchContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                    <Ionicons name="search" size={18} color={theme.textTertiary} style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Search roles..."
                        placeholderTextColor={theme.textTertiary}
                        style={[styles.roleSearchInput, { color: theme.text }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredRoles}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ padding: 16, gap: 12 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.roleCardItem, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: '#000' }]}
                        onPress={() => handleRoleSelect(item.name)}
                    >
                        <View style={[styles.roleIcon, { backgroundColor: '#E0F2FE' }]}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#0284C7' }}>{item.name.charAt(0)}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.roleName, { color: theme.text }]}>{item.name}</Text>
                            <Text style={[styles.roleMeta, { color: theme.textSecondary }]}>{item.users} Users Attached</Text>
                        </View>
                        <View style={styles.roleStatusRow}>
                            <View style={[styles.statusBadge, { backgroundColor: '#DCFCE7' }]}>
                                <Text style={{ fontSize: 10, color: '#166534', fontWeight: '600' }}>ACTIVE</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} style={{ marginLeft: 8 }} />
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ color: theme.textSecondary }}>No roles found matching "{searchQuery}"</Text>
                    </View>
                }
            />

            {/* Floating Action Button for New Role */}
            <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary, shadowColor: '#000' }]}>
                <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderRoleDetail = () => (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Basic Info */}
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={[styles.cardHeaderRow, { marginBottom: 0 }]}>
                    <View>
                        <Text style={[styles.cardTitle, { color: theme.text }]}>Role Information</Text>
                        <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>Basic details and visibility</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: '#DCFCE7' }]}>
                        <Text style={{ fontSize: 10, color: '#166534', fontWeight: '600' }}>ACTIVE</Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>Role Name</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
                        value={selectedRole || ''}
                        editable={true}
                    />
                </View>
            </View>

            {/* Permissions */}
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Permissions</Text>

                <View style={styles.permissionSection}>
                    <View style={styles.permissionHeader}>
                        <View style={[styles.permissionIconBox, { backgroundColor: '#3B82F6' }]}>
                            <MaterialCommunityIcons name="clipboard-list" size={14} color="#FFF" />
                        </View>
                        <Text style={[styles.permissionSectionTitle, { color: theme.text }]}>Quotations</Text>
                    </View>

                    <View style={styles.permissionRow}>
                        <Text style={[styles.permissionLabel, { color: theme.textSecondary }]}>View Quotation</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: theme.border, true: '#3B82F6' }}
                                thumbColor={'#FFF'}
                                value={permissions.viewQuotation}
                                onValueChange={(v) => setPermissions({ ...permissions, viewQuotation: v })}
                            />
                        </View>
                    </View>

                    <View style={[styles.permissionRow, { borderBottomWidth: 0 }]}>
                        <Text style={[styles.permissionLabel, { color: theme.textSecondary }]}>Edit Quotation</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: theme.border, true: '#3B82F6' }}
                                thumbColor={'#FFF'}
                                value={permissions.editQuotation}
                                onValueChange={(v) => setPermissions({ ...permissions, editQuotation: v })}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Notifications */}
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={styles.cardHeaderRow}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>Notifications</Text>
                    <Text style={{ fontSize: 12, color: '#3B82F6', fontWeight: '600' }}>Select All</Text>
                </View>

                {['Shipment Created', 'Shipment Overdue Bill Missing', 'Shipping Bill Uploaded'].map((notif, i) => (
                    <View key={i} style={styles.notificationRow}>
                        <Text style={[styles.notifText, { color: theme.textSecondary }]}>{notif}</Text>
                        <TouchableOpacity style={[styles.checkbox, { borderColor: theme.border }]}>
                            {/* Checkmark if selected */}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderDefaultForm = () => (
        <View style={styles.formContainer}>
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{title} Details</Text>
                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
                        placeholder={`Enter ${title} Name`}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
                        placeholder="Enter Description"
                        multiline
                        numberOfLines={4}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>
                    {viewMode === 'detail' && title === 'Roles' ? `Edit ${selectedRole}` : title}
                </Text>
                {(title !== 'Roles' || viewMode === 'detail') && (
                    <TouchableOpacity style={styles.saveHeaderBtn}>
                        <Text style={styles.saveHeaderText}>Save</Text>
                    </TouchableOpacity>
                )}
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                {title === 'Roles' && viewMode === 'list' ? (
                    renderRolesList()
                ) : (
                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        {title === 'Company' ? renderCompanyForm() :
                            title === 'Roles' && viewMode === 'detail' ? renderRoleDetail() :
                                renderDefaultForm()}
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {/* Footer - only for forms, not list */}
            {(title !== 'Roles' || viewMode === 'detail') && (
                <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnCancel, { borderColor: theme.border }]}
                        onPress={handleBackPress}
                    >
                        <Text style={[styles.btnText, { color: theme.text }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnSave, { backgroundColor: theme.primary }]}>
                        <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        elevation: 2,
        zIndex: 10,
    },
    backButton: { padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: '700' },
    saveHeaderBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#EFF6FF', borderRadius: 4 },
    saveHeaderText: { color: '#2563EB', fontWeight: '600', fontSize: 13 },
    content: { padding: 16 },

    // Grid Layouts
    inputGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
    gridItem: { width: '50%', paddingHorizontal: 8, marginBottom: 16 },

    formContainer: {},
    formGroup: { marginBottom: 16 },

    // Section Headers
    sectionHeaderContainer: { marginBottom: 20 },
    sectionHeaderTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    sectionHeaderSubtitle: { fontSize: 12 },

    // Logo Upload
    logoUploadBox: {
        height: 150,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        alignSelf: 'stretch',
    },
    logoUploadText: { fontSize: 12, marginTop: 8 },

    // Inputs
    label: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
    required: { color: '#EF4444' },
    input: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 },
    dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    textArea: { height: 100, textAlignVertical: 'top' },

    // ROLES LIST STYLES
    searchHeader: { padding: 16, borderBottomWidth: 1 },
    roleSearchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, height: 44 },
    roleSearchInput: { flex: 1, fontSize: 14, paddingVertical: 0 },

    roleCardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 4,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    roleIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    roleName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
    roleMeta: { fontSize: 12 },
    roleStatusRow: { flexDirection: 'row', alignItems: 'center' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    // Card & Detail Styles
    card: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    cardSubtitle: { fontSize: 12 },

    // Notifications
    notificationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
    notifText: { fontSize: 13 },
    checkbox: { width: 20, height: 20, borderWidth: 2, borderRadius: 4 },

    // Permissions
    permissionSection: { marginTop: 8 },
    permissionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    permissionIconBox: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    permissionSectionTitle: { fontSize: 14, fontWeight: '700' },
    permissionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingLeft: 32, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    permissionLabel: { fontSize: 13 },
    switchContainer: {},

    // Footer
    footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, gap: 12 },
    btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
    btnCancel: { backgroundColor: 'transparent' },
    btnSave: { borderWidth: 0 },
    btnText: { fontSize: 14, fontWeight: '600' }
});

export default GenericFormScreen;
