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
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: '#94A3B8',
            }}
        >
            <Tab.Screen
                name="TabHome"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? "home" : "home-outline"} size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TabSearch"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="magnify" size={26} color={color} />
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
                            <MaterialCommunityIcons name={focused ? "bell" : "bell-outline"} size={26} color={color} />
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
                        <MaterialCommunityIcons name={focused ? "account" : "account-outline"} size={26} color={color} />
                    ),
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
                { label: 'Shipments', icon: 'ferry', screen: 'Dashboard' },
                { label: 'Quotations', icon: 'file-document-edit-outline', screen: 'Dashboard' },
                { label: 'Orders', icon: 'clipboard-list-outline', screen: 'Dashboard' },
                { label: 'Inventory', icon: 'warehouse', screen: 'Dashboard' },
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { label: 'Invoices', icon: 'receipt', screen: 'Dashboard' },
                { label: 'Payments', icon: 'credit-card-outline', screen: 'Dashboard' },
                { label: 'Purchase Orders', icon: 'file-sign', screen: 'Dashboard' },
            ]
        },
        {
            title: 'ADMIN',
            items: [
                { label: 'Users', icon: 'account-group-outline', screen: 'Users' },
                { label: 'Settings', icon: 'cog-outline', screen: 'Profile' },
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
                                    props.navigation.navigate(item.screen);
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
            <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
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
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E1',
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
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
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        height: Platform.OS === 'ios' ? 82 : 56,
        paddingTop: 6,
        paddingBottom: Platform.OS === 'ios' ? 22 : 6,
        ...Platform.select({
            web: { boxShadow: '0 -2px 10px rgba(0,0,0,0.03)' },
            default: { elevation: 8 },
        }),
    },
    tabIcon: {
        fontSize: 24,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 0,
    },
    tabBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2563EB',
    }
});

export default AppNavigator;
