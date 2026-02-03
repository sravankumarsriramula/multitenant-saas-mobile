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
import { useThemeStore } from '../store/themeStore';

const QuotationDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header - Single Line */}
            <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                <TouchableOpacity onPress={() => navigation.navigate('Quotations')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="file-document-outline" size={20} color="#F97316" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{quotationId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>PASSED</Text>
                        </View>
                        <View style={[styles.verticalDivider, { backgroundColor: theme.borderDark }]} />
                        <Text style={[styles.companyName, { color: theme.text }]} numberOfLines={1}>SKY SHORE</Text>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]} numberOfLines={1}>Jan 22</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.settingsIcon}>
                    <Ionicons name="settings-outline" size={20} color={theme.textTertiary} />
                </TouchableOpacity>
            </View>

            {/* Tab Bar (Scrollable) */}
            {/* Tab Bar (Scrollable) */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Items' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Items')}
                    >
                        <MaterialCommunityIcons name="cube-outline" size={16} color={activeTab === 'Items' ? '#2563EB' : '#64748B'} />
                        <Text style={[styles.tabText, activeTab === 'Items' && styles.tabTextActive]}>Items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Terms' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Terms')}
                    >
                        <MaterialCommunityIcons name="file-document-edit-outline" size={16} color={activeTab === 'Terms' ? '#2563EB' : '#64748B'} />
                        <Text style={[styles.tabText, activeTab === 'Terms' && styles.tabTextActive]}>Terms And Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Regulatory' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Regulatory')}
                    >
                        <MaterialCommunityIcons name="shield-check-outline" size={16} color={activeTab === 'Regulatory' ? '#2563EB' : '#64748B'} />
                        <Text style={[styles.tabText, activeTab === 'Regulatory' && styles.tabTextActive]}>Regulatory Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Accept' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Accept')}
                    >
                        <MaterialCommunityIcons name="check-circle-outline" size={16} color={activeTab === 'Accept' ? '#2563EB' : '#64748B'} />
                        <Text style={[styles.tabText, activeTab === 'Accept' && styles.tabTextActive]}>Accept Quotation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'Orders' && styles.tabItemActive]}
                        onPress={() => scrollToSection('Orders')}
                    >
                        <MaterialCommunityIcons name="cart-outline" size={16} color={activeTab === 'Orders' ? '#2563EB' : '#64748B'} />
                        <Text style={[styles.tabText, activeTab === 'Orders' && styles.tabTextActive]}>Orders</Text>
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
                    style={[styles.sectionCard, styles.itemsSectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    onLayout={(event) => handleLayout('Items', event)}
                >
                    <TouchableOpacity
                        style={[styles.sectionHeader, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}
                        onPress={() => setIsItemsExpanded(!isItemsExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#FFF7ED' }]}>
                                <MaterialCommunityIcons name="cube-outline" size={18} color="#F97316" />
                            </View>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Items</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color={theme.textTertiary} style={{ marginRight: 8 }} />
                            <Ionicons name={isItemsExpanded ? "chevron-up" : "chevron-down"} size={18} color={theme.textTertiary} />
                        </View>
                    </TouchableOpacity>

                    {isItemsExpanded && (
                        <View style={styles.itemsContent}>
                            {/* Search & Filter Toolbar */}
                            <View style={styles.itemsToolbar}>
                                <View style={[styles.searchBar, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                    <Ionicons name="search" size={16} color={theme.textTertiary} />
                                    <TextInput
                                        placeholder="Search products..."
                                        style={[styles.searchInput, { color: theme.text }]}
                                        placeholderTextColor={theme.textTertiary}
                                    />
                                </View>
                                <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                    <Ionicons name="filter-outline" size={16} color={theme.text} />
                                    <Text style={[styles.filterText, { color: theme.text }]}>Filter</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.actionButtonsRow}>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                    <MaterialCommunityIcons name="tray-arrow-down" size={16} color={theme.text} />
                                    <Text style={[styles.actionBtnText, { color: theme.text }]}>Export</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                    <MaterialCommunityIcons name="view-column-outline" size={16} color={theme.text} />
                                    <Text style={[styles.actionBtnText, { color: theme.text }]}>Columns</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Horizontal Scrollable Grid */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.gridScroll}>
                                <View>
                                    {/* Table Header */}
                                    <View style={[styles.gridHeader, { backgroundColor: theme.backgroundTertiary, borderBottomColor: theme.border }]}>
                                        <Text style={[styles.gridHeaderCell, { width: 40, color: theme.textSecondary }]}>#</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 140, color: theme.textSecondary }]}>Product Name</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 220, color: theme.textSecondary }]}>Description</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, color: theme.textSecondary }]}>HS Code</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 100, color: theme.textSecondary }]}>SKU</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'right', color: theme.textSecondary }]}>Quantity</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 60, color: theme.textSecondary }]}>UOM</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'right', color: theme.textSecondary }]}>Rate</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 100, textAlign: 'right', color: theme.textSecondary }]}>Amount</Text>
                                        <Text style={[styles.gridHeaderCell, { width: 80, textAlign: 'center', color: theme.textSecondary }]}>Actions</Text>
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
                            <View style={[styles.itemsFooter, { borderTopColor: theme.border }]}>
                                <Text style={[styles.footerTermsText, { color: theme.textSecondary }]}>
                                    Terms and Conditions, also known as Terms of Service or Terms of Use, are a legally binding agreement between a service provider and its users.
                                </Text>

                                <View style={styles.summaryBox}>
                                    <View style={styles.summaryRow}>
                                        <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Subtotal</Text>
                                        <Text style={[styles.summaryValue, { color: theme.text }]}>USD 256,560.00</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Tax (0%)</Text>
                                        <Text style={[styles.summaryValue, { color: theme.text }]}>USD 0.00</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Shipping</Text>
                                        <Text style={[styles.summaryValue, { color: theme.text }]}>USD 0.00</Text>
                                    </View>
                                    <View style={[styles.summaryRow, styles.summaryTotalRow, { borderTopColor: theme.borderLight }]}>
                                        <Text style={[styles.totalLabel, { color: theme.text }]}>Grand Total</Text>
                                        <Text style={[styles.totalValue, { color: theme.primaryLight }]}>USD 256,560.00</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    )}
                </View>

                {/* Terms and Conditions Section */}
                <View
                    style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    onLayout={(event) => handleLayout('Terms', event)}
                >
                    <TouchableOpacity
                        style={[styles.sectionHeader, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}
                        onPress={() => setIsTermsExpanded(!isTermsExpanded)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFDF5' }]}>
                                <MaterialCommunityIcons name="file-document-edit-outline" size={18} color="#10B981" />
                            </View>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Terms and Conditions</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color={theme.textTertiary} style={{ marginRight: 8 }} />
                            <Ionicons name={isTermsExpanded ? "chevron-up" : "chevron-down"} size={18} color={theme.textTertiary} />
                        </View>
                    </TouchableOpacity>

                    {isTermsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Payment Terms <Text style={styles.required}>*</Text></Text>
                                    <View style={[styles.inputBox, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                        <Text style={[styles.inputText, { color: theme.text }]}>40% Against Documents (CAD)</Text>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Incoterms <Text style={styles.required}>*</Text></Text>
                                    <View style={[styles.inputBox, styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                        <Text style={[styles.inputText, { color: theme.text }]}>CIF</Text>
                                        <Ionicons name="chevron-down" size={16} color={theme.textSecondary} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Delivery Terms</Text>
                                    <View style={[styles.inputBox, styles.inputDisabled, { backgroundColor: theme.backgroundTertiary, borderColor: theme.border }]}>
                                        <Text style={[styles.placeholderText, { color: theme.textTertiary }]}>Enter Delivery Terms</Text>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Country of Origin of Goods</Text>
                                    <View style={[styles.inputBox, styles.inputDisabled, { backgroundColor: theme.backgroundTertiary, borderColor: theme.border }]}>
                                        <Text style={[styles.placeholderText, { color: theme.textTertiary }]}>Enter Country of Origin of Goods</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Regulatory Details Section */}
                <View
                    style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    onLayout={(event) => handleLayout('Regulatory', event)}
                >
                    <TouchableOpacity
                        style={[styles.sectionHeader, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}
                        onPress={() => setIsRegulatoryExpanded(!isRegulatoryExpanded)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFEFF' }]}>
                                <MaterialCommunityIcons name="shield-check-outline" size={18} color="#06B6D4" />
                            </View>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Regulatory Details</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color={theme.textTertiary} style={{ marginRight: 8 }} />
                            <Ionicons name={isRegulatoryExpanded ? "chevron-up" : "chevron-down"} size={18} color={theme.textTertiary} />
                        </View>
                    </TouchableOpacity>

                    {isRegulatoryExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.formGrid}>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Signature</Text>
                                    <View style={[styles.inputBox, styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                        <Text style={[styles.inputText, { color: theme.text }]}>Expedite</Text>
                                        <Ionicons name="chevron-down" size={16} color={theme.textSecondary} />
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Bank Details</Text>
                                    <View style={[styles.inputBox, styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                                        <Text style={[styles.inputText, { color: theme.text }]}>SBI Bank</Text>
                                        <Ionicons name="chevron-down" size={16} color={theme.textSecondary} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Accept Quotation Section */}
                <View
                    style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    onLayout={(event) => handleLayout('Accept', event)}
                >
                    <TouchableOpacity
                        style={[styles.sectionHeader, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}
                        onPress={() => setIsAcceptExpanded(!isAcceptExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#ECFDF5' }]}>
                                <MaterialCommunityIcons name="check-circle-outline" size={18} color="#10B981" />
                            </View>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Accept Quotation</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="time-outline" size={18} color={theme.textTertiary} style={{ marginRight: 8 }} />
                            <Ionicons name={isAcceptExpanded ? "chevron-up" : "chevron-down"} size={18} color={theme.textTertiary} />
                        </View>
                    </TouchableOpacity>

                    {isAcceptExpanded && (
                        <View style={styles.sectionContentCentered}>
                            <Text style={[styles.centeredText, { color: theme.textSecondary }]}>Click below to accept the Quotation.</Text>
                            <TouchableOpacity style={[styles.acceptButton, { backgroundColor: theme.primary }]}>
                                <Text style={styles.acceptButtonText}>Accept Quotation</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Orders Section */}
                <View
                    style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    onLayout={(event) => handleLayout('Orders', event)}
                >
                    <TouchableOpacity
                        style={[styles.sectionHeader, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}
                        onPress={() => setIsOrdersExpanded(!isOrdersExpanded)}
                    >
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIconBox, { backgroundColor: '#FFF7ED' }]}>
                                <MaterialCommunityIcons name="cart-outline" size={18} color="#F97316" />
                            </View>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Orders</Text>
                        </View>
                        <View style={styles.sectionHeaderRight}>
                            <Ionicons name="add" size={20} color={theme.textSecondary} style={{ marginRight: 8 }} />
                            <Ionicons name={isOrdersExpanded ? "chevron-up" : "chevron-down"} size={18} color={theme.textTertiary} />
                        </View>
                    </TouchableOpacity>

                    {isOrdersExpanded && (
                        <View style={styles.orderListContainer}>
                            {/* Header Row */}
                            <View style={[styles.orderHeaderRow, { backgroundColor: theme.backgroundTertiary, borderBottomColor: theme.border }]}>
                                <Text style={[styles.orderHeaderLabel, { flex: 2, color: theme.textSecondary }]}>ATTENTION</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 2, color: theme.textSecondary }]}>COUNTRY</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 3, color: theme.textSecondary }]}>AMOUNT</Text>
                                <Text style={[styles.orderHeaderLabel, { flex: 2, textAlign: 'right', color: theme.textSecondary }]}>STATUS</Text>
                            </View>
                            {/* Order Item */}
                            <View style={[styles.orderItem, { borderBottomColor: theme.borderLight }]}>
                                <View style={[styles.avatarBox, { marginRight: 8, backgroundColor: theme.borderLight, borderColor: theme.border }]}>
                                    <Text style={[styles.avatarText, { color: theme.textSecondary }]}>SS</Text>
                                </View>
                                <Text style={[styles.orderText, { flex: 2, color: theme.text }]}>Kenya</Text>
                                <Text style={[styles.orderTextBold, { flex: 3, color: theme.text }]}>USD 100,560.00</Text>
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
        backgroundColor: '#F1F5F9', // Light slate background
    },
    // Premium Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    backButton: { marginRight: 12 },
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    statusBadge: {
        backgroundColor: '#06B6D4',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    verticalDivider: {
        width: 1,
        height: 14,
        backgroundColor: '#CBD5E1',
        marginHorizontal: 6,
    },
    companyName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#334155'
    },
    dateText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500'
    },
    settingsIcon: { padding: 4, marginLeft: 12 },

    // Modern Tabs
    tabContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tabScrollContent: {
        paddingHorizontal: 16,
        gap: 10
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20, // Pill shape
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 6
    },
    tabItemActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE'
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B'
    },
    tabTextActive: {
        color: '#2563EB'
    },

    // Content
    contentScroll: { padding: 12 }, // Tighter padding

    // Section Cards
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC'
    },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    sectionIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B'
    },
    sectionHeaderRight: { flexDirection: 'row', alignItems: 'center' },
    sectionContent: { padding: 12 }, // Compact padding

    // Forms
    formGrid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    formGroup: { flex: 1 },
    label: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    required: { color: '#EF4444' },
    inputBox: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    inputDisabled: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0'
    },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputText: { fontSize: 13, color: '#1E293B', fontWeight: '500' },
    placeholderText: { fontSize: 13, color: '#94A3B8' },

    // Centered Content (Accept Quote)
    sectionContentCentered: { padding: 20, alignItems: 'center', justifyContent: 'center' },
    centeredText: { fontSize: 13, color: '#64748B', marginBottom: 16, textAlign: 'center' },
    acceptButton: {
        backgroundColor: '#0F172A',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#0F172A',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    acceptButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

    // Items Specific
    itemsSectionCard: { padding: 0 },
    itemsContent: { padding: 12 },
    itemsToolbar: { flexDirection: 'row', gap: 10, marginBottom: 12 },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 13, color: '#1E293B' },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        gap: 6
    },
    filterText: { fontSize: 13, fontWeight: '600', color: '#1E293B' },

    actionButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginBottom: 12 },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        gap: 6
    },
    actionBtnText: { fontSize: 12, fontWeight: '600', color: '#475569' },

    // Grid Scroll
    gridScroll: { marginBottom: 16, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
    gridHeader: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0'
    },
    gridHeaderCell: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        paddingHorizontal: 8,
        textTransform: 'uppercase',
    },
    gridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
        backgroundColor: '#FFFFFF'
    },
    gridCell: { fontSize: 12, color: '#334155', paddingHorizontal: 8, fontWeight: '500' },
    gridCellBold: { fontSize: 12, fontWeight: '700', color: '#0F172A', paddingHorizontal: 8 },
    gridCellTextBlue: { fontSize: 12, fontWeight: '600', color: '#2563EB' },

    // Footer
    itemsFooter: { marginTop: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 16 },
    footerTermsText: { fontSize: 11, color: '#94A3B8', marginBottom: 16, lineHeight: 16 },
    summaryBox: {},
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    summaryTotalRow: { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 4, marginBottom: 0 },
    summaryLabel: { fontSize: 13, color: '#64748B', fontWeight: '500' },
    summaryValue: { fontSize: 13, fontWeight: '600', color: '#334155' },
    totalLabel: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
    totalValue: { fontSize: 16, fontWeight: '800', color: '#2563EB' },

    // Orders Grid
    orderListContainer: { padding: 0 },
    orderHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0'
    },
    orderHeaderLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC'
    },
    avatarBox: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    avatarText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
    orderText: { fontSize: 12, color: '#334155', fontWeight: '500' },
    orderTextBold: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
    shipmentBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    shipmentBadgeText: { color: '#0284C7', fontSize: 10, fontWeight: '700' }
});

export default QuotationDetailsScreen;
