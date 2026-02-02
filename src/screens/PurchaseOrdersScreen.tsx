import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    SectionList,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';

// Mock Data
interface PurchaseOrder {
    id: string;
    description: string;
    vendor: string;
    vendorCompany: string;
    date: string; // Grouping Key
    total: string;
    items: string;
    status: 'Ordered' | 'Received' | 'Pending' | 'Cancelled';
}

const MOCK_DATA: PurchaseOrder[] = [
    { id: '#PO-2026-301', description: 'Raw Steel Supply', vendor: 'Mike Ross', vendorCompany: 'STEEL WORKS LTD', items: '50 Tons', total: 'USD 55,000.00', status: 'Ordered', date: 'Jan 22, 2026' },
    { id: '#PO-2026-302', description: 'Office Electronics', vendor: 'Sarah Lee', vendorCompany: 'TECH DISTRIBUTORS', items: '150 Units', total: 'USD 22,000.00', status: 'Received', date: 'Jan 21, 2026' },
    { id: '#PO-2026-303', description: 'Packing Materials', vendor: 'Tom Hanks', vendorCompany: 'PACK RIGHT INC', items: '500 Boxes', total: 'USD 5,500.00', status: 'Pending', date: 'Jan 20, 2026' },
    { id: '#PO-2026-304', description: 'Cleaning Supplies', vendor: 'Jane Doe', vendorCompany: 'CLEAN CO', items: '100 Kits', total: 'USD 1,200.00', status: 'Cancelled', date: 'Jan 18, 2026' },
];

const groupData = (data: PurchaseOrder[]) => {
    const groups: { title: string; data: PurchaseOrder[] }[] = [];
    data.forEach(item => {
        const group = groups.find(g => g.title === item.date);
        if (group) {
            group.data.push(item);
        } else {
            groups.push({ title: item.date, data: [item] });
        }
    });
    return groups;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Received': return { bg: '#10B981', text: '#FFFFFF' }; // Green
        case 'Ordered': return { bg: '#3B82F6', text: '#FFFFFF' }; // Blue
        case 'Pending': return { bg: '#F59E0B', text: '#FFFFFF' }; // Amber
        case 'Cancelled': return { bg: '#EF4444', text: '#FFFFFF' }; // Red
        default: return { bg: '#64748B', text: '#FFFFFF' }; // Grey
    }
};

const PurchaseOrdersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const sections = groupData(MOCK_DATA);

    const renderItem = ({ item }: { item: PurchaseOrder }) => {
        const { bg, text } = getStatusColor(item.status);
        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('PurchaseOrderDetails', { id: item.id })}
            >
                {/* Top Row */}
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={[styles.checkbox, { borderColor: theme.borderDark }]} />
                        <View style={[styles.iconBox, { backgroundColor: theme.primaryLight + '20' }]}>
                            <MaterialCommunityIcons name="file-sign" size={18} color={theme.primaryLight} />
                        </View>

                        <View style={styles.headerTextContainer}>
                            <Text style={[styles.idText, { color: theme.primaryLight }]}>{item.id}</Text>
                            <Text style={styles.companyRow} numberOfLines={1}>
                                <Text style={[styles.companyName, { color: theme.text }]}>{item.vendorCompany}</Text>
                                <Text style={[styles.separator, { color: theme.borderDark }]}> • </Text>
                                <Text style={[styles.productText, { color: theme.textSecondary }]}>{item.description}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                        <Text style={[styles.statusText, { color: text }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Details Row */}
                <View style={[styles.detailsRow, { borderTopColor: theme.borderLight }]}>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Vendor</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.vendor}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Items</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.items}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Total</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.total}</Text>
                    </View>
                </View>

                <View style={styles.cardAction}>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={theme.borderDark} />
                </View>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionHeaderText, { color: theme.text }]}>{title}</Text>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.paginationContainer}>
            <TouchableOpacity style={[styles.pageButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <MaterialCommunityIcons name="chevron-left" size={20} color={theme.textSecondary} />
                <Text style={[styles.pageButtonText, { color: theme.textSecondary }]}>Prev</Text>
            </TouchableOpacity>
            <Text style={[styles.pageInfo, { color: theme.textSecondary }]}>Page 1 of 5</Text>
            <TouchableOpacity style={[styles.pageButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.pageButtonText, { color: theme.textSecondary }]}>Next</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                {!isSearchExpanded ? (
                    <>
                        <View style={styles.headerLeftContainer}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                                <Ionicons name="menu" size={24} color={theme.headerText} />
                            </TouchableOpacity>
                            <Text style={[styles.headerTitle, { color: theme.headerText }]}>Purchase Orders</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => setIsSearchExpanded(true)} style={styles.iconButton}>
                                <Ionicons name="search" size={20} color={theme.headerText} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('GenericForm', { title: 'PurchaseOrder' })}
                                style={styles.addButton}
                            >
                                <Ionicons name="add" size={24} color={theme.headerText} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={() => setIsFilterExpanded(!isFilterExpanded)}>
                                <Ionicons name={isFilterExpanded ? "filter" : "filter-outline"} size={20} color={theme.headerText} />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={[styles.searchBarHeader, { backgroundColor: theme.surface }]}>
                        <Ionicons name="search" size={20} color={theme.textSecondary} />
                        <TextInput
                            placeholder="Search Purchase Orders..."
                            style={[styles.searchInputHeader, { color: theme.text }]}
                            placeholderTextColor={theme.textTertiary}
                            autoFocus={true}
                        />
                        <TouchableOpacity onPress={() => setIsSearchExpanded(false)}>
                            <Text style={[styles.cancelText, { color: theme.headerText }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Filter */}
            {isFilterExpanded && (
                <View style={[styles.filterContainer, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                    <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Text style={[styles.filterDropdownText, { color: theme.textSecondary }]}>Select Date</Text>
                        <Ionicons name="calendar-outline" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Text style={[styles.filterDropdownText, { color: theme.textSecondary }]}>Select Status</Text>
                        <Ionicons name="chevron-down" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>
            )}

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
            />

            {/* User Menu removed */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        backgroundColor: '#1E3A8A',
        borderBottomWidth: 0,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    headerLeftContainer: { flexDirection: 'row', alignItems: 'center' },
    menuButton: { marginRight: 12 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    addButton: { padding: 4 },
    iconButton: { padding: 4 },
    headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
    avatarInitial: { color: '#1E3A8A', fontWeight: 'bold' },

    createButtonIconSmall: { backgroundColor: '#FFFFFF', width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    searchBarHeader: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 8, height: 36 },
    searchInputHeader: { flex: 1, marginLeft: 8, fontSize: 13, color: '#0F172A', paddingVertical: 0 },
    cancelText: { fontSize: 13, color: '#FFFFFF', fontWeight: '600', marginLeft: 8 },

    filterContainer: { paddingHorizontal: 16, paddingBottom: 16, gap: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    filterDropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12 },
    filterDropdownText: { fontSize: 13, color: '#64748B', fontWeight: '500' },

    listContent: { paddingHorizontal: 16, paddingBottom: 40 },
    sectionHeader: { marginBottom: 12, marginTop: 8 },
    sectionHeaderText: { fontSize: 13, fontWeight: '700', color: '#1E293B' },

    // Card Styles (Compact)
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Platform.select({
            default: { elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }
        }),
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0 },
    headerLeft: { flexDirection: 'row', gap: 8, flex: 1 },
    checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 4, marginTop: 2 },
    iconBox: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center' },
    headerTextContainer: { flex: 1, justifyContent: 'center' },

    idText: { fontSize: 13, fontWeight: '700', color: '#2563EB', marginBottom: 0 },
    companyRow: { flexDirection: 'row', alignItems: 'center' },
    companyName: { fontSize: 11, fontWeight: '700', color: '#1E293B' },
    productText: { fontSize: 10, color: '#64748B', fontWeight: '400' },
    separator: { color: '#CBD5E1', fontSize: 10 },

    statusBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, minWidth: 60, alignItems: 'center' },
    statusText: { fontSize: 10, fontWeight: '600' },

    detailsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F8FAFC', paddingTop: 4, marginTop: 0, paddingLeft: 38 },
    detailItem: { flex: 1 },
    detailLabel: { fontSize: 9, color: '#94A3B8', marginBottom: 0 },
    detailValue: { fontSize: 10, fontWeight: '600', color: '#334155' },

    cardAction: { position: 'absolute', right: 12, bottom: 12 },

    userMenuPopup: { position: 'absolute', top: 60, right: 16, width: 120, backgroundColor: '#FFFFFF', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: '#E2E8F0', zIndex: 100, elevation: 10 },
    popupItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8 },

    paginationContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 16 },
    pageButton: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
    pageButtonText: { fontSize: 12, fontWeight: '600', color: '#64748B', marginHorizontal: 4 },
    pageInfo: { fontSize: 12, fontWeight: '500', color: '#64748B' },
});

export default PurchaseOrdersScreen;
