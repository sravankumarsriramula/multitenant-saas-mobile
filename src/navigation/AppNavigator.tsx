import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShipmentsScreen from '../screens/ShipmentsScreen';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// --- COMPONENTS ---

const MenuBadge = ({ count, color = '#EF4444' }: { count: number, color?: string }) => (
    <View style={[styles.badgeContainer, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{count}</Text>
    </View>
);

// --- NAVIGATORS ---

// 1. Bottom Tab Navigator
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: true,
                tabBarLabelPosition: 'below-icon', // Force label below icon
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: '#1E3A8A', // Deep Blue
                tabBarInactiveTintColor: '#94A3B8',
                // Ensure visible items split space evenly but don't force centering which might clip text
                tabBarItemStyle: {
                    flex: 1,
                },
            }}
        >
            <Tab.Screen
                name="TabHome"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? "view-dashboard" : "view-dashboard-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Shipments"
                component={ShipmentsScreen}
                options={{
                    tabBarLabel: 'Shipments',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="truck-delivery" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TabNotifications"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Ionicons name={focused ? "notifications" : "notifications-outline"} size={24} color={color} />
                            <View style={styles.tabBadge} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="TabProfile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />

            {/* Hidden Tabs (Moved to end to prevent layout gaps) */}
            {/* Hidden Tabs (Moved to end to prevent layout gaps) */}
            <Tab.Screen
                name="TabSearch"
                component={HomeScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' },
                    tabBarLabel: 'Search'
                }}
            />
            <Tab.Screen
                name="Users"
                component={UsersScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' }, // Double ensure no space is taken
                    tabBarLabel: 'Users'
                }}
            />
        </Tab.Navigator>
    );
};

// 2. Custom Drawer Content
const CustomDrawerContent = (props: any) => {
    const { user, logout } = useAuthStore();
    const [menuVisible, setMenuVisible] = React.useState(false);

    const sections = [
        {
            title: 'OPERATIONS',
            items: [
                { label: 'Dashboard', icon: 'view-dashboard-outline', screen: 'TabHome' },
                { label: 'Shipments', icon: 'ferry', screen: 'Shipments' },
                { label: 'Quotations', icon: 'file-document-edit-outline', screen: 'TabHome' },
                { label: 'Orders', icon: 'clipboard-list-outline', screen: 'TabHome' },
                { label: 'Inventory', icon: 'warehouse', screen: 'TabHome' },
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { label: 'Invoices', icon: 'receipt', screen: 'TabHome' },
                { label: 'Payments', icon: 'credit-card-outline', screen: 'TabHome' },
                { label: 'Purchase Orders', icon: 'file-sign', screen: 'TabHome' },
            ]
        },
        {
            title: 'ADMIN',
            items: [
                { label: 'Users', icon: 'account-group-outline', screen: 'Users' },
                { label: 'Settings', icon: 'cog-outline', screen: 'TabProfile' },
            ]
        }
    ];

    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <View style={styles.drawerRoot}>
            {/* Brand Header */}
            <View style={styles.brandHeader}>
                <View style={{ marginRight: 12 }}>
                    <SvgUri
                        width="32"
                        height="32"
                        uri="https://genericdemo.expodite.co.in/signatures/assets/images/Expodite_Logo_Menu.svg"
                    />
                </View>
                <Text style={styles.brandTitle}>EXIM SAAS</Text>
            </View>

            {/* Menu Items */}
            <ScrollView
                style={styles.menuScroll}
                contentContainerStyle={styles.menuScrollContent}
                showsVerticalScrollIndicator={false}
            >
                {sections.map((section, idx) => (
                    <View key={idx} style={styles.menuSection}>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        {section.items.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.menuItem}
                                onPress={() => {
                                    // Navigate to the Dashboard (TabNavigator) and then to the specific screen
                                    props.navigation.navigate('Dashboard', { screen: item.screen });
                                    props.navigation.closeDrawer();
                                }}
                                activeOpacity={0.6}
                            >
                                <View style={styles.menuItemLeft}>
                                    <MaterialCommunityIcons name={item.icon as any} size={22} color="#475569" style={styles.menuItemIcon} />
                                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.drawerFooter}>
                <TouchableOpacity style={styles.footerItem} onPress={logout}>
                    <MaterialCommunityIcons name="logout" size={22} color="#EF4444" style={{ marginRight: 12 }} />
                    <Text style={styles.footerLabel}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// 3. Drawer Navigator
const MainDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#FFFFFF',
                    width: '65%', // Tighter width
                },
                drawerType: 'front',
                overlayColor: 'rgba(15, 23, 42, 0.8)', // Darker overlay
                swipeEnabled: true,
            }}
        >
            <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
            {/* Other screens are now inside BottomTabNavigator to preserve the tab bar */}
            {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
};

// 4. Root App Navigator
const AppNavigator: React.FC = () => {
    const { isAuthenticated, isLoading, loadUser } = useAuthStore();

    useEffect(() => {
        loadUser();
    }, []);

    if (isLoading) return <Loading message="Loading..." />;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <Stack.Screen name="App" component={MainDrawerNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    // Drawer Styles
    drawerRoot: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    brandHeader: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#1E3A8A', // Deep Blue
        borderBottomWidth: 1,
        borderBottomColor: '#1E3A8A',
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },

    // Menu Content
    menuScroll: {
        flex: 1,
    },
    menuScrollContent: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    menuSection: {
        marginBottom: 8,
    },
    sectionHeader: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        marginBottom: 2,
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemIcon: {
        marginRight: 10,
    },
    menuItemLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155',
        marginRight: 8,
    },
    badgeContainer: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#1E293B',
    },

    // Footer
    drawerFooter: {
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    footerLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#EF4444',
    },

    // Bottom Tab Bar
    // Bottom Tab Bar
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        height: Platform.OS === 'ios' ? 88 : 68, // Standard height
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 28 : 8, // Balanced padding
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    tabIcon: {
        // Not used directly but good to have
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 4, // Ensure it sits up from bottom
    },
    tabBadge: {
        position: 'absolute',
        top: -1,
        right: -1,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    }
});

export default AppNavigator;
