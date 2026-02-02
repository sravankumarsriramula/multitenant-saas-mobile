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

// Ultra-Compact 3-Column Layout
const GAP = 8; // Tighter gap
const PADDING = 12; // Reduced Screen Padding
// Width calculation
const ITEM_WIDTH = (width - (PADDING * 2) - (GAP * 2)) / 3;

const AdminScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { theme } = useThemeStore();

    const adminItems = [
        { label: 'Company', icon: 'domain', screen: null, color: '#2563EB', group: 'Org' },
        { label: 'Sub Orgs', icon: 'sitemap', screen: null, color: '#2563EB', group: 'Org' },
        { label: 'Addresses', icon: 'map-marker-multiple', screen: null, color: '#2563EB', group: 'Org' },

        { label: 'Roles', icon: 'badge-account-horizontal', screen: 'Roles', color: '#7C3AED', group: 'People' },
        { label: 'Users', icon: 'account-group', screen: 'Users', color: '#7C3AED', group: 'People' },

        { label: 'Categories', icon: 'shape', screen: null, color: '#059669', group: 'Product' },
        { label: 'Products', icon: 'package-variant', screen: null, color: '#059669', group: 'Product' },
        { label: 'Carriers', icon: 'truck-delivery', screen: null, color: '#059669', group: 'Product' },
        { label: 'Packaging', icon: 'package-variant-closed', screen: null, color: '#059669', group: 'Product' },

        { label: 'Conversion', icon: 'swap-horizontal', screen: null, color: '#F59E0B', group: 'Finance' },
        { label: 'Inco Terms', icon: 'handshake', screen: null, color: '#F59E0B', group: 'Finance' },
        { label: 'Insurance', icon: 'shield-check', screen: null, color: '#F59E0B', group: 'Finance' },

        { label: 'Documents', icon: 'file-upload', screen: null, color: '#64748B', group: 'System' },
        { label: 'Settings', icon: 'cog', screen: null, color: '#64748B', group: 'System' },
    ];

    const handlePress = (item: any) => {
        if (item.screen) {
            navigation.navigate(item.screen);
            return;
        }
        navigation.navigate('GenericForm', { title: item.label });
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
                    <Text style={styles.headerTitle}>Admin Panel</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="search" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={adminItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.label}
                numColumns={3}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{ gap: GAP }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>Quick Access</Text>
                        <Text style={styles.listHeaderSubtitle}>Manage your organization settings</Text>
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
    // Ultra Compact Card
    card: {
        width: ITEM_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 4, // Very minimal side padding
        paddingVertical: 12,  // Decent vertical padding
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
        // Height is implicitly handled by padding + content, usually reducing perceived boxiness
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
        fontSize: 10, // Small, dense font
        fontWeight: '700',
        color: '#334155', // Slightly softer slate
        textAlign: 'center',
        lineHeight: 12,
    }
});

export default AdminScreen;
