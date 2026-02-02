# Bottom Navigation Bar Consistency Fix

## Issue
The bottom navigation bar (tab bar) was not showing on the QuotationDetailsScreen, making navigation inconsistent across the app.

## Root Cause
The `QuotationDetailsScreen` was registered in the root `Stack.Navigator` outside the main app flow, which meant it didn't have access to the `BottomTabNavigator` and its tab bar.

**Previous Structure:**
```
NavigationContainer
└── Stack.Navigator
    ├── Login Screen
    ├── Register Screen
    ├── App (MainDrawerNavigator)
    │   └── BottomTabNavigator
    │       ├── Dashboard
    │       ├── Shipments
    │       ├── Notifications
    │       ├── Profile
    │       └── Hidden tabs (Users, Orders, Quotations, etc.)
    └── QuotationDetails ❌ (Outside tab navigator - no bottom bar)
```

## Solution
Moved `QuotationDetailsScreen` into the `BottomTabNavigator` as a hidden tab, ensuring it has access to the bottom navigation bar while not showing an actual tab button.

**New Structure:**
```
NavigationContainer
└── Stack.Navigator
    ├── Login Screen
    ├── Register Screen
    └── App (MainDrawerNavigator)
        └── BottomTabNavigator
            ├── Dashboard
            ├── Shipments
            ├── Notifications
            ├── Profile
            └── Hidden tabs
                ├── Users
                ├── Orders
                ├── Quotations
                ├── Invoices
                ├── Payments
                ├── PurchaseOrders
                └── QuotationDetails ✅ (Inside tab navigator - has bottom bar)
```

## Changes Made

### File: `src/navigation/AppNavigator.tsx`

#### 1. Added QuotationDetails as Hidden Tab
```typescript
<Tab.Screen
    name="QuotationDetails"
    component={QuotationDetailsScreen}
    options={{
        tabBarButton: () => null,
        tabBarItemStyle: { display: 'none' },
        tabBarLabel: 'Quotation Details'
    }}
/>
```

#### 2. Removed from Root Stack Navigator
Removed the standalone registration:
```typescript
// REMOVED:
<Stack.Screen name="QuotationDetails" component={QuotationDetailsScreen} options={{ headerShown: false }} />
```

## Result

### Before:
- ❌ QuotationDetailsScreen had no bottom navigation bar
- ❌ Users couldn't quickly navigate to other sections from quotation details
- ❌ Inconsistent navigation experience

### After:
- ✅ QuotationDetailsScreen now shows the bottom navigation bar
- ✅ Users can navigate to Dashboard, Shipments, Notifications, or Profile from any screen
- ✅ Consistent navigation experience across all screens
- ✅ The tab bar is themed properly (light/dark mode support)

## Navigation Flow

Users can now:
1. Go to **Quotations** screen (from drawer menu)
2. Tap on a quotation to view **QuotationDetails**
3. Use the **bottom tab bar** to navigate to:
   - Dashboard
   - Shipments
   - Notifications
   - Profile
4. Or use the **back button** to return to Quotations

## Testing

To verify the fix:
1. Open the app
2. Navigate to Quotations (from drawer menu)
3. Tap on any quotation
4. **Verify:** Bottom navigation bar is visible at the bottom
5. **Verify:** You can tap on Dashboard, Shipments, Notifications, or Profile tabs
6. **Verify:** The tab bar uses the correct theme colors (light/dark)

## Additional Benefits

This approach:
- Maintains a single navigation paradigm
- Ensures all screens within the app have consistent navigation
- Makes it easier to add more detail screens in the future
- Keeps the bottom bar sticky across all authenticated screens
