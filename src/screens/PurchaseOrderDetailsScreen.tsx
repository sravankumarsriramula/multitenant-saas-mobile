import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';

const PurchaseOrderDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
    const poId = route.params?.id || '#PO-2026-301';

    const [isItemsExpanded, setIsItemsExpanded] = useState(true);
    const [isVendorExpanded, setIsVendorExpanded] = useState(true);
    const [isDeliveryExpanded, setIsDeliveryExpanded] = useState(true);
    const [isTermsExpanded, setIsTermsExpanded] = useState(true);

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
            <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="file-sign" size={20} color="#8B5CF6" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{poId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>ORDERED</Text>
                        </View>
                        <View style={[styles.verticalDivider, { backgroundColor: theme.borderDark }]} />
                        <Text style={[styles.companyName, { color: theme.text }]} numberOfLines={1}>STEEL WORKS</Text>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]} numberOfLines={1}>Jan 22</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.settingsIcon}>
                    <Ionicons name="settings-outline" size={20} color={theme.textTertiary} />
                </TouchableOpacity>
            </View>

            <View style={[styles.tabContainer, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Items' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Items')}
                    >
                        <MaterialCommunityIcons name="cube-outline" size={16} color={activeTab === 'Items' ? theme.text : theme.textSecondary} />
                        <Text style={[styles.tabText, { color: activeTab === 'Items' ? theme.text : theme.textSecondary }]}>Items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Vendor' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Vendor')}
                    >
                        <MaterialCommunityIcons name="store-outline" size={16} color="#F59E0B" />
                        <Text style={[styles.tabText, { color: '#F59E0B' }]}>Vendor Info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Delivery' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Delivery')}
                    >
                        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Terms' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Terms')}
                    >
                        <MaterialCommunityIcons name="file-document-outline" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>Terms</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* PO Summary Card */}
                <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.textTertiary }]}>PO Date:</Text>
                        <Text style={[styles.summaryValue, { color: theme.text }]}>Jan 22, 2026</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.textTertiary }]}>Expected Delivery:</Text>
                        <Text style={[styles.summaryValue, { color: theme.text }]}>Feb 15, 2026</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.textTertiary }]}>Total Amount:</Text>
                        <Text style={[styles.summaryValue, { color: theme.primaryLight, fontWeight: '700', fontSize: 16 }]}>USD 55,000.00</Text>
                    </View>
                </View>

                {/* Items Section */}
                <View onLayout={(e) => handleLayout('Items', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsItemsExpanded(!isItemsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="cube-outline" size={18} color={theme.primaryLight} />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Order Items</Text>
                        </View>
                        <Ionicons name={isItemsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isItemsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={[styles.tableContainer, { borderColor: theme.border }]}>
                                <View style={[styles.tableHeader, { backgroundColor: theme.inputBackground }]}>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 2 }]}>Item Description</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'center' }]}>Quantity</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Unit Price</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Total</Text>
                                </View>

                                {[
                                    { item: 'Raw Steel Sheets', qty: '50 Tons', price: '$1,000', total: '$50,000' },
                                    { item: 'Steel Rods', qty: '100 Units', price: '$40', total: '$4,000' },
                                    { item: 'Fasteners Pack', qty: '20 Boxes', price: '$50', total: '$1,000' },
                                ].map((row, index) => (
                                    <View key={index} style={[styles.tableRow, { borderTopColor: theme.borderLight }]}>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 2 }]}>{row.item}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'center' }]}>{row.qty}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'right' }]}>{row.price}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 1, textAlign: 'right', fontWeight: '600' }]}>{row.total}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={[styles.totalContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                <View style={styles.totalRow}>
                                    <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Subtotal:</Text>
                                    <Text style={[styles.totalValue, { color: theme.text }]}>$55,000.00</Text>
                                </View>
                                <View style={styles.totalRow}>
                                    <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Shipping:</Text>
                                    <Text style={[styles.totalValue, { color: theme.text }]}>Included</Text>
                                </View>
                                <View style={[styles.totalRow, { borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8, marginTop: 8 }]}>
                                    <Text style={[styles.totalLabel, { color: theme.text, fontWeight: '700', fontSize: 16 }]}>Grand Total:</Text>
                                    <Text style={[styles.totalValue, { color: theme.primaryLight, fontWeight: '700', fontSize: 18 }]}>$55,000.00</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Vendor Info */}
                <View onLayout={(e) => handleLayout('Vendor', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsVendorExpanded(!isVendorExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="store-outline" size={18} color="#F59E0B" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Vendor Information</Text>
                        </View>
                        <Ionicons name={isVendorExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isVendorExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Vendor Name:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>STEEL WORKS LTD</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Contact Person:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Mike Ross</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Email:</Text>
                                <Text style={[styles.infoValue, { color: theme.primaryLight }]}>mike@steelworks.com</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Phone:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>+1 (555) 123-4567</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Address:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>456 Industrial Ave{'\n'}Pittsburgh, PA 15222</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Tax ID:</Text>
                                <Text style={[styles.infoValue, { color: theme.textSecondary }]}>TAX-987654</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Delivery Info */}
                <View onLayout={(e) => handleLayout('Delivery', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsDeliveryExpanded(!isDeliveryExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color="#10B981" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Delivery Information</Text>
                        </View>
                        <Ionicons name={isDeliveryExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isDeliveryExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Delivery Address:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>789 Factory Rd{'\n'}Detroit, MI 48201{'\n'}United States</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Expected Date:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Feb 15, 2026</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Shipping Method:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Freight Truck</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Delivery Instructions:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Deliver to Warehouse B, Loading Dock 3</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Terms & Conditions */}
                <View onLayout={(e) => handleLayout('Terms', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsTermsExpanded(!isTermsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="file-document-outline" size={18} color="#06B6D4" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Terms & Conditions</Text>
                        </View>
                        <Ionicons name={isTermsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isTermsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Terms:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Net 30 Days</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Warranty:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>12 Months</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Return Policy:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>30 Days with Receipt</Text>
                            </View>
                            <View style={[styles.termsBox, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                <Text style={[styles.termsText, { color: theme.textSecondary }]}>
                                    • All items must be inspected upon delivery{'\n'}
                                    • Any damages must be reported within 48 hours{'\n'}
                                    • Payment due within 30 days of invoice date{'\n'}
                                    • Late payments subject to 1.5% monthly interest{'\n'}
                                    • Vendor reserves right to modify delivery schedule
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.error + '20', borderColor: theme.error }]}>
                    <Text style={[styles.footerButtonText, { color: theme.error }]}>Cancel PO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryLight }]}>
                    <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>Approve & Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: Platform.OS === 'android' ? 40 : 12, paddingBottom: 12, borderBottomWidth: 1 },
    backButton: { marginRight: 8 },
    headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitle: { fontSize: 16, fontWeight: '700' },
    statusBadge: { backgroundColor: '#3B82F620', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 10, fontWeight: '600', color: '#3B82F6' },
    verticalDivider: { width: 1, height: 16, marginHorizontal: 4 },
    companyName: { fontSize: 13, fontWeight: '600' },
    dateText: { fontSize: 12 },
    settingsIcon: { marginLeft: 8 },

    tabContainer: { borderBottomWidth: 1, paddingVertical: 8 },
    tabScrollContent: { paddingHorizontal: 12, gap: 8 },
    tabItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
    tabText: { fontSize: 12, fontWeight: '600' },

    scrollView: { flex: 1 },
    summaryCard: { marginHorizontal: 12, marginTop: 12, padding: 12, borderRadius: 8, borderWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    summaryLabel: { fontSize: 13 },
    summaryValue: { fontSize: 13, fontWeight: '600' },

    section: { marginHorizontal: 12, marginTop: 12, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sectionTitle: { fontSize: 15, fontWeight: '700' },
    sectionContent: { paddingHorizontal: 12, paddingBottom: 12 },

    tableContainer: { borderWidth: 1, borderRadius: 6, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', padding: 10 },
    tableHeaderText: { fontSize: 12, fontWeight: '700' },
    tableRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1 },
    tableCellText: { fontSize: 12 },

    totalContainer: { marginTop: 12, padding: 12, borderRadius: 6, borderWidth: 1 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    totalLabel: { fontSize: 14 },
    totalValue: { fontSize: 14, fontWeight: '600' },

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' },
    infoLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, flex: 1.5, textAlign: 'right' },

    termsBox: { marginTop: 8, padding: 12, borderRadius: 6, borderWidth: 1 },
    termsText: { fontSize: 12, lineHeight: 20 },

    footer: { flexDirection: 'row', padding: 12, gap: 12, borderTopWidth: 1 },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
    footerButtonText: { fontSize: 14, fontWeight: '600' },
});

export default PurchaseOrderDetailsScreen;
