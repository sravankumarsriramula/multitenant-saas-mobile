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
import { useThemeStore } from '../store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');
const screenWidth = width;

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();

    // --- CHART CONFIG & MOCK DATA ---
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Explicitly formatting data
    const formatData = (values: number[], color: string) => {
        return values.map((val, index) => ({
            value: val,
            label: months[index],
            frontColor: color,
            spacing: 16, // Fixed spacing from previous working version
            labelTextStyle: { color: '#94A3B8', fontSize: 10 },
        }));
    };

    const salesValues = [12, 19, 15, 22, 28, 25, 35, 30, 42, 38, 45, 52];
    const salesData = formatData(salesValues, '#2563EB');

    const profitValues = [4, 7, 5, 8, 10, 8, 12, 11, 15, 13, 16, 19];
    const profitData = formatData(profitValues, '#059669');

    const receiptsValues = [10, 15, 14, 20, 25, 23, 30, 28, 35, 33, 40, 48];
    const receiptsData = formatData(receiptsValues, '#7C3AED');

    const agingPieData = [
        { value: 450, color: '#10B981', text: '54%', label: '0-30 Days' },
        { value: 120, color: '#F59E0B', text: '30%', label: '31-60 Days' },
        { value: 80, color: '#F97316', text: '20%', label: '61-90 Days' },
        { value: 40, color: '#EF4444', text: '16%', label: '90+ Days' },
    ];

    const agingBarData = [
        { value: 450, label: '0-30', frontColor: '#10B981' },
        { value: 120, label: '31-60', frontColor: '#F59E0B' },
        { value: 80, label: '61-90', frontColor: '#F97316' },
        { value: 40, label: '90+', frontColor: '#EF4444' },
    ];

    const topProducts = [
        { value: 40, text: '12.5L', color: '#2563EB', label: 'Headset' },
        { value: 25, text: '8.2L', color: '#059669', label: 'Chair' },
        { value: 15, text: '5.4L', color: '#7C3AED', label: 'Stand' },
        { value: 12, text: '3.1L', color: '#F59E0B', label: 'KB' },
        { value: 8, text: '2.8L', color: '#DC2626', label: 'Hub' },
    ];

    // --- STATS ---
    const salesStats = [
        { label: 'Shipment Value (INR)', value: '₹26,81,16,791', isPrimary: true },
        { label: 'Orders', value: '254', isPrimary: false },
        { label: 'Shipments', value: '240', isPrimary: false },
        { label: 'Order Value', value: '₹26.9 L', isPrimary: false },
    ];

    const profitStats = [
        { label: 'Net Profit', value: '₹8,78,74,791', isPrimary: true },
        { label: 'PO Count', value: '142', isPrimary: false },
        { label: 'Margin', value: '32%', isPrimary: false },
    ];

    const receiptsStats = [
        { label: 'Payment Receipts', value: '₹24,50,000', isPrimary: true },
        { label: 'Invoices', value: '210', isPrimary: false },
        { label: 'Receipts', value: '185', isPrimary: false },
        { label: 'Outstand.', value: '₹2.6 Cr', isPrimary: false },
    ];

    // Tooltip Component
    const renderTooltip = (item: any) => {
        return (
            <View style={{
                marginBottom: 20,
                padding: 6,
                backgroundColor: '#1E293B',
                borderRadius: 4,
            }}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{item.value}</Text>
            </View>
        );
    };

    const MetricCard = ({
        title,
        icon,
        color,
        stats,
        chartData,
        chartType = 'bar'
    }: {
        title: string,
        icon: any,
        color: string,
        stats: any[],
        chartData?: any,
        chartType?: 'bar' | 'pie'
    }) => {
        const primaryStat = stats.find(s => s.isPrimary);
        const secondaryStats = stats.filter(s => !s.isPrimary);

        return (
            <View style={styles.card}>
                {/* Headerless Design - Restored to clean look */}
                <View style={[styles.mainBlockRow, !primaryStat && styles.mainBlockRowCenter]}>
                    <View>
                        {primaryStat ? (
                            <>
                                <Text style={styles.mainLabel}>{primaryStat.label}</Text>
                                <Text style={[styles.mainValue, { color: color }]}>{primaryStat.value}</Text>
                            </>
                        ) : (
                            <Text style={styles.mainValueTitle}>{title}</Text>
                        )}
                    </View>
                    <View style={[styles.iconBubble, { backgroundColor: `${color}15` }]}>
                        <Ionicons name={icon} size={20} color={color} />
                    </View>
                </View>

                {/* Grid */}
                {secondaryStats.length > 0 && (
                    <View style={styles.secondaryGrid}>
                        {secondaryStats.map((stat, idx) => (
                            <View key={idx} style={styles.secondaryItem}>
                                <Text style={styles.secondaryLabel}>{stat.label}</Text>
                                <Text style={styles.secondaryValue}>{stat.value}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Chart */}
                <View style={styles.chartContainer}>
                    {chartType === 'pie' ? (
                        <View style={styles.pieContainer}>
                            <PieChart
                                data={chartData}
                                donut
                                radius={55}
                                innerRadius={40}
                                innerCircleColor={'#F8FAFC'}
                                focusOnPress
                                sectionAutoFocus
                                centerLabelComponent={() => (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, color: color, fontWeight: 'bold' }}>Total</Text>
                                    </View>
                                )}
                            />
                            {/* Legend */}
                            <View style={styles.pieLegend}>
                                {chartData.map((item: any, index: number) => (
                                    <View key={index} style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                        <Text style={styles.legendText}>{item.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <BarChart
                            data={chartData}
                            barWidth={10}
                            spacing={14}
                            height={110}
                            roundedTop
                            roundedBottom={false}
                            hideRules
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisTextStyle={{ color: '#94A3B8', fontSize: 9 }}
                            noOfSections={3}
                            maxValue={chartType === 'aging' ? 500 : 60}
                            isAnimated
                            renderTooltip={renderTooltip}
                            leftShiftForTooltip={0}
                            autoShiftTooltip
                            initialSpacing={10}
                        />
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#F1F5F9' }]}>
            {/* Standard App Header - Restored */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
                        <Ionicons name="menu" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Dashboard</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <MetricCard
                    title="Sales"
                    icon="bar-chart"
                    color="#2563EB"
                    stats={salesStats}
                    chartData={salesData}
                />

                <MetricCard
                    title="Profit"
                    icon="trending-up"
                    color="#059669"
                    stats={profitStats}
                    chartData={profitData}
                />

                <MetricCard
                    title="Payment Receipts"
                    icon="wallet"
                    color="#7C3AED"
                    stats={receiptsStats}
                    chartData={receiptsData}
                />

                {/* Split Row: Aging & Top Products */}
                <View style={styles.splitRow}>
                    {/* Aging Report - Bar Chart */}
                    <View style={styles.splitCard}>
                        <View style={styles.splitHeader}>
                            <Text style={styles.splitTitle}>Aging Report</Text>
                        </View>
                        <View style={styles.splitChartContainer}>
                            <BarChart
                                data={agingBarData}
                                barWidth={12}
                                spacing={12}
                                width={screenWidth / 2 - 50}
                                height={100}
                                roundedTop
                                hideRules
                                xAxisThickness={0}
                                yAxisThickness={0}
                                yAxisTextStyle={{ color: '#94A3B8', fontSize: 8 }}
                                noOfSections={3}
                                maxValue={500}
                                isAnimated
                                initialSpacing={10}
                                xAxisLabelTextStyle={{ color: '#64748B', fontSize: 8 }}
                            />
                        </View>
                    </View>

                    {/* Top 5 Products */}
                    <View style={styles.splitCard}>
                        <View style={styles.splitHeader}>
                            <Text style={styles.splitTitle}>Top 5 Products</Text>
                        </View>
                        <View style={styles.splitChartContainer}>
                            <PieChart
                                data={topProducts}
                                donut
                                radius={40}
                                innerRadius={28}
                                innerCircleColor={'#F8FAFC'}
                                centerLabelComponent={() => (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 9, color: '#64748B', fontWeight: 'bold' }}>Top 5</Text>
                                    </View>
                                )}
                            />
                            {/* Mini Legend */}
                            <View style={styles.miniLegend}>
                                {topProducts.map((item, index) => (
                                    <View key={index} style={styles.miniLegendItem}>
                                        <View style={[styles.miniDot, { backgroundColor: item.color }]} />
                                        <Text style={styles.miniLegendText}>{item.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>
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
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuBtn: {
        marginRight: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    mainBlockRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    mainBlockRowCenter: {
        alignItems: 'center',
    },
    iconBubble: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 0,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    mainValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    mainValueTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    secondaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        padding: 8,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    secondaryItem: {
        width: '33.33%',
        marginBottom: 4,
        paddingRight: 4,
    },
    secondaryLabel: {
        fontSize: 9,
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 0,
    },
    secondaryValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    chartContainer: {
        marginTop: 0,
        alignItems: 'center',
    },
    pieContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    pieLegend: {
        justifyContent: 'center',
        marginLeft: 8,
        flex: 1,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    legendDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    legendText: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '500',
    },
    // Split Row Styles
    splitRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    splitCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    splitHeader: {
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingBottom: 4,
    },
    splitTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    splitChartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    productList: {
        marginTop: 2,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    productInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 4,
    },
    productDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    productName: {
        fontSize: 10,
        color: '#475569',
        fontWeight: '500',
        flex: 1,
    },
    productValue: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0F172A',
    },
    // Mini Legend for Split Card
    miniLegend: {
        marginTop: 12,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    miniLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    miniDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    miniLegendText: {
        fontSize: 9,
        color: '#64748B',
        fontWeight: '500',
    }
});

export default HomeScreen;
