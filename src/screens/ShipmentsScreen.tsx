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
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

// Mock Data
interface Shipment {
    id: string;
    product: string;
    receiver: string;
    receiverCompany: string;
    country: string;
    agent: string;
    value: string;
    status: 'In Transit' | 'Preparing' | 'Delivered' | 'Pending';
    date: string; // Grouping Key
}

const MOCK_DATA: Shipment[] = [
    { id: '#SHP-2026-991', product: 'Chemical Supplies - Batch A', receiver: 'SS', receiverCompany: 'SKY SHORE PVT LTD', country: 'Kenya', agent: 'Sravan Kumar', value: 'USD 45,000.00', status: 'In Transit', date: 'Jan 22, 2026' },
    { id: '#SHP-2026-882', product: 'Steel Pipes - Large', receiver: 'BC', receiverCompany: 'BUILDERS CO', country: 'Uganda', agent: 'Sravan Kumar', value: 'USD 32,000.00', status: 'Preparing', date: 'Jan 21, 2026' },
    { id: '#SHP-2026-773', product: 'Electronics - Batch C', receiver: 'TE', receiverCompany: 'TECH ENTERPRISES', country: 'USA', agent: 'John Doe', value: 'USD 12,500.00', status: 'Delivered', date: 'Jan 21, 2026' },
    { id: '#SHP-2026-664', product: 'Textiles - Cotton', receiver: 'FK', receiverCompany: 'FASHION KART', country: 'India', agent: 'Amit Sharma', value: 'USD 8,200.00', status: 'Pending', date: 'Jan 20, 2026' },
];

// Helper to group data
const groupData = (data: Shipment[]) => {
    const groups: { title: string; data: Shipment[] }[] = [];
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
        case 'In Transit': return { bg: '#3B82F6', text: '#FFFFFF' }; // Blue
        case 'Preparing': return { bg: '#64748B', text: '#FFFFFF' }; // Grey
        case 'Delivered': return { bg: '#10B981', text: '#FFFFFF' }; // Green
        default: return { bg: '#F59E0B', text: '#FFFFFF' }; // Amber
    }
};

const ShipmentsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { user, logout } = useAuthStore();
    const { theme } = useThemeStore();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const sections = groupData(MOCK_DATA);

    const renderItem = ({ item }: { item: Shipment }) => {
        const { bg, text } = getStatusColor(item.status);
        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ShipmentDetails', { id: item.id })}
            >
                {/* Top Row: Check/Icon + Company/ID + Status */}
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        {/* Checkbox & Icon */}
                        <TouchableOpacity style={[styles.checkbox, { borderColor: theme.borderDark }]} />
                        <View style={[styles.shipmentIconBox, { backgroundColor: theme.primaryLight + '20' }]}>
                            <MaterialCommunityIcons name="ferry" size={18} color={theme.primaryLight} />
                        </View>

                        {/* Main Content: ID Top, Company + Product Below */}
                        <View style={styles.headerTextContainer}>
                            <Text style={[styles.shipmentId, { color: theme.primaryLight }]}>{item.id}</Text>
                            <Text style={styles.companyRow} numberOfLines={1}>
                                <Text style={[styles.companyName, { color: theme.text }]}>{item.receiverCompany}</Text>
                                <Text style={[styles.separator, { color: theme.borderDark }]}>•</Text>
                                <Text style={[styles.productText, { color: theme.textSecondary }]}>{item.product}</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Status Badge */}
                    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                        <Text style={[styles.statusText, { color: text }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Details Row (Compact) */}
                <View style={[styles.detailsRow, { borderTopColor: theme.borderLight }]}>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Country</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.country}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Agent</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.agent}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>Est. Value</Text>
                        <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{item.value}</Text>
                    </View>
                </View>

                {/* Chevron for mobile affordance (Optional, maybe remove to save width/clutter?) */}
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
            {/* Header: Title + User + Actions */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                {!isSearchExpanded ? (
                    <>
                        <View style={styles.headerLeftContainer}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                                <Ionicons name="menu" size={24} color={theme.headerText} />
                            </TouchableOpacity>
                            <Text style={[styles.headerTitle, { color: theme.headerText }]}>Shipments</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => setIsSearchExpanded(true)} style={styles.iconButton}>
                                <Ionicons name="search" size={20} color={theme.headerText} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.createButtonIconSmall, { backgroundColor: theme.surface }]}>
                                <Ionicons name="add" size={20} color={theme.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => setIsFilterExpanded(!isFilterExpanded)}
                            >
                                <Ionicons name={isFilterExpanded ? "filter" : "filter-outline"} size={20} color={theme.headerText} />
                            </TouchableOpacity>

                            {/* User Avatar */}
                            <TouchableOpacity
                                style={[styles.headerAvatar, { backgroundColor: theme.surface }]}
                                onPress={() => setMenuVisible(!menuVisible)}
                            >
                                <Text style={[styles.avatarInitial, { color: theme.primary }]}>{user?.name?.[0] || 'U'}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={[styles.searchBarHeader, { backgroundColor: theme.surface }]}>
                        <Ionicons name="search" size={20} color={theme.textSecondary} />
                        <TextInput
                            placeholder="Search by Shipment Number"
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

            {/* Filter Section (Collapsible) */}
            {isFilterExpanded && (
                <View style={[styles.filterContainer, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                    <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Text style={[styles.filterDropdownText, { color: theme.textSecondary }]}>Select Shipment Date</Text>
                        <Ionicons name="calendar-outline" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Text style={[styles.filterDropdownText, { color: theme.textSecondary }]}>Select Method</Text>
                        <Ionicons name="chevron-down" size={18} color={theme.textSecondary} />
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

            {/* User Menu Popup */}
            {menuVisible && (
                <View style={[styles.userMenuPopup, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.popupItem} onPress={() => { setMenuVisible(false); logout(); }}>
                        <Ionicons name="log-out-outline" size={16} color={theme.error} style={{ marginRight: 8 }} />
                        <Text style={{ color: theme.error, fontSize: 13 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    // Header
    header: {
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
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        padding: 4,
    },
    headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        color: '#1E3A8A',
        fontWeight: 'bold',
    },

    // Sub Header
    subHeader: {
        padding: 16,
        paddingBottom: 12,
        minHeight: 52, // Keep stable height
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align to right when collapsed
        gap: 12,
    },
    searchIconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchContainerExpanded: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#2563EB', // Highlight
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    searchContainer: {
        // Deprecated or re-used if needed
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: '#0F172A',
    },
    createButton: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButtonIcon: {
        backgroundColor: '#1E293B',
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Actions
    createButtonIconSmall: {
        backgroundColor: '#FFFFFF',
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Header Search
    searchBarHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 36,
    },
    searchInputHeader: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: '#0F172A',
        paddingVertical: 0,
    },
    cancelText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 8,
    },


    // Filters
    filterContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    filterDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12, // Taller click area
    },
    filterDropdownText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },

    // List
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        marginBottom: 12,
        marginTop: 8,
    },
    sectionHeaderText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1E293B',
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8, // Reduced from 10
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Platform.select({
            default: { elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 0, // No margin
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 8, // Reduced gap
        flex: 1,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 4,
        marginTop: 2,
    },
    shipmentIconBox: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#E0F2FE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    shipmentId: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2563EB',
        marginBottom: 0, // No margin
    },
    companyRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyName: {
        fontSize: 11, // Reduced from 12
        fontWeight: '700',
        color: '#1E293B',
    },
    productText: {
        fontSize: 10, // Reduced from 11
        color: '#64748B',
        fontWeight: '400',
    },
    separator: {
        color: '#CBD5E1',
        fontSize: 10,
    },
    statusBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2, // Compact badge
        borderRadius: 4,
        minWidth: 60,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
    },

    // Middle Info (Removed/Hidden)
    infoContainer: {
        // Removed padding/margin here as it's no longer used for the middle row
    },
    // infoRow, avatarMini, etc removed or unused

    // Details
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
        paddingTop: 4, // Minimal padding
        marginTop: 0, // No margin
        paddingLeft: 38,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 9, // Smaller Label
        color: '#94A3B8',
        marginBottom: 0,
    },
    detailValue: {
        fontSize: 10, // Smaller Value
        fontWeight: '600',
        color: '#334155',
    },

    cardAction: {
        position: 'absolute',
        right: 12,
        bottom: 12,
    },

    // User Menu
    userMenuPopup: {
        position: 'absolute',
        top: 60,
        right: 16,
        width: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        zIndex: 100,
        elevation: 10,
    },
    popupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    // Pagination
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 16,
    },
    pageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    pageButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginHorizontal: 4,
    },
    pageInfo: {
        fontSize: 12,
        fontWeight: '500',
        color: '#64748B',
    },
});

export default ShipmentsScreen;
