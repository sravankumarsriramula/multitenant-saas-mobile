import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';

const InvoiceDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
    const invoiceId = route.params?.id || '#INV-2026-001';

    const [isItemsExpanded, setIsItemsExpanded] = useState(true);
    const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);

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
                        <MaterialCommunityIcons name="receipt" size={20} color="#10B981" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{invoiceId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>PAID</Text>
                        </View>
                        <View style={[styles.verticalDivider, { backgroundColor: theme.borderDark }]} />
                        <Text style={[styles.companyName, { color: theme.text }]} numberOfLines={1}>TECH CORP</Text>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]} numberOfLines={1}>Jan 20</Text>
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
                        <MaterialCommunityIcons name="format-list-bulleted" size={16} color={activeTab === 'Items' ? theme.text : theme.textSecondary} />
                        <Text style={[styles.tabText, { color: activeTab === 'Items' ? theme.text : theme.textSecondary }]}>Line Items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Payment' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Payment')}
                    >
                        <MaterialCommunityIcons name="credit-card-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Payment Info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'History' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('History')}
                    >
                        <MaterialCommunityIcons name="history" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>History</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Invoice Info Card */}
                <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Invoice Date:</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>Jan 20, 2026</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Due Date:</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>Feb 20, 2026</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Customer:</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>Alice Smith</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Company:</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>SKY SHORE PVT LTD</Text>
                    </View>
                </View>

                {/* Line Items */}
                <View onLayout={(e) => handleLayout('Items', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsItemsExpanded(!isItemsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="format-list-bulleted" size={18} color={theme.primaryLight} />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Line Items</Text>
                        </View>
                        <Ionicons name={isItemsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isItemsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={[styles.tableContainer, { borderColor: theme.border }]}>
                                <View style={[styles.tableHeader, { backgroundColor: theme.inputBackground }]}>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 2 }]}>Description</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'center' }]}>Qty</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Rate</Text>
                                    <Text style={[styles.tableHeaderText, { color: theme.text }, { flex: 1, textAlign: 'right' }]}>Amount</Text>
                                </View>

                                {[
                                    { desc: 'Consulting Services', qty: '40 hrs', rate: '$150', amount: '$6,000' },
                                    { desc: 'Software License', qty: '1', rate: '$2,500', amount: '$2,500' },
                                    { desc: 'Support Package', qty: '1', rate: '$1,500', amount: '$1,500' },
                                ].map((item, index) => (
                                    <View key={index} style={[styles.tableRow, { borderTopColor: theme.borderLight }]}>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 2 }]}>{item.desc}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'center' }]}>{item.qty}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.textSecondary }, { flex: 1, textAlign: 'right' }]}>{item.rate}</Text>
                                        <Text style={[styles.tableCellText, { color: theme.text }, { flex: 1, textAlign: 'right', fontWeight: '600' }]}>{item.amount}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={[styles.summaryContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Subtotal:</Text>
                                    <Text style={[styles.summaryValue, { color: theme.text }]}>$10,000.00</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Tax (8%):</Text>
                                    <Text style={[styles.summaryValue, { color: theme.text }]}>$800.00</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Discount:</Text>
                                    <Text style={[styles.summaryValue, { color: theme.error }]}>-$500.00</Text>
                                </View>
                                <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8, marginTop: 8 }]}>
                                    <Text style={[styles.summaryLabel, { color: theme.text, fontWeight: '700', fontSize: 16 }]}>Total Due:</Text>
                                    <Text style={[styles.summaryValue, { color: theme.primaryLight, fontWeight: '700', fontSize: 18 }]}>$10,300.00</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Payment Info */}
                <View onLayout={(e) => handleLayout('Payment', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsPaymentExpanded(!isPaymentExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="credit-card-outline" size={18} color="#10B981" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Information</Text>
                        </View>
                        <Ionicons name={isPaymentExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isPaymentExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Status:</Text>
                                <View style={[styles.badge, { backgroundColor: '#10B98120' }]}>
                                    <Text style={[styles.badgeText, { color: '#10B981' }]}>Paid</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Method:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Bank Transfer</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Date:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Jan 22, 2026</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Transaction ID:</Text>
                                <Text style={[styles.infoValue, { color: theme.primaryLight }]}>TXN-123456789</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Amount Paid:</Text>
                                <Text style={[styles.infoValue, { color: theme.text, fontWeight: '600' }]}>$10,300.00</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* History */}
                <View onLayout={(e) => handleLayout('History', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsHistoryExpanded(!isHistoryExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="history" size={18} color="#06B6D4" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Invoice History</Text>
                        </View>
                        <Ionicons name={isHistoryExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isHistoryExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { action: 'Invoice Created', date: 'Jan 20, 2026 10:00 AM', user: 'System' },
                                { action: 'Invoice Sent to Customer', date: 'Jan 20, 2026 10:15 AM', user: 'Admin' },
                                { action: 'Payment Received', date: 'Jan 22, 2026 2:30 PM', user: 'System' },
                                { action: 'Invoice Marked as Paid', date: 'Jan 22, 2026 2:35 PM', user: 'Admin' },
                            ].map((event, index) => (
                                <View key={index} style={[styles.historyItem, { borderLeftColor: theme.primaryLight }]}>
                                    <Text style={[styles.historyAction, { color: theme.text }]}>{event.action}</Text>
                                    <Text style={[styles.historyDate, { color: theme.textSecondary }]}>{event.date}</Text>
                                    <Text style={[styles.historyUser, { color: theme.textTertiary }]}>By: {event.user}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                    <Text style={[styles.footerButtonText, { color: theme.text }]}>Download PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryLight }]}>
                    <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>Send Invoice</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1 },
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
    infoCard: { marginHorizontal: 12, marginTop: 12, padding: 12, borderRadius: 8, borderWidth: 1 },
    section: { marginHorizontal: 12, marginTop: 12, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sectionTitle: { fontSize: 15, fontWeight: '700' },
    sectionContent: { paddingHorizontal: 12, paddingBottom: 12 },

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' },
    infoLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, flex: 1.5, textAlign: 'right' },

    tableContainer: { borderWidth: 1, borderRadius: 6, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', padding: 10 },
    tableHeaderText: { fontSize: 12, fontWeight: '700' },
    tableRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1 },
    tableCellText: { fontSize: 12 },

    summaryContainer: { marginTop: 12, padding: 12, borderRadius: 6, borderWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    summaryLabel: { fontSize: 14 },
    summaryValue: { fontSize: 14, fontWeight: '600' },

    badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    badgeText: { fontSize: 12, fontWeight: '600' },

    historyItem: { borderLeftWidth: 3, paddingLeft: 12, marginBottom: 16 },
    historyAction: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    historyDate: { fontSize: 12, marginBottom: 2 },
    historyUser: { fontSize: 11 },

    footer: { flexDirection: 'row', padding: 12, gap: 12, borderTopWidth: 1 },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
    footerButtonText: { fontSize: 14, fontWeight: '600' },
});

export default InvoiceDetailsScreen;
