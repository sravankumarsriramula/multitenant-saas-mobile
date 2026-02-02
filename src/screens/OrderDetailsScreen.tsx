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

const OrderDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
    const orderId = route.params?.id || '#ORD-2026-101';

    // Collapsible Sections State
    const [isItemsExpanded, setIsItemsExpanded] = useState(true);
    const [isShippingExpanded, setIsShippingExpanded] = useState(true);
    const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
    const [isTrackingExpanded, setIsTrackingExpanded] = useState(true);

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
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="clipboard-list" size={20} color="#3B82F6" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{orderId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>CONFIRMED</Text>
                        </View>
                        <View style={[styles.verticalDivider, { backgroundColor: theme.borderDark }]} />
                        <Text style={[styles.companyName, { color: theme.text }]} numberOfLines={1}>ACME CORP</Text>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]} numberOfLines={1}>Jan 25</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.settingsIcon}>
                    <Ionicons name="settings-outline" size={20} color={theme.textTertiary} />
                </TouchableOpacity>
            </View>

            {/* Tab Bar */}
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
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Shipping' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Shipping')}
                    >
                        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Shipping Info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Payment' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Payment')}
                    >
                        <MaterialCommunityIcons name="credit-card-outline" size={16} color="#F59E0B" />
                        <Text style={[styles.tabText, { color: '#F59E0B' }]}>Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Tracking' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Tracking')}
                    >
                        <MaterialCommunityIcons name="map-marker-path" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>Tracking</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Scrollable Content */}
            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                                {/* Table Header */}
                                <View style={[styles.tableHeader, { backgroundColor: theme.inputBackground }]}>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 2 }]}>Product</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'center' }]}>Qty</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Price</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Total</Text>
                                </View>

                                {/* Table Rows */}
                                {[
                                    { product: 'Laptop Pro 15"', qty: '2', price: '$1,200', total: '$2,400' },
                                    { product: 'Wireless Mouse', qty: '5', price: '$25', total: '$125' },
                                    { product: 'USB-C Cable', qty: '10', price: '$15', total: '$150' },
                                ].map((item, index) => (
                                    <View key={index} style={[styles.tableRow, { borderTopColor: theme.borderLight }]}>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 2 }]}>{item.product}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'center' }]}>{item.qty}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'right' }]}>{item.price}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 1, textAlign: 'right', fontWeight: '600' }]}>{item.total}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Summary */}
                            <View style={[styles.summaryContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Subtotal:</Text>
                                    <Text style={[styles.summaryValue, { color: theme.text }]}>$2,675.00</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Tax (10%):</Text>
                                    <Text style={[styles.summaryValue, { color: theme.text }]}>$267.50</Text>
                                </View>
                                <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8, marginTop: 8 }]}>
                                    <Text style={[styles.summaryLabel, { color: theme.text, fontWeight: '700', fontSize: 16 }]}>Total:</Text>
                                    <Text style={[styles.summaryValue, { color: theme.primaryLight, fontWeight: '700', fontSize: 18 }]}>$2,942.50</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Shipping Info Section */}
                <View onLayout={(e) => handleLayout('Shipping', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsShippingExpanded(!isShippingExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color="#10B981" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipping Information</Text>
                        </View>
                        <Ionicons name={isShippingExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isShippingExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Shipping Address:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>123 Business St, Suite 100{'\n'}New York, NY 10001{'\n'}United States</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Shipping Method:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Express Delivery (2-3 days)</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Carrier:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>FedEx</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Tracking Number:</Text>
                                <Text style={[styles.infoValue, { color: theme.primaryLight }]}>FDX123456789</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Payment Section */}
                <View onLayout={(e) => handleLayout('Payment', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsPaymentExpanded(!isPaymentExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="credit-card-outline" size={18} color="#F59E0B" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Details</Text>
                        </View>
                        <Ionicons name={isPaymentExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isPaymentExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Method:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Credit Card (****1234)</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Status:</Text>
                                <View style={[styles.badge, { backgroundColor: '#10B98120' }]}>
                                    <Text style={[styles.badgeText, { color: '#10B981' }]}>Paid</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Transaction ID:</Text>
                                <Text style={[styles.infoValue, { color: theme.textSecondary }]}>TXN-987654321</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Date:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Jan 25, 2026</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Tracking Section */}
                <View onLayout={(e) => handleLayout('Tracking', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsTrackingExpanded(!isTrackingExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="map-marker-path" size={18} color="#06B6D4" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Order Tracking</Text>
                        </View>
                        <Ionicons name={isTrackingExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isTrackingExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { status: 'Order Placed', date: 'Jan 25, 10:30 AM', completed: true },
                                { status: 'Payment Confirmed', date: 'Jan 25, 10:35 AM', completed: true },
                                { status: 'Processing', date: 'Jan 25, 2:00 PM', completed: true },
                                { status: 'Shipped', date: 'Jan 26, 9:00 AM', completed: false },
                                { status: 'Out for Delivery', date: 'Pending', completed: false },
                                { status: 'Delivered', date: 'Pending', completed: false },
                            ].map((step, index) => (
                                <View key={index} style={styles.trackingStep}>
                                    <View style={styles.trackingIconContainer}>
                                        <View style={[styles.trackingDot, { backgroundColor: step.completed ? '#10B981' : theme.borderDark }]} />
                                        {index < 5 && <View style={[styles.trackingLine, { backgroundColor: theme.borderLight }]} />}
                                    </View>
                                    <View style={styles.trackingContent}>
                                        <Text style={[styles.trackingStatus, { color: step.completed ? theme.text : theme.textTertiary }]}>{step.status}</Text>
                                        <Text style={[styles.trackingDate, { color: theme.textSecondary }]}>{step.date}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.error + '20', borderColor: theme.error }]}>
                    <Text style={[styles.footerButtonText, { color: theme.error }]}>Cancel Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryLight }]}>
                    <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>Track Shipment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: { marginRight: 8 },
    headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitle: { fontSize: 16, fontWeight: '700' },
    statusBadge: { backgroundColor: '#10B98120', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 10, fontWeight: '600', color: '#10B981' },
    verticalDivider: { width: 1, height: 16, marginHorizontal: 4 },
    companyName: { fontSize: 13, fontWeight: '600' },
    dateText: { fontSize: 12 },
    settingsIcon: { marginLeft: 8 },

    tabContainer: { borderBottomWidth: 1, paddingVertical: 8 },
    tabScrollContent: { paddingHorizontal: 12, gap: 8 },
    tabItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
    tabText: { fontSize: 12, fontWeight: '600' },

    scrollView: { flex: 1 },
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

    summaryContainer: { marginTop: 12, padding: 12, borderRadius: 6, borderWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    summaryLabel: { fontSize: 14 },
    summaryValue: { fontSize: 14, fontWeight: '600' },

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' },
    infoLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, flex: 1.5, textAlign: 'right' },

    badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    badgeText: { fontSize: 12, fontWeight: '600' },

    trackingStep: { flexDirection: 'row', marginBottom: 16 },
    trackingIconContainer: { alignItems: 'center', marginRight: 12 },
    trackingDot: { width: 12, height: 12, borderRadius: 6 },
    trackingLine: { width: 2, flex: 1, marginTop: 4 },
    trackingContent: { flex: 1 },
    trackingStatus: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
    trackingDate: { fontSize: 12 },

    footer: { flexDirection: 'row', padding: 12, gap: 12, borderTopWidth: 1 },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
    footerButtonText: { fontSize: 14, fontWeight: '600' },
});

export default OrderDetailsScreen;
