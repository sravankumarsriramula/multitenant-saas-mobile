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
    const [menuVisible, setMenuVisible] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const sections = groupData(MOCK_DATA);

    const renderItem = ({ item }: { item: Shipment }) => {
        const { bg, text } = getStatusColor(item.status);
        return (
            <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                {/* Top Row: Check/Icon + ID + Status */}
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.checkbox}>
                            {/* Unchecked state for demo */}
                        </TouchableOpacity>
                        <View style={styles.shipmentIconBox}>
                            <MaterialCommunityIcons name="ferry" size={18} color="#0EA5E9" />
                        </View>
                        <View>
                            <Text style={styles.shipmentId}>{item.id}</Text>
                            <Text style={styles.productText}>{item.product}</Text>
                        </View>
                    </View>

                    {/* Status Badge (Desktop right side, Mobile top right) */}
                    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                        <Text style={[styles.statusText, { color: text }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Middle Info Block */}
                <View style={styles.infoContainer}>
                    {/* Receiver */}
                    <View style={styles.infoRow}>
                        <View style={styles.avatarMini}>
                            <Text style={styles.avatarMiniText}>{item.receiver}</Text>
                        </View>
                        <Text style={styles.infoTextMain}>{item.receiverCompany}</Text>
                    </View>

                    {/* Country & Agent */}
                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Country</Text>
                            <Text style={styles.detailValue}>{item.country}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Agent</Text>
                            <Text style={styles.detailValue}>{item.agent}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Est. Value</Text>
                            <Text style={styles.detailValue}>{item.value}</Text>
                        </View>
                    </View>
                </View>

                {/* Chevron for mobile affordance */}
                <View style={styles.cardAction}>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#CBD5E1" />
                </View>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.paginationContainer}>
            <TouchableOpacity style={styles.pageButton}>
                <MaterialCommunityIcons name="chevron-left" size={20} color="#64748B" />
                <Text style={styles.pageButtonText}>Prev</Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>Page 1 of 5</Text>
            <TouchableOpacity style={styles.pageButton}>
                <Text style={styles.pageButtonText}>Next</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header: Title + User */}
            {/* Header: Title + User + Actions */}
            <View style={styles.header}>
                {!isSearchExpanded ? (
                    <>
                        <View style={styles.headerLeftContainer}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                                <Ionicons name="menu" size={24} color="#334155" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Shipments</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => setIsSearchExpanded(true)} style={styles.iconButton}>
                                <Ionicons name="search" size={20} color="#64748B" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.createButtonIconSmall}>
                                <Ionicons name="add" size={20} color="#FFFFFF" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => setIsFilterExpanded(!isFilterExpanded)}
                            >
                                <Ionicons name={isFilterExpanded ? "filter" : "filter-outline"} size={20} color="#64748B" />
                            </TouchableOpacity>

                            {/* User Avatar */}
                            <TouchableOpacity
                                style={styles.headerAvatar}
                                onPress={() => setMenuVisible(!menuVisible)}
                            >
                                <Text style={styles.avatarInitial}>{user?.name?.[0] || 'U'}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.searchBarHeader}>
                        <Ionicons name="search" size={20} color="#94A3B8" />
                        <TextInput
                            placeholder="Search by Shipment Number"
                            style={styles.searchInputHeader}
                            placeholderTextColor="#94A3B8"
                            autoFocus={true}
                        />
                        <TouchableOpacity onPress={() => setIsSearchExpanded(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Filter Section (Collapsible) */}
            {isFilterExpanded && (
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterDropdown}>
                        <Text style={styles.filterDropdownText}>Select Shipment Date</Text>
                        <Ionicons name="calendar-outline" size={18} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterDropdown}>
                        <Text style={styles.filterDropdownText}>Select Method</Text>
                        <Ionicons name="chevron-down" size={18} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterDropdown}>
                        <Text style={styles.filterDropdownText}>Select Status</Text>
                        <Ionicons name="chevron-down" size={18} color="#64748B" />
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
                <View style={styles.userMenuPopup}>
                    <TouchableOpacity style={styles.popupItem} onPress={() => { setMenuVisible(false); logout(); }}>
                        <Ionicons name="log-out-outline" size={16} color="#EF4444" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#EF4444', fontSize: 13 }}>Logout</Text>
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
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
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
        color: '#0F172A',
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
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        color: '#FFF',
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
        backgroundColor: '#1E293B',
        width: 32,
        height: 32, // Smaller than before
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Header Search
    searchBarHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
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
        color: '#2563EB',
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
        padding: 12,
        marginBottom: 12,
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
        marginBottom: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 10,
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
    shipmentId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
        marginBottom: 2,
    },
    productText: {
        fontSize: 11,
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        minWidth: 70,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
    },

    // Middle Info
    infoContainer: {
        marginTop: 4,
        paddingLeft: 36, // Create alignment with ID text
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8
    },
    avatarMini: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarMiniText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#475569',
    },
    infoTextMain: {
        fontSize: 13,
        color: '#334155',
        fontWeight: '500',
    },

    // Details
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
        paddingTop: 12,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        color: '#94A3B8',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 11,
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
