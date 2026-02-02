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

const ShipmentDetailsScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { theme } = useThemeStore();
    const shipmentId = route.params?.id || '#SHP-2026-001';

    // Collapsible Sections State
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
    const [isItemsExpanded, setIsItemsExpanded] = useState(true);
    const [isTrackingExpanded, setIsTrackingExpanded] = useState(true);
    const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(true);

    // Scroll & Tab State
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
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="package-variant" size={20} color="#8B5CF6" />
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{shipmentId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>IN TRANSIT</Text>
                        </View>
                        <View style={[styles.verticalDivider, { backgroundColor: theme.borderDark }]} />
                        <Text style={[styles.companyName, { color: theme.text }]} numberOfLines={1}>GLOBAL LOGISTICS</Text>
                        <Text style={[styles.dateText, { color: theme.textSecondary }]} numberOfLines={1}>Jan 28</Text>
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
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Details' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Details')}
                    >
                        <MaterialCommunityIcons name="information-outline" size={16} color={activeTab === 'Details' ? theme.text : theme.textSecondary} />
                        <Text style={[styles.tabText, { color: activeTab === 'Details' ? theme.text : theme.textSecondary }]}>Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Items' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Items')}
                    >
                        <MaterialCommunityIcons name="cube-outline" size={16} color="#10B981" />
                        <Text style={[styles.tabText, { color: '#10B981' }]}>Items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Tracking' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Tracking')}
                    >
                        <MaterialCommunityIcons name="map-marker-path" size={16} color="#06B6D4" />
                        <Text style={[styles.tabText, { color: '#06B6D4' }]}>Tracking</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }, activeTab === 'Documents' && { backgroundColor: theme.borderLight, borderColor: theme.borderDark }]}
                        onPress={() => scrollToSection('Documents')}
                    >
                        <MaterialCommunityIcons name="file-document-outline" size={16} color="#F59E0B" />
                        <Text style={[styles.tabText, { color: '#F59E0B' }]}>Documents</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Scrollable Content */}
            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Shipment Details Section */}
                <View onLayout={(e) => handleLayout('Details', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="information-outline" size={18} color={theme.primaryLight} />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipment Details</Text>
                        </View>
                        <Ionicons name={isDetailsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isDetailsExpanded && (
                        <View style={styles.sectionContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Origin:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Los Angeles, CA</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Destination:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>New York, NY</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Carrier:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>FedEx Express</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Tracking Number:</Text>
                                <Text style={[styles.infoValue, { color: theme.primaryLight }]}>FDX987654321</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Weight:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>45.5 kg</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Dimensions:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>120 x 80 x 60 cm</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.textTertiary }]}>Estimated Delivery:</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Jan 30, 2026</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Items Section */}
                <View onLayout={(e) => handleLayout('Items', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsItemsExpanded(!isItemsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="cube-outline" size={18} color="#10B981" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipment Items</Text>
                        </View>
                        <Ionicons name={isItemsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isItemsExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { name: 'Electronics - Laptops', qty: '50 units', weight: '25 kg' },
                                { name: 'Office Supplies', qty: '200 units', weight: '15 kg' },
                                { name: 'Accessories', qty: '100 units', weight: '5.5 kg' },
                            ].map((item, index) => (
                                <View key={index} style={[styles.itemCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                    <View style={styles.itemHeader}>
                                        <MaterialCommunityIcons name="package-variant-closed" size={16} color={theme.primaryLight} />
                                        <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                                    </View>
                                    <View style={styles.itemDetails}>
                                        <Text style={[styles.itemDetail, { color: theme.textSecondary }]}>Qty: {item.qty}</Text>
                                        <Text style={[styles.itemDetail, { color: theme.textSecondary }]}>Weight: {item.weight}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Tracking Section */}
                <View onLayout={(e) => handleLayout('Tracking', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsTrackingExpanded(!isTrackingExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="map-marker-path" size={18} color="#06B6D4" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Tracking History</Text>
                        </View>
                        <Ionicons name={isTrackingExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isTrackingExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { location: 'Los Angeles, CA', status: 'Picked up', date: 'Jan 28, 8:00 AM', completed: true },
                                { location: 'Los Angeles Hub', status: 'Departed facility', date: 'Jan 28, 12:00 PM', completed: true },
                                { location: 'Phoenix, AZ', status: 'In transit', date: 'Jan 28, 6:00 PM', completed: true },
                                { location: 'Dallas, TX', status: 'Arrived at facility', date: 'Jan 29, 2:00 AM', completed: false },
                                { location: 'New York, NY', status: 'Out for delivery', date: 'Pending', completed: false },
                                { location: 'New York, NY', status: 'Delivered', date: 'Pending', completed: false },
                            ].map((step, index) => (
                                <View key={index} style={styles.trackingStep}>
                                    <View style={styles.trackingIconContainer}>
                                        <View style={[styles.trackingDot, { backgroundColor: step.completed ? '#06B6D4' : theme.borderDark }]} />
                                        {index < 5 && <View style={[styles.trackingLine, { backgroundColor: theme.borderLight }]} />}
                                    </View>
                                    <View style={styles.trackingContent}>
                                        <Text style={[styles.trackingLocation, { color: step.completed ? theme.text : theme.textTertiary }]}>{step.location}</Text>
                                        <Text style={[styles.trackingStatus, { color: theme.textSecondary }]}>{step.status}</Text>
                                        <Text style={[styles.trackingDate, { color: theme.textTertiary }]}>{step.date}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Documents Section */}
                <View onLayout={(e) => handleLayout('Documents', e)} style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsDocumentsExpanded(!isDocumentsExpanded)}>
                        <View style={styles.sectionHeaderLeft}>
                            <MaterialCommunityIcons name="file-document-outline" size={18} color="#F59E0B" />
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipping Documents</Text>
                        </View>
                        <Ionicons name={isDocumentsExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {isDocumentsExpanded && (
                        <View style={styles.sectionContent}>
                            {[
                                { name: 'Bill of Lading', type: 'PDF', size: '245 KB' },
                                { name: 'Commercial Invoice', type: 'PDF', size: '189 KB' },
                                { name: 'Packing List', type: 'PDF', size: '156 KB' },
                                { name: 'Certificate of Origin', type: 'PDF', size: '98 KB' },
                            ].map((doc, index) => (
                                <TouchableOpacity key={index} style={[styles.documentCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                                    <MaterialCommunityIcons name="file-pdf-box" size={24} color="#EF4444" />
                                    <View style={styles.documentInfo}>
                                        <Text style={[styles.documentName, { color: theme.text }]}>{doc.name}</Text>
                                        <Text style={[styles.documentMeta, { color: theme.textSecondary }]}>{doc.type} • {doc.size}</Text>
                                    </View>
                                    <Ionicons name="download-outline" size={20} color={theme.primaryLight} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
                    <Text style={[styles.footerButtonText, { color: theme.text }]}>Share Tracking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryLight }]}>
                    <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>Contact Carrier</Text>
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
    statusBadge: { backgroundColor: '#06B6D420', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 10, fontWeight: '600', color: '#06B6D4' },
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

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' },
    infoLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, flex: 1.5, textAlign: 'right' },

    itemCard: { padding: 12, borderRadius: 6, borderWidth: 1, marginBottom: 8 },
    itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    itemName: { fontSize: 14, fontWeight: '600' },
    itemDetails: { flexDirection: 'row', gap: 16 },
    itemDetail: { fontSize: 12 },

    trackingStep: { flexDirection: 'row', marginBottom: 16 },
    trackingIconContainer: { alignItems: 'center', marginRight: 12 },
    trackingDot: { width: 12, height: 12, borderRadius: 6 },
    trackingLine: { width: 2, flex: 1, marginTop: 4 },
    trackingContent: { flex: 1 },
    trackingLocation: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
    trackingStatus: { fontSize: 13, marginBottom: 2 },
    trackingDate: { fontSize: 12 },

    documentCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 6, borderWidth: 1, marginBottom: 8 },
    documentInfo: { flex: 1, marginLeft: 12 },
    documentName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
    documentMeta: { fontSize: 12 },

    footer: { flexDirection: 'row', padding: 12, gap: 12, borderTopWidth: 1 },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
    footerButtonText: { fontSize: 14, fontWeight: '600' },
});

export default ShipmentDetailsScreen;
