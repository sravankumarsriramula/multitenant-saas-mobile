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

const PaymentDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
    const paymentId = route.params?.id || '#PAY-2026-801';

    const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
    const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(true);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);

    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState('Details');
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
                        <MaterialCommunityIcons name="credit-card-outline" size={20} color="#10B981" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{paymentId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>COMPLETED</Text>
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

            <View style={[styles.tabContainer, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Details' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Details')}
                    >
                        <MaterialCommunityIcons name="information-outline" size={16} color={activeTab === 'Details' ? theme.text : theme.textSecondary} />
                        <Text style={[styles.tabText, { color: activeTab === 'Details' ? theme.text : theme.textSecondary }]}>Payment Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Invoice' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Invoice')}
                    >
                        <MaterialCommunityIcons name="receipt" size={16} color="#3B82F6" />
                        <Text style={[styles.tabText, { color: '#3B82F6' }]}>Related Invoice</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'History' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('History')}
                    >
                        <MaterialCommunityIcons name="history" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>Transaction History</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Payment Amount Card */}
                <View style={[styles.amountCard, { backgroundColor: theme.primaryLight }]}>
                    <Text style={styles.amountLabel}>Payment Amount</Text>
                    <Text style={styles.amountValue}>USD 5,000.00</Text>
                    <View style={styles.amountBadge}>
                        <MaterialCommunityIcons name="check-circle" size={16} color="#FFFFFF" />
                        <Text style={styles.amountBadgeText}>Payment Successful</Text>
                    </View>
                </View>

                {/* Payment Details */}
                <View onLayout={(e) => handleLayout('Details', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="information-outline" size={18} color={theme.primaryLight} />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Information</Text>
                        </View>
                        <Ionicons name={isDetailsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isDetailsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment ID:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>{paymentId}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Method:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Bank Transfer</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Transaction ID:</Text>
                                <Text style={[styles.infoValue, { color: theme.primaryLight }]}>TXN-987654321</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payment Date:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Jan 22, 2026 2:30 PM</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payer Name:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>John Doe</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Payer Company:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>SKY SHORE PVT LTD</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Bank Name:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Chase Bank</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Account Number:</Text>
                                <Text style={[styles.infoValue, { color: theme.textSecondary }]}>****5678</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Reference Number:</Text>
                                <Text style={[styles.infoValue, { color: theme.textSecondary }]}>REF-123456</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Related Invoice */}
                <View onLayout={(e) => handleLayout('Invoice', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsInvoiceExpanded(!isInvoiceExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="receipt" size={18} color="#3B82F6" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Related Invoice</Text>
                        </View>
                        <Ionicons name={isInvoiceExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isInvoiceExpanded && (
                        <View style={styles.sectionContent}>
                            <TouchableOpacity style={[styles.invoiceCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                <View style={styles.invoiceHeader}>
                                    <MaterialCommunityIcons name="receipt" size={24} color="#3B82F6" />
                                    <View style={styles.invoiceInfo}>
                                        <Text style={[styles.invoiceId, { color: theme.text }]}>#INV-2026-001</Text>
                                        <Text style={[styles.invoiceDate, { color: theme.textSecondary }]}>Issued: Jan 20, 2026</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                                </View>
                                <View style={[styles.invoiceDetails, { borderTopColor: theme.borderLight }]}>
                                    <View style={styles.invoiceDetailRow}>
                                        <Text style={[styles.invoiceDetailLabel, { color: theme.textTertiary }]}>Invoice Amount:</Text>
                                        <Text style={[styles.invoiceDetailValue, { color: theme.text }]}>$5,000.00</Text>
                                    </View>
                                    <View style={styles.invoiceDetailRow}>
                                        <Text style={[styles.invoiceDetailLabel, { color: theme.textTertiary }]}>Amount Paid:</Text>
                                        <Text style={[styles.invoiceDetailValue, { color: '#10B981' }]}>$5,000.00</Text>
                                    </View>
                                    <View style={styles.invoiceDetailRow}>
                                        <Text style={[styles.invoiceDetailLabel, { color: theme.textTertiary }]}>Balance:</Text>
                                        <Text style={[styles.invoiceDetailValue, { color: theme.text }]}>$0.00</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Transaction History */}
                <View onLayout={(e) => handleLayout('History', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsHistoryExpanded(!isHistoryExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="history" size={18} color="#06B6D4" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Transaction History</Text>
                        </View>
                        <Ionicons name={isHistoryExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isHistoryExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { action: 'Payment Initiated', date: 'Jan 22, 2026 2:25 PM', status: 'Processing' },
                                { action: 'Bank Verification', date: 'Jan 22, 2026 2:28 PM', status: 'Verified' },
                                { action: 'Payment Processed', date: 'Jan 22, 2026 2:30 PM', status: 'Success' },
                                { action: 'Invoice Updated', date: 'Jan 22, 2026 2:31 PM', status: 'Completed' },
                                { action: 'Receipt Generated', date: 'Jan 22, 2026 2:32 PM', status: 'Completed' },
                            ].map((event, index) => (
                                <View key={index} style={styles.historyStep}>
                                    <View style={styles.historyIconContainer}>
                                        <View style={[styles.historyDot, { backgroundColor: '#10B981' }]} />
                                        {index < 4 && <View style={[styles.historyLine, { backgroundColor: theme.borderLight }]} />}
                                    </View>
                                    <View style={styles.historyContent}>
                                        <Text style={[styles.historyAction, { color: theme.text }]}>{event.action}</Text>
                                        <Text style={[styles.historyDate, { color: theme.textSecondary }]}>{event.date}</Text>
                                        <View style={[styles.historyBadge, { backgroundColor: '#10B98120' }]}>
                                            <Text style={[styles.historyBadgeText, { color: '#10B981' }]}>{event.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                    <Text style={[styles.footerButtonText, { color: theme.text }]}>Download Receipt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryLight }]}>
                    <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>Request Refund</Text>
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
    amountCard: { marginHorizontal: 12, marginTop: 12, padding: 20, borderRadius: 12, alignItems: 'center' },
    amountLabel: { fontSize: 14, color: '#FFFFFF', opacity: 0.9, marginBottom: 8 },
    amountValue: { fontSize: 32, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
    amountBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFFFFF20', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    amountBadgeText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },

    section: { marginHorizontal: 12, marginTop: 12, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sectionTitle: { fontSize: 15, fontWeight: '700' },
    sectionContent: { paddingHorizontal: 12, paddingBottom: 12 },

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' },
    infoLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, flex: 1.5, textAlign: 'right' },

    invoiceCard: { padding: 12, borderRadius: 8, borderWidth: 1 },
    invoiceHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    invoiceInfo: { flex: 1 },
    invoiceId: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
    invoiceDate: { fontSize: 12 },
    invoiceDetails: { marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
    invoiceDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    invoiceDetailLabel: { fontSize: 13 },
    invoiceDetailValue: { fontSize: 13, fontWeight: '600' },

    historyStep: { flexDirection: 'row', marginBottom: 16 },
    historyIconContainer: { alignItems: 'center', marginRight: 12 },
    historyDot: { width: 12, height: 12, borderRadius: 6 },
    historyLine: { width: 2, flex: 1, marginTop: 4 },
    historyContent: { flex: 1 },
    historyAction: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    historyDate: { fontSize: 12, marginBottom: 4 },
    historyBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    historyBadgeText: { fontSize: 11, fontWeight: '600' },

    footer: { flexDirection: 'row', padding: 12, gap: 12, borderTopWidth: 1 },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
    footerButtonText: { fontSize: 14, fontWeight: '600' },
});

export default PaymentDetailsScreen;
