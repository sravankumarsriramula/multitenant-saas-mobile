import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const QuotationDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const quotationId = route.params?.id || '#QTN-2026-501';

    // Collapsible Sections State
    const [isItemsExpanded, setIsItemsExpanded] = useState(true);
    const [isTermsExpanded, setIsTermsExpanded] = useState(true);
    const [isRegulatoryExpanded, setIsRegulatoryExpanded] = useState(true);
    const [isAcceptExpanded, setIsAcceptExpanded] = useState(true);
    const [isOrdersExpanded, setIsOrdersExpanded] = useState(true);
    // Scroll & Tab State
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState('Items');
    const sectionPositions = useRef<{ [key: string]: number }>({});

    const scrollToSection = (section: string) => {
        setActiveTab(section);
        const y = sectionPositions.current[section];
        if (y !== undefined && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y, animated: true });
        }
    };

    const handleLayout = (section: string, event: any) => {
        sectionPositions.current[section] = event.nativeEvent.layout.y;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header - Single Line */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="file-document-outline" size={20} color="#F97316" />
                        <Text style={styles.headerTitle} numberOfLines={1}>{quotationId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>PASSED</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <Text style={styles.companyName} numberOfLines={1}>SKY SHORE</Text>
                        <Text style={styles.dateText} numberOfLines={1}>Jan 22</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.settingsIcon}>
                    <Ionicons name="settings-outline" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            {/* Tab Bar (Scrollable) */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Items' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Items')}
                    >
                        <MaterialCommunityIcons name="cube-outline" size={16} color={activeTab === 'Items' ? "#1E293B" : "#64748B"} />
                        <Text style={[styles.tabText, activeTab === 'Items' && { color: '#1E293B' }]}>Items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Terms' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Terms')}
                    >
                        <MaterialCommunityIcons name="file-document-edit-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Terms And Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Regulatory' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Regulatory')}
                    >
                        <MaterialCommunityIcons name="shield-check-outline" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>Regulatory Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Accept' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Accept')}
                    >
                        <MaterialCommunityIcons name="check-circle-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Accept Quotation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Orders' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Orders')}
                    >
                        <MaterialCommunityIcons name="cart-outline" size={16} color="#F97316" />
                        <Text style={[styles.tabText, { color: '#F97316' }]}>Orders</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.contentScroll}
                showsVerticalScrollIndicator={false}
            >

                {/* Items Grid Section */}
                <View
                    style={[styles.sectionCard, styles.itemsSectionCard]}
                    onLayout={(event) => handleLayout('Items', event)}
                >
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => setIsItemsExpanded(!isItemsExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#FFF7ED' }]}>
                                <MaterialCommunityIcons name="cube-outline" size={18} color="#F97316" />
                            </View>
                            <Text style={styles.sectionTitle}>Items</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                            <Ionicons name={isItemsExpanded ? "chevron-up" : "chevron-down"} size={18} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>

                    {isItemsExpanded && (
                        <View style={styles.itemsContent}>
                            {/* Search & Filter Toolbar */}
                            <View style={styles.itemsToolbar}>
                                <View style={styles.searchBar}>
                                    <Ionicons name="search" size={16} color="#94A3B8" />
                                    <TextInput
                                        placeholder="Search products..."
                                        style={styles.searchInput}
                                        placeholderTextColor="#94A3B8"
                                    />
                                </View>
                                <TouchableOpacity style={styles.filterButton}>
                                    <Ionicons name="filter-outline" size={16} color="#1E293B" />
                                    <Text style={styles.filterText}>Filter</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.actionButtonsRow}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <MaterialCommunityIcons name="tray-arrow-down" size={16} color="#1E293B" />
                                    <Text style={styles.actionBtnText}>Export</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <MaterialCommunityIcons name="view-column-outline" size={16} color="#1E293B" />
                                    <Text style={styles.actionBtnText}>Columns</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Horizontal Scrollable Grid */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.gridScroll}>
                                <View>
                                    {/* Table Header */}
                                    <View style={styles.gridHeader}>
                                        <Text style={[styles.gridHeaderCell, { width: 40 }]}>#</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 140 }]}>Product Name</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 220 }]}>Description</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80 }]}>HS Code</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 100 }]}>SKU</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'right' }]}>Quantity</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 60 }]}>UOM</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'right' }]}>Rate</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 100, textAlign: 'right' }]}>Amount</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'center' }]}>Actions</Text>
                                    </View>

                                    {/* Table Row 1 */}
                                    <View style={styles.gridRow}>
                                        <Text style={[styles.gridCell, { width: 40 }]}>1</Text>
                                        <View style={[styles.gridCell, { width: 140, flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
                                            <MaterialCommunityIcons name="cube-outline" size={14} color="#64748B" />
                                            <Text style={styles.gridCellTextBlue}>100% Cotton Fabric</Text>
                                        </View>
                                        <Text style={[styles.gridCell, { width: 220 }]} numberOfLines={1}>Premium Quality Cotton Fabric for Textile Industry</Text>
                                        <Text style={[styles.gridCell, { width: 80 }]}>52081190</Text>
                                        <Text style={[styles.gridCell, { width: 100 }]}>COT-FAB-001</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>1,000.000</Text>
                                        <Text style={[styles.gridCell, { width: 60 }]}>MTR</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>100.560</Text>
                                        <Text style={[styles.gridCellBold, { width: 100, textAlign: 'right' }]}>100,560.00</Text>
                                        <View style={[styles.gridCell, { width: 80, flexDirection: 'row', justifyContent: 'center', gap: 8 }]}>
                                            <MaterialCommunityIcons name="pencil-outline" size={16} color="#94A3B8" />
                                            <MaterialCommunityIcons name="delete-outline" size={16} color="#94A3B8" />
                                        </View>
                                    </View>

                                    {/* Table Row 2 */}
                                    <View style={styles.gridRow}>
                                        <Text style={[styles.gridCell, { width: 40 }]}>2</Text>
                                        <View style={[styles.gridCell, { width: 140, flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
                                            <MaterialCommunityIcons name="cube-outline" size={14} color="#64748B" />
                                            <Text style={styles.gridCellTextBlue}>Solid Aluminum Blocks</Text>
                                        </View>
                                        <Text style={[styles.gridCell, { width: 220 }]} numberOfLines={1}>Industrial Grade Aluminum Blocks</Text>
                                        <Text style={[styles.gridCell, { width: 80 }]}>76011000</Text>
                                        <Text style={[styles.gridCell, { width: 100 }]}>AL-BLK-001</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>500.000</Text>
                                        <Text style={[styles.gridCell, { width: 60 }]}>KG</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>250.000</Text>
                                        <Text style={[styles.gridCellBold, { width: 100, textAlign: 'right' }]}>125,000.00</Text>
                                        <View style={[styles.gridCell, { width: 80, flexDirection: 'row', justifyContent: 'center', gap: 8 }]}>
                                            <MaterialCommunityIcons name="pencil-outline" size={16} color="#94A3B8" />
                                            <MaterialCommunityIcons name="delete-outline" size={16} color="#94A3B8" />
                                        </View>
                                    </View>

                                    {/* Table Row 3 */}
                                    <View style={styles.gridRow}>
                                        <Text style={[styles.gridCell, { width: 40 }]}>3</Text>
                                        <View style={[styles.gridCell, { width: 140, flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
                                            <MaterialCommunityIcons name="cube-outline" size={14} color="#64748B" />
                                            <Text style={styles.gridCellTextBlue}>Copper Wire</Text>
                                        </View>
                                        <Text style={[styles.gridCell, { width: 220 }]} numberOfLines={1}>High Conductivity Copper Wire 2mm</Text>
                                        <Text style={[styles.gridCell, { width: 80 }]}>74081190</Text>
                                        <Text style={[styles.gridCell, { width: 100 }]}>CU-WIR-002</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>2,000.000</Text>
                                        <Text style={[styles.gridCell, { width: 60 }]}>MTR</Text>
                                        <Text style={[styles.gridCell, { width: 80, textAlign: 'right' }]}>15.500</Text>
                                        <Text style={[styles.gridCellBold, { width: 100, textAlign: 'right' }]}>31,000.00</Text>
                                        <View style={[styles.gridCell, { width: 80, flexDirection: 'row', justifyContent: 'center', gap: 8 }]}>
                                            <MaterialCommunityIcons name="pencil-outline" size={16} color="#94A3B8" />
                                            <MaterialCommunityIcons name="delete-outline" size={16} color="#94A3B8" />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            {/* Footer Terms & Total */}
                            <View style={styles.itemsFooter}>
                                <Text style={styles.footerTermsText}>
                                    Terms and Conditions, also known as Terms of Service or Terms of Use, are a legally binding agreement between a service provider and its users.
                                </Text>

                                <View style={styles.summaryBox}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Subtotal</Text>
                                        <Text style={styles.summaryValue}>USD 256,560.00</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Tax (0%)</Text>
                                        <Text style={styles.summaryValue}>USD 0.00</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Shipping</Text>
                                        <Text style={styles.summaryValue}>USD 0.00</Text>
                                    </View>
                                    <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                                        <Text style={styles.totalLabel}>Grand Total</Text>
                                        <Text style={styles.totalValue}>USD 256,560.00</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    )}
                </View>

                {/* Terms and Conditions Section */}
                <View
                    style={styles.sectionCard}
                    onLayout={(event) => handleLayout('Terms', event)}
                >
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => setIsTermsExpanded(!isTermsExpanded)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFDF5' }]}>
                                <MaterialCommunityIcons name="file-document-edit-outline" size={18} color="#10B981" />
                            </View>
                            <Text style={styles.sectionTitle}>Terms and Conditions</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                            <Ionicons name={isTermsExpanded ? "chevron-up" : "chevron-down"} size={18} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>

                    {isTermsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Payment Terms <Text style={styles.required}>*</Text></Text>
                                    <View style={styles.inputBox}>
                                        <Text style={styles.inputText}>40% Against Documents (CAD)</Text>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Incoterms <Text style={styles.required}>*</Text></Text>
                                    <View style={[styles.inputBox, styles.dropdown]}>
                                        <Text style={styles.inputText}>CIF</Text>
                                        <Ionicons name="chevron-down" size={16} color="#64748B" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Delivery Terms</Text>
                                    <View style={[styles.inputBox, styles.inputDisabled]}>
                                        <Text style={styles.placeholderText}>Enter Delivery Terms</Text>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Country of Origin of Goods</Text>
                                    <View style={[styles.inputBox, styles.inputDisabled]}>
                                        <Text style={styles.placeholderText}>Enter Country of Origin of Goods</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Regulatory Details Section */}
                <View
                    style={styles.sectionCard}
                    onLayout={(event) => handleLayout('Regulatory', event)}
                >
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => setIsRegulatoryExpanded(!isRegulatoryExpanded)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFEFF' }]}>
                                <MaterialCommunityIcons name="shield-check-outline" size={18} color="#06B6D4" />
                            </View>
                            <Text style={styles.sectionTitle}>Regulatory Details</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                            <Ionicons name={isRegulatoryExpanded ? "chevron-up" : "chevron-down"} size={18} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>

                    {isRegulatoryExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Signature</Text>
                                    <View style={[styles.inputBox, styles.dropdown]}>
                                        <Text style={styles.inputText}>Expedite</Text>
                                        <Ionicons name="chevron-down" size={16} color="#64748B" />
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Bank Details</Text>
                                    <View style={[styles.inputBox, styles.dropdown]}>
                                        <Text style={styles.inputText}>SBI Bank</Text>
                                        <Ionicons name="chevron-down" size={16} color="#64748B" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Accept Quotation Section */}
                <View
                    style={[styles.sectionCard, { borderColor: '#F1F5F9' }]}
                    onLayout={(event) => handleLayout('Accept', event)}
                >
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => setIsAcceptExpanded(!isAcceptExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFDF5' }]}>
                                <MaterialCommunityIcons name="check-circle-outline" size={18} color="#10B981" />
                            </View>
                            <Text style={styles.sectionTitle}>Accept Quotation</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                            <Ionicons name={isAcceptExpanded ? "chevron-up" : "chevron-down"} size={18} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>

                    {isAcceptExpanded && (
                        <View style={styles.sectionContentCentered}>
                            <Text style={styles.centeredText}>Click below to accept the Quotation.</Text>
                            <TouchableOpacity style={styles.acceptButton}>
                                <Text style={styles.acceptButtonText}>Accept Quotation</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Orders Section */}
                <View
                    style={styles.sectionCard}
                    onLayout={(event) => handleLayout('Orders', event)}
                >
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => setIsOrdersExpanded(!isOrdersExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#FFF7ED' }]}>
                                <MaterialCommunityIcons name="cart-outline" size={18} color="#F97316" />
                            </View>
                            <Text style={styles.sectionTitle}>Orders</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="add" size={20} color="#64748B" style={{ marginRight: 8 }} />
                            <Ionicons name={isOrdersExpanded ? "chevron-up" : "chevron-down"} size={18} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>

                    {isOrdersExpanded && (
                        <View style={styles.orderListContainer}>
                            {/* Header Row */}
                            <View style={styles.orderHeaderRow}>
                                <Text style={[styles.orderHeaderLabel, { flex: 2 }]}>ATTENTION</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 2 }]}>COUNTRY</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 3 }]}>AMOUNT</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 2, textAlign: 'right' }]}>STATUS</Text>
                            </View>
                            {/* Order Item */}
                            <View style={styles.orderItem}>
                                <View style={[styles.avatarBox, { marginRight: 8 }]}>
                                    <Text style={styles.avatarText}>SS</Text>
                                </View>
                                <Text style={[styles.orderText, { flex: 2 }]}>Kenya</Text>
                                <Text style={[styles.orderTextBold, { flex: 3 }]}>USD 100,560.00</Text>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <View style={styles.shipmentBadge}>
                                        <Text style={styles.shipmentBadgeText}>Shipment</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

            </ScrollView>
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
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: { marginRight: 16 },
    headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
    statusBadge: { backgroundColor: '#06B6D4', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    statusText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },

    // Sub-Header Styles (Cleaned up)
    companyName: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginLeft: 8 },
    dateText: { fontSize: 13, color: '#64748B', marginLeft: 8 },
    settingsIcon: { padding: 4, marginLeft: 8 },
    verticalDivider: {
        width: 1,
        height: 16,
        backgroundColor: '#CBD5E1',
        marginHorizontal: 8,
    },

    // Tabs
    tabContainer: { backgroundColor: '#FFFFFF', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    tabScrollContent: { paddingHorizontal: 16, gap: 12 },
    tabItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
    tabItemActive: { backgroundColor: '#F1F5F9', borderColor: '#CBD5E1' }, // Items is active
    tabText: { fontSize: 12, fontWeight: '600', color: '#64748B' },

    // Content
    contentScroll: { padding: 16 },

    // Items Section
    itemsSectionCard: { padding: 0 },
    itemsContent: { padding: 12 },
    itemsToolbar: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, paddingHorizontal: 8, height: 36 },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 13, color: '#1E293B', paddingVertical: 0 },
    filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, paddingHorizontal: 12, height: 36, gap: 6 },
    filterText: { fontSize: 13, fontWeight: '600', color: '#1E293B' },

    actionButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginBottom: 12 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 6, gap: 6 },
    actionBtnText: { fontSize: 12, fontWeight: '600', color: '#1E293B' },

    // Grid Scroll
    gridScroll: { marginBottom: 16 },
    gridHeader: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    gridHeaderCell: { fontSize: 11, fontWeight: '700', color: '#475569', paddingHorizontal: 8 },
    gridRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    gridCell: { fontSize: 12, color: '#334155', paddingHorizontal: 8 },
    gridCellBold: { fontSize: 12, fontWeight: '700', color: '#1E293B', paddingHorizontal: 8 },
    gridCellTextBlue: { fontSize: 12, fontWeight: '500', color: '#2563EB' },

    // Footer
    itemsFooter: { marginTop: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 16 },
    footerTermsText: { fontSize: 11, color: '#64748B', marginBottom: 16, lineHeight: 16 },
    summaryBox: {},
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    summaryTotalRow: { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12, marginTop: 4, marginBottom: 0 },
    summaryLabel: { fontSize: 13, color: '#64748B' },
    summaryValue: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
    totalLabel: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
    totalValue: { fontSize: 16, fontWeight: '800', color: '#2563EB' },

    // Section Cards
    sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sectionIconBox: { width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
    sectionHeaderRight: { flexDirection: 'row', alignItems: 'center' },
    sectionContent: { padding: 16 },

    // Forms
    formGrid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    formGroup: { flex: 1 },
    label: { fontSize: 12, fontWeight: '500', color: '#64748B', marginBottom: 6 },
    required: { color: '#EF4444' },
    inputBox: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10 },
    inputDisabled: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputText: { fontSize: 13, color: '#1E293B' },
    placeholderText: { fontSize: 13, color: '#94A3B8' },

    // Centered Content (Accept Quote)
    sectionContentCentered: { padding: 24, alignItems: 'center', justifyContent: 'center' },
    centeredText: { fontSize: 14, color: '#64748B', marginBottom: 16 },
    acceptButton: { backgroundColor: '#1E293B', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 6 },
    acceptButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

    // Orders Grid
    orderListContainer: { padding: 0 },
    orderHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    orderHeaderLabel: { fontSize: 10, fontWeight: '700', color: '#64748B' },
    orderItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    avatarBox: { width: 24, height: 24, borderRadius: 4, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
    avatarText: { fontSize: 10, fontWeight: '600', color: '#64748B' },
    orderText: { fontSize: 12, color: '#1E293B' },
    orderTextBold: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
    shipmentBadge: { backgroundColor: '#06B6D4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    shipmentBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' }
});

export default QuotationDetailsScreen;
