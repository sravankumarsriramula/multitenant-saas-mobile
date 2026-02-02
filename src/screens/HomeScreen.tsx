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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const screenWidth = width;

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { user, logout } = useAuthStore();
    const [menuVisible, setMenuVisible] = useState(false);

    // --- CHART CONFIG ---
    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.7,
        decimalPlaces: 0,
        propsForLabels: {
            fontSize: 10,
        }
    };

    // --- MOCK DATA ---
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
    };

    const profitData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [15, 30, 20, 60, 75, 35] }],
    };

    const pieData = [
        { name: 'Heat Reflective', population: 40, color: '#2563EB', legendFontColor: '#7F7F7F', legendFontSize: 10 },
        { name: 'Multi Grade Oil', population: 30, color: '#F59E0B', legendFontColor: '#7F7F7F', legendFontSize: 10 },
        { name: 'Seating Ball', population: 20, color: '#10B981', legendFontColor: '#7F7F7F', legendFontSize: 10 },
        { name: 'Cotton', population: 10, color: '#EF4444', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* User Avatar */}
                    <TouchableOpacity
                        style={styles.headerAvatar}
                        onPress={() => setMenuVisible(!menuVisible)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarInitial}>{user?.name?.[0] || 'U'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                {/* 1. Metric Cards */}
                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIconContainer}>
                                <Text style={styles.cardIcon}>📦</Text>
                            </View>
                            <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                                <Text style={[styles.badgeText, { color: '#166534' }]}>+12.5%</Text>
                            </View>
                        </View>
                        <Text style={styles.cardLabel}>Total Shipments</Text>
                        <Text style={styles.cardValue}>{Math.floor(Math.random() * 50) + 120}</Text>
                        <Text style={styles.cardSubtext}>vs last month</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIconContainer}>
                                <Text style={styles.cardIcon}>💰</Text>
                            </View>
                            <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}>
                                <Text style={[styles.badgeText, { color: '#991B1B' }]}>-2.4%</Text>
                            </View>
                        </View>
                        <Text style={styles.cardLabel}>Revenue</Text>
                        <Text style={styles.cardValue}>$ {(Math.random() * 10 + 40).toFixed(1)}k</Text>
                        <Text style={styles.cardSubtext}>vs last month</Text>
                    </View>
                </View>

                {/* 2. Charts */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Monthly Overview</Text>
                    <BarChart
                        data={salesData}
                        width={screenWidth - 48}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix=""  // Added missing prop
                        chartConfig={chartConfig}
                        style={styles.chartStyle}
                        showValuesOnTopOfBars
                        fromZero
                    />
                </View>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Product Distribution</Text>
                    <PieChart
                        data={pieData}
                        width={screenWidth - 48}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                    />
                </View>
            </ScrollView>

            {/* User Menu Popup (Overlay) */}
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


        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2FF', // Light Periwinkle background from image
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
    },
    menuButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
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
        top: 60, // Ensure it clears the header
        right: 16,
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        zIndex: 100, // Force on top
        elevation: 10, // Higher elevation for Android
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
    // --- Metric Cards ---
    cardsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12, // Softer corners
        padding: 16,
        ...Platform.select({
            default: { elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 }
        }),
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        fontSize: 16,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 2,
    },
    cardSubtext: {
        fontSize: 10,
        color: '#94A3B8',
    },
    // --- Charts ---
    chartContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Platform.select({
            default: { elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 }
        }),
    },
    chartTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 16,
    },
    chartStyle: {
        borderRadius: 16,
        paddingRight: 0,
    },
});

export default HomeScreen;
