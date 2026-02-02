import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Platform
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Ultra-Compact 3-Column Layout Calculations
const GAP = 8;
const PADDING = 12;
// ((Screen Width - (LeftPad + RightPad) - (Gap * 2)) / 3)
const ITEM_WIDTH = (width - (PADDING * 2) - (GAP * 2)) / 3;

const ReportsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();

    const reportItems = [
        // Sales (Blue)
        { label: 'Quotations', icon: 'file-document-edit', color: '#2563EB', group: 'Sales' },
        { label: 'Orders', icon: 'clipboard-list', color: '#2563EB', group: 'Sales' },
        { label: 'Sales Order Report', icon: 'file-chart', color: '#2563EB', group: 'Sales' },
        { label: 'Sales Invoice Report', icon: 'receipt', color: '#2563EB', group: 'Sales' },
        { label: 'Client Status Report', icon: 'account-clock', color: '#2563EB', group: 'Sales' },

        // Finance (Amber)
        { label: 'Payments', icon: 'cash-multiple', color: '#F59E0B', group: 'Finance' },
        { label: 'Invoice Payments Due', icon: 'clock-alert', color: '#F59E0B', group: 'Finance' },
        { label: 'Forex Gain/Loss Report', icon: 'currency-usd', color: '#F59E0B', group: 'Finance' },
        { label: 'Forex Gain/Loss Report(Grouped)', icon: 'currency-usd-off', color: '#F59E0B', group: 'Finance' },

        // Inventory/Product (Green)
        { label: 'Product Sales', icon: 'package-variant', color: '#059669', group: 'Inventory' },
        { label: 'Inventory', icon: 'warehouse', color: '#059669', group: 'Inventory' },

        // Logistics (Cyan)
        { label: 'Shipments', icon: 'truck-delivery', color: '#06B6D4', group: 'Logistics' },
        { label: 'Export Register', icon: 'book-open-page-variant', color: '#06B6D4', group: 'Logistics' },
        { label: 'Insurance Report', icon: 'shield-check', color: '#06B6D4', group: 'Logistics' },
        { label: 'eBRC Status', icon: 'bank-check', color: '#06B6D4', group: 'Logistics' },

        // Tax/Gov (Violet)
        { label: 'Duty Drawback Report', icon: 'hand-coin', color: '#7C3AED', group: 'Tax' },
        { label: 'RoDTEP Report', icon: 'percent', color: '#7C3AED', group: 'Tax' },
    ];

    const handlePress = (item: any) => {
        // Corrected navigation to 'ReportView' to restore functionality
        navigation.navigate('ReportView', { reportTitle: item.label });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={styles.cardText} numberOfLines={2}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#F1F5F9' }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reports</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="filter" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={reportItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.label}
                numColumns={3}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{ gap: GAP }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>All Reports</Text>
                        <Text style={styles.listHeaderSubtitle}>View and export detailed insights</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    header: {
        backgroundColor: '#1E3A8A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        elevation: 4,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    listContainer: {
        padding: PADDING,
        paddingBottom: 40,
        gap: GAP,
    },
    listHeader: {
        marginBottom: 12,
        marginTop: 4,
    },
    listHeaderTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 2,
    },
    listHeaderSubtitle: {
        fontSize: 12,
        color: '#64748B',
    },
    // Ultra Compact Card (Same as AdminScreen)
    card: {
        width: ITEM_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#334155',
        textAlign: 'center',
        lineHeight: 12,
    }
});

export default ReportsScreen;
