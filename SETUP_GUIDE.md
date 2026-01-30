# Mobile App Setup Guide

This guide will help you set up and run the EXIM SaaS mobile application.

## Quick Start

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure API Endpoint

Edit `src/constants/config.ts` and update the API URL:

**For Emulator/Simulator:**
```typescript
export const API_BASE_URL = 'http://localhost:3000/api';
```

**For Physical Device:**
```typescript
export const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000/api';
```

To find your IP address:
- **Windows**: Run `ipconfig` in Command Prompt
- **Mac/Linux**: Run `ifconfig` or `ip addr` in Terminal

### 3. Start the Backend API

Make sure your backend is running:

```bash
cd ../api
npm run dev
```

### 4. Start the Mobile App

```bash
cd ../mobile
npm start
```

Then:
- Press `i` for iOS simulator (Mac only)
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Overview

### Architecture

```
┌─────────────────┐
│  Mobile App     │
│  (React Native) │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend API   │
│   (Express.js)  │
└────────┬────────┘
         │
         │
┌────────▼────────┐
│   Database      │
│   (PostgreSQL)  │
└─────────────────┘
```

### Key Features Implemented

✅ **Authentication**
- Login with email/password
- User registration
- JWT token management
- Automatic token refresh
- Persistent login (AsyncStorage)

✅ **Products Management**
- List all products
- View product details
- Create new products
- Update existing products
- Delete products
- Pull-to-refresh

✅ **Navigation**
- Stack navigation
- Authentication-based routing
- Deep linking support (ready)

✅ **State Management**
- Zustand for auth state
- React Query for server state
- AsyncStorage for persistence

✅ **API Integration**
- Axios client with interceptors
- Automatic token injection
- Error handling
- Request/response logging

### Folder Structure Explained

```
mobile/
├── src/
│   ├── api/                    # API Layer
│   │   ├── client.ts          # Axios configuration & interceptors
│   │   ├── auth.ts            # Authentication endpoints
│   │   ├── products.ts        # Products endpoints
│   │   ├── master.ts          # Companies, Roles, Users endpoints
│   │   └── forms.ts           # Form Builder & Dynamic Entities
│   │
│   ├── components/            # Reusable UI Components
│   │   ├── Button.tsx         # Custom button with variants
│   │   ├── Input.tsx          # Form input with validation
│   │   └── Loading.tsx        # Loading indicator
│   │
│   ├── screens/               # Screen Components
│   │   ├── LoginScreen.tsx    # Login page
│   │   ├── RegisterScreen.tsx # Registration page
│   │   ├── HomeScreen.tsx     # Dashboard/Home
│   │   └── ProductsScreen.tsx # Products list
│   │
│   ├── navigation/            # Navigation Setup
│   │   └── AppNavigator.tsx   # Main navigation container
│   │
│   ├── store/                 # State Management
│   │   └── authStore.ts       # Authentication state (Zustand)
│   │
│   ├── types/                 # TypeScript Definitions
│   │   └── index.ts           # All type definitions
│   │
│   ├── constants/             # App Constants
│   │   └── config.ts          # Configuration values
│   │
│   └── utils/                 # Utility Functions
│
├── App.tsx                    # Root component
├── app.json                   # Expo configuration
└── package.json              # Dependencies
```

## Development Workflow

### 1. Making API Calls

All API calls should go through the service layer in `src/api/`:

```typescript
import { productApi } from '../api/products';

// In your component
const fetchProducts = async () => {
  try {
    const products = await productApi.getAll();
    setProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### 2. Adding New Screens

**Step 1:** Create the screen component in `src/screens/`

```typescript
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

const NewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
};

export default NewScreen;
```

**Step 2:** Add route type in `src/types/index.ts`

```typescript
export type RootStackParamList = {
  // ... existing routes
  NewScreen: undefined; // or { id: string } if it needs params
};
```

**Step 3:** Register in `src/navigation/AppNavigator.tsx`

```typescript
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ title: 'New Screen' }}
/>
```

### 3. Using State Management

**Auth State (Zustand):**

```typescript
import { useAuthStore } from '../store/authStore';

const MyComponent = () => {
  const { user, login, logout } = useAuthStore();
  
  // Use user data
  console.log(user?.name);
  
  // Login
  await login({ email, password });
  
  // Logout
  await logout();
};
```

**Server State (React Query):**

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '../api/products';

const MyComponent = () => {
  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
  });
  
  // Mutate data
  const mutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      // Refetch or update cache
    },
  });
};
```

## Testing

### Testing on Emulator

**iOS Simulator (Mac only):**
1. Install Xcode from App Store
2. Run `npm run ios`

**Android Emulator:**
1. Install Android Studio
2. Create an AVD (Android Virtual Device)
3. Run `npm run android`

### Testing on Physical Device

1. Install Expo Go:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Make sure your phone and computer are on the same WiFi network

3. Update API URL in `src/constants/config.ts` with your computer's IP

4. Run `npm start` and scan the QR code

## Common Issues & Solutions

### Issue: Cannot connect to API

**Solution:**
1. Check if backend is running (`npm run dev` in api folder)
2. Verify API_BASE_URL in `src/constants/config.ts`
3. For physical devices, use your computer's IP, not `localhost`
4. Check firewall settings - allow port 3000

### Issue: Metro bundler cache issues

**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Dependencies not installing

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: iOS build fails

**Solution:**
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Android build fails

**Solution:**
1. Clean gradle cache:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```
2. Rebuild:
   ```bash
   npm run android
   ```

## Next Steps

### Screens to Implement

1. **Companies Screen** - List and manage companies
2. **Roles Screen** - Manage user roles
3. **Users Screen** - User management
4. **Form Builder Screen** - Create dynamic forms
5. **Dynamic Forms Screen** - Fill dynamic forms
6. **Profile Screen** - User profile and settings
7. **Product Detail Screen** - View/edit single product

### Features to Add

1. **Offline Support**
   - Cache data with React Query
   - Queue mutations when offline
   - Sync when back online

2. **Push Notifications**
   - Install expo-notifications
   - Set up notification handlers
   - Request permissions

3. **Biometric Authentication**
   - Install expo-local-authentication
   - Add fingerprint/face ID login

4. **Dark Mode**
   - Create theme context
   - Add theme toggle
   - Update all styles

5. **Image Upload**
   - Install expo-image-picker
   - Add camera/gallery access
   - Upload to backend

6. **Search & Filters**
   - Add search functionality
   - Implement filters
   - Sort options

## Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS IPA

```bash
# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview
```

### App Store / Play Store Submission

1. Update app.json with proper metadata
2. Create app icons and splash screens
3. Build production version
4. Submit to stores

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native](https://reactnative.dev/)

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check the main project README
4. Contact the development team
