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
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 16;
// 2 columns
const ITEM_WIDTH = (width - (PADDING * 2) - GAP) / 2;

const AdminScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { logout } = useAuthStore();
    const { theme } = useThemeStore();

    const adminItems = [
        { label: 'Company', icon: 'domain', screen: null },
        { label: 'Sub Organizations', icon: 'sitemap', screen: null },
        { label: 'Custom Addresses', icon: 'map-marker-multiple', screen: null },
        { label: 'Roles', icon: 'badge-account-horizontal', screen: 'Roles' },
        { label: 'Users', icon: 'account-group', screen: 'Users' },
        { label: 'Categories', icon: 'shape', screen: null },
        { label: 'Products', icon: 'package-variant', screen: null },
        { label: 'Carriers', icon: 'truck-delivery', screen: null },
        { label: 'Packaging', icon: 'package-variant-closed', screen: null },
        { label: 'Conversion Rates', icon: 'swap-horizontal', screen: null },
        { label: 'Inco Terms', icon: 'handshake', screen: null },
        { label: 'Insurance Percentage', icon: 'shield-percent', screen: null },
        { label: 'Upload Documents', icon: 'file-upload', screen: null },
        { label: 'Settings', icon: 'cog', screen: null },
    ];

    const handlePress = (item: any) => {
        if (item.screen) {
            navigation.navigate(item.screen);
            return;
        }
        // Navigate to the generic form view for data entry
        navigation.navigate('GenericForm', { title: item.label });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: '#000' }]}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: theme.backgroundTertiary }]}>
                <MaterialCommunityIcons name={item.icon as any} size={28} color={theme.primary} />
            </View>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color={theme.headerText} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Admin</Text>
            </View>

            <FlatList
                data={adminItems}
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    menuButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: PADDING,
        gap: GAP,
    },
    card: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 0.8, // Slightly shorter than square
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default AdminScreen;
