import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const screenWidth = width;

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { user, logout } = useAuthStore();
    const { theme } = useThemeStore();
    const [menuVisible, setMenuVisible] = useState(false);

    // --- CHART CONFIG ---
    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(29, 78, 216, ${opacity})`, // Blue-700
        strokeWidth: 2,
        barPercentage: 0.7,
        decimalPlaces: 0,
        propsForLabels: {
            fontSize: 10,
            fill: '#64748B',
        },
        propsForBackgroundLines: {
            strokeDasharray: '', // solid lines
            stroke: '#E2E8F0',
        },
    };

    // --- MOCK DATA ---
    const salesStats = [
        { label: 'Shipment Value (INR)', value: '₹26,81,16,791', isPrimary: true },
        { label: 'Total Orders', value: '21', isPrimary: false },
        { label: 'Total Shipments', value: '20', isPrimary: false },
        { label: 'Order Value', value: '₹26,94,76,404', isPrimary: false },
    ];
    const salesChartData = {
        labels: ['Jan', 'Feb'],
        datasets: [{ data: [10, 400] }], // Visual approximation: Jan low, Feb high
    };

    const profitStats = [
        { label: '(Sales - Purchases)', value: '₹26,78,74,791', isPrimary: true },
        { label: 'Purchase Orders', value: '12', isPrimary: false },
        { label: 'PO Value', value: '₹5,56,87,106', isPrimary: false },
    ];
    const profitChartData = {
        labels: ['Jan', 'Feb'],
        datasets: [{ data: [15, 450] }], // Visual approximation
    };

    const receiptsStats = [
        { label: 'Receipt Value (INR)', value: '₹4,50,000', isPrimary: true },
        { label: 'Total Invoices', value: '20', isPrimary: false },
        { label: 'Total Receipts', value: '1', isPrimary: false },
        { label: 'Payment Due', value: '₹26,36,74,046', isPrimary: false },
        { label: 'Payment Past Due', value: '₹26,36,74,046', isPrimary: false },
    ];
    const receiptsChartData = {
        labels: ['Jan', 'Feb'],
        datasets: [{ data: [0, 400] }], // Jan is 0 based on image
    };

    const agingChartData = {
        labels: ['0-30', '31-60', '61-90', '90+'],
        datasets: [{ data: [400, 0, 0, 0] }], // Only 0-30 has data
    };


    const renderStatRow = (label: string, value: string, isPrimary: boolean, index: number) => (
        <View key={index} style={styles.statRow}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statValue, isPrimary && styles.statValuePrimary]}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={24} color={theme.headerText} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Dashboard</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={20} color={theme.headerText} />
                    </TouchableOpacity>

                    {/* User Avatar */}
                    <TouchableOpacity
                        style={[styles.headerAvatar, { backgroundColor: theme.surface }]}
                        onPress={() => setMenuVisible(!menuVisible)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.avatarCircle}>
                            <Text style={[styles.avatarInitial, { color: theme.primary }]}>{user?.name?.[0] || 'U'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* 1. SALES Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sales</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        {salesStats.map((stat, i) => renderStatRow(stat.label, stat.value, stat.isPrimary, i))}
                    </View>
                    <View style={styles.chartWrapper}>
                        <Text style={styles.chartLabel}>Sales (Shipment Value)</Text>
                        {/* Legend hack */}
                        <View style={styles.legendContainer}>
                            <View style={styles.legendDot} />
                            <Text style={styles.legendText}>2026</Text>
                        </View>
                        <BarChart
                            data={salesChartData}
                            width={screenWidth - 64}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            style={styles.chartStyle}
                            showValuesOnTopOfBars={false}
                            fromZero
                        />
                        <Text style={styles.xAxisLabel}>Month</Text>
                    </View>
                </View>

                {/* 2. GROSS PROFIT Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Gross Profit</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        {profitStats.map((stat, i) => renderStatRow(stat.label, stat.value, stat.isPrimary, i))}
                    </View>
                    <View style={styles.chartWrapper}>
                        <Text style={styles.chartLabel}>Gross Profit (Sales - Purchases)</Text>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendDot} />
                            <Text style={styles.legendText}>2026</Text>
                        </View>
                        <BarChart
                            data={profitChartData}
                            width={screenWidth - 64}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            style={styles.chartStyle}
                            fromZero
                        />
                    </View>
                </View>

                {/* 3. PAYMENT RECEIPTS Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Payment Receipts</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        {receiptsStats.map((stat, i) => renderStatRow(stat.label, stat.value, stat.isPrimary, i))}
                    </View>
                    <View style={styles.chartWrapper}>
                        <Text style={styles.chartLabel}>Receipts</Text>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendDot} />
                            <Text style={styles.legendText}>2026</Text>
                        </View>
                        <BarChart
                            data={receiptsChartData}
                            width={screenWidth - 64}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            style={styles.chartStyle}
                            fromZero
                        />
                    </View>
                </View>

                {/* 4. ACCOUNTS RECEIVABLE Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Accounts Receivable</Text>
                    </View>
                    <View style={styles.chartWrapper}>
                        <Text style={styles.chartLabel}>INR (Lakhs)</Text>
                        <BarChart
                            data={agingChartData}
                            width={screenWidth - 64}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            style={styles.chartStyle}
                            fromZero
                        />
                        <Text style={styles.xAxisLabel}>Aging Buckets</Text>
                    </View>
                </View>

            </ScrollView>

            {/* User Menu Popup */}
            {menuVisible && (
                <View style={styles.userMenuPopup}>
                    <Text style={styles.menuPopupHeader}>User</Text>
                    <TouchableOpacity style={styles.popupItem} onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}>
                        <Ionicons name="person-outline" size={16} color="#475569" style={styles.popupIcon} />
                        <Text style={styles.popupText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupItem} onPress={() => setMenuVisible(false)}>
                        <Ionicons name="key-outline" size={16} color="#475569" style={styles.popupIcon} />
                        <Text style={styles.popupText}>Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupItem} onPress={() => setMenuVisible(false)}>
                        <Ionicons name="moon-outline" size={16} color="#475569" style={styles.popupIcon} />
                        <Text style={styles.popupText}>Dark Mode</Text>
                    </TouchableOpacity>
                    <View style={styles.popupDivider} />
                    <TouchableOpacity style={styles.popupItem} onPress={() => { setMenuVisible(false); logout(); }}>
                        <Ionicons name="log-out-outline" size={16} color="#EF4444" style={styles.popupIcon} />
                        <Text style={[styles.popupText, { color: '#EF4444' }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9', // Slate-100
    },
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
        justifyContent: 'flex-start',
    },
    menuButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'left',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
    },
    headerAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    avatarCircle: {
        width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
    },
    avatarInitial: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1E3A8A',
    },
    userMenuPopup: {
        position: 'absolute',
        top: 60,
        right: 16,
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        zIndex: 100,
        elevation: 10,
        ...Platform.select({
            web: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
            default: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }
        })
    },
    menuPopupHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    popupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    popupIcon: {
        marginRight: 8,
    },
    popupText: {
        fontSize: 13,
        color: '#334155',
        fontWeight: '500',
    },
    popupDivider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 2,
    },
    content: {
        flex: 1,
        padding: 12,
    },

    // --- New Section Card Styles ---
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            default: { elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 }
        }),
    },
    sectionHeader: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B', // Slate-800
    },
    statsContainer: {
        marginBottom: 16,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 13,
        color: '#64748B', // Slate-500
        flex: 1,
    },
    statValue: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155', // Slate-700
    },
    statValuePrimary: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A', // Slate-900
    },
    chartWrapper: {
        backgroundColor: '#F8FAFC', // Very light background for chart area
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
    },
    chartLabel: {
        fontSize: 10,
        color: '#64748B',
        marginBottom: 4,
        alignSelf: 'flex-start',
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 4,
    },
    legendDot: {
        width: 8,
        height: 8,
        backgroundColor: '#1D4ED8',
        borderRadius: 4,
        marginRight: 4,
    },
    legendText: {
        fontSize: 10,
        color: '#64748B',
    },
    chartStyle: {
        borderRadius: 8,
        marginVertical: 4,
    },
    xAxisLabel: {
        fontSize: 10,
        color: '#64748B',
        marginTop: 4,
    }
});

export default HomeScreen;
