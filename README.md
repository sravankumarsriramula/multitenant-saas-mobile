# EXIM SaaS Mobile App

A React Native mobile application built with Expo that connects to the same backend API as the web application.

## Features

- 🔐 **Authentication**: Login and registration with JWT tokens
- 📦 **Products Management**: View, create, update, and delete products
- 🏢 **Companies Management**: Manage company records
- 👥 **Roles Management**: Handle user roles
- 👤 **Users Management**: Manage users within your tenant
- 📝 **Form Builder**: Create dynamic forms
- 📋 **Dynamic Forms**: Fill and manage dynamic form data
- 🔄 **Multi-tenant Support**: Full tenant isolation
- 💾 **Offline Storage**: AsyncStorage for token persistence

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **API Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Storage**: AsyncStorage

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- iOS Simulator (for Mac) or Android Emulator
- Expo Go app (for testing on physical devices)

## Installation

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoint:
   - Open `src/constants/config.ts`
   - Update `API_BASE_URL` with your backend URL
   - For local development on physical device, use your computer's IP address:
     ```typescript
     export const API_BASE_URL = 'http://192.168.1.XXX:3000/api';
     ```

## Running the App

### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open the Expo DevTools in your browser.

### Run on iOS Simulator (Mac only)
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Run on Physical Device

1. Install Expo Go app from App Store or Play Store
2. Scan the QR code shown in the terminal or Expo DevTools
3. Make sure your device is on the same network as your development machine

## Project Structure

```
mobile/
├── src/
│   ├── api/              # API service layer
│   │   ├── client.ts     # Axios configuration
│   │   ├── auth.ts       # Authentication API
│   │   ├── products.ts   # Products API
│   │   ├── master.ts     # Master data API (companies, roles, users)
│   │   └── forms.ts      # Form builder & dynamic entities API
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   ├── screens/          # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── ProductsScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── store/           # State management (Zustand)
│   │   └── authStore.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/       # App constants and configuration
│   │   └── config.ts
│   └── utils/           # Utility functions
├── App.tsx              # Root component
├── app.json            # Expo configuration
└── package.json        # Dependencies

```

## API Configuration

The mobile app uses the same backend API as the web application. Ensure your backend is running and accessible.

### Backend Setup

1. Start the API server:
   ```bash
   cd ../api
   npm run dev
   ```

2. The API should be running on `http://localhost:3000`

### Network Configuration

For testing on physical devices:

1. Find your computer's local IP address:
   - **Windows**: `ipconfig` (look for IPv4 Address)
   - **Mac/Linux**: `ifconfig` or `ip addr`

2. Update `src/constants/config.ts`:
   ```typescript
   export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api';
   ```

3. Ensure your firewall allows connections on port 3000

## Authentication Flow

1. User logs in or registers
2. JWT token is received from the backend
3. Token is stored in AsyncStorage
4. Token is automatically attached to all API requests via Axios interceptor
5. On app restart, token is loaded from AsyncStorage
6. If token is invalid (401 response), user is logged out automatically

## Adding New Screens

To add a new screen:

1. Create the screen component in `src/screens/`
2. Add the route type to `RootStackParamList` in `src/types/index.ts`
3. Register the screen in `src/navigation/AppNavigator.tsx`

Example:
```typescript
<Stack.Screen
  name="NewScreen"
  component={NewScreenComponent}
  options={{ title: 'New Screen' }}
/>
```

## Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Environment Variables

For production builds, consider using environment variables:

1. Install expo-constants:
   ```bash
   npm install expo-constants
   ```

2. Create `app.config.js`:
   ```javascript
   export default {
     expo: {
       extra: {
         apiUrl: process.env.API_URL || 'http://localhost:3000/api',
       },
     },
   };
   ```

3. Access in code:
   ```typescript
   import Constants from 'expo-constants';
   const API_URL = Constants.expoConfig?.extra?.apiUrl;
   ```

## Troubleshooting

### Cannot connect to API
- Verify the API is running
- Check the API_BASE_URL in config.ts
- Ensure your device/emulator can reach the API
- For physical devices, use your computer's IP address, not localhost

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Dependencies issues
```bash
rm -rf node_modules
npm install
```

### iOS build issues
```bash
cd ios
pod install
cd ..
```

## Next Steps

1. **Add More Screens**: Implement remaining screens (Companies, Roles, Users, Forms, etc.)
2. **Form Builder**: Create mobile-friendly form builder interface
3. **Offline Support**: Implement offline data caching with React Query
4. **Push Notifications**: Add push notification support with Expo Notifications
5. **Biometric Auth**: Implement fingerprint/face ID authentication
6. **Dark Mode**: Add dark mode support
7. **Localization**: Add multi-language support

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on both iOS and Android
4. Submit a pull request

## License

Same as the main project.
