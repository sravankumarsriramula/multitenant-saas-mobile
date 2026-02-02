import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    FlatList,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';

const { width } = Dimensions.get('window');
// Calculate item width for 2 columns with padding
const GAP = 12;
const PADDING = 16;
const ITEM_WIDTH = (width - (PADDING * 2) - GAP) / 2;

const ReportsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();

    const reportItems = [
        { label: 'Quotations', screen: 'Quotations' },
        { label: 'Orders', screen: 'Orders' },
        { label: 'Sales Order Report', screen: null },
        { label: 'Sales Invoice Report', screen: null },
        { label: 'Payments', screen: 'Payments' },
        { label: 'Invoice Payments Due', screen: null },
        { label: 'Product Sales', screen: null },
        { label: 'Inventory', screen: null },
        { label: 'Shipments', screen: 'Shipments' },
        { label: 'Client Status Report', screen: null },
        { label: 'Export Register', screen: null },
        { label: 'Insurance Report', screen: null },
        { label: 'Forex Gain/Loss Report', screen: null },
        { label: 'Forex Gain/Loss Report(Grouped)', screen: null },
        { label: 'Duty Drawback Report', screen: null },
        { label: 'RoDTEP Report', screen: null },
        { label: 'eBRC Status', screen: null },
    ];

    const handlePress = (item: any) => {
        // Navigate to the generic report grid view for all items as per requirements
        navigation.navigate('ReportView', { reportTitle: item.label });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
        >
            <Text style={styles.cardText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reports</Text>
            </View>

            <FlatList
                data={reportItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.label}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{ gap: GAP }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9', // Light background like the image seems to imply or standard dashboard gray
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        backgroundColor: '#1E3A8A', // Deep Blue to match app header
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
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
        gap: GAP,
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: ITEM_WIDTH,
        minHeight: 80, // Ensure enough touch target and visual substance
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        // Shadow for "card" look
        ...Platform.select({
            android: { elevation: 2 },
            default: {
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 2 }
            }
        }),
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155', // Slate-700
    },
});

export default ReportsScreen;
