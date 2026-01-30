# 🖥️ Local Testing Guide

This guide will help you test the mobile app locally using emulators/simulators during development.

## 📋 Testing Options

You have several options for local testing:

1. **Web Browser** (Quickest - Start Here!) ✅
2. **Android Emulator** (Requires Android Studio)
3. **iOS Simulator** (Mac only - Requires Xcode)
4. **Expo Go on Physical Device** (For later)

---

## 🌐 Option 1: Web Browser (Recommended for Quick Testing)

The **fastest way** to test your app locally!

### Start Testing in Browser

The Expo server is already running. In the terminal, press:

```
Press w │ open web
```

Or open your browser and go to:
```
http://localhost:8081
```

### ✅ Pros:
- ✅ Instant - no setup needed
- ✅ Fast reload
- ✅ Chrome DevTools available
- ✅ Works on Windows/Mac/Linux

### ⚠️ Cons:
- ❌ Not 100% identical to mobile
- ❌ Some mobile-specific features won't work
- ❌ Different screen size

**Best for:** Testing logic, API calls, navigation, and basic UI

---

## 📱 Option 2: Android Emulator (Recommended for Windows)

Test on a virtual Android device.

### Prerequisites

1. **Install Android Studio**
   - Download: https://developer.android.com/studio
   - Install with default settings
   - This is ~3-4 GB download

2. **Set up Android Emulator**
   - Open Android Studio
   - Go to: Tools → Device Manager
   - Click "Create Device"
   - Choose a device (e.g., Pixel 5)
   - Choose a system image (e.g., Android 13 - API 33)
   - Click "Finish"

### Start Android Emulator

**Option A: From Android Studio**
1. Open Android Studio
2. Tools → Device Manager
3. Click ▶️ (Play) button next to your device

**Option B: From Terminal**
```bash
# List available emulators
emulator -list-avds

# Start emulator (replace with your AVD name)
emulator -avd Pixel_5_API_33
```

### Run Your App on Android

With the emulator running and Expo server running, press:

```
Press a │ open Android
```

Or in terminal:
```bash
npm run android
```

### 🔧 Android Emulator - Special Configuration

Android emulator uses a special IP for localhost:

If you get connection errors, update `src/constants/config.ts`:

```typescript
export const API_BASE_URL = __DEV__
    ? 'http://10.0.2.2:3000/api' // Android emulator special localhost
    : 'https://your-production-api.com/api';
```

**Why?** Android emulator's `10.0.2.2` maps to your computer's `localhost`.

### ✅ Pros:
- ✅ Real Android experience
- ✅ Test Android-specific features
- ✅ Accurate screen size
- ✅ Works on Windows

### ⚠️ Cons:
- ❌ Requires Android Studio (~4GB)
- ❌ Slower than web
- ❌ Uses more RAM

---

## 🍎 Option 3: iOS Simulator (Mac Only)

Test on a virtual iPhone/iPad.

### Prerequisites

1. **Install Xcode** (Mac only)
   - Open App Store
   - Search for "Xcode"
   - Install (this is ~12 GB!)
   - Open Xcode once to complete setup

2. **Install Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```

### Run Your App on iOS

With Expo server running, press:

```
Press i │ open iOS
```

Or in terminal:
```bash
npm run ios
```

This will:
1. Start iOS Simulator
2. Build and install your app
3. Open the app automatically

### ✅ Pros:
- ✅ Real iOS experience
- ✅ Test iOS-specific features
- ✅ Accurate screen size
- ✅ Fast and smooth

### ⚠️ Cons:
- ❌ Mac only
- ❌ Requires Xcode (~12GB)
- ❌ First build takes time

---

## 🚀 Quick Start Guide

### Step 1: Start Backend API

Open a terminal:
```bash
cd api
npm run dev
```

Keep this running! You should see:
```
Server is running on port 3000
```

### Step 2: Start Mobile App

Open a **new terminal**:
```bash
cd mobile
npm start
```

You'll see the Expo menu with options.

### Step 3: Choose Your Testing Method

**For Quick Testing (Web):**
- Press `w` in terminal
- Browser opens automatically
- Start testing!

**For Android Emulator:**
1. Start Android emulator first
2. Press `a` in terminal
3. Wait for app to build and install

**For iOS Simulator (Mac):**
1. Press `i` in terminal
2. Simulator starts automatically
3. Wait for app to build and install

---

## 🔄 Development Workflow

### Making Changes

1. Edit any file in `mobile/src/`
2. Save the file (Ctrl+S)
3. App automatically reloads!
4. See changes instantly ⚡

### Manual Reload

If auto-reload doesn't work:
- Press `r` in terminal
- Or shake device/emulator and tap "Reload"

### Clear Cache

If you see weird errors:
```bash
# Stop the server (Ctrl+C)
# Then restart with cache clear
npm start -- --clear
```

---

## 🧪 Testing Checklist

### Test Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token persists after app restart
- [ ] Logout works

### Test Products
- [ ] View products list
- [ ] Create new product
- [ ] Update product
- [ ] Delete product
- [ ] Pull to refresh

### Test Navigation
- [ ] Navigate between screens
- [ ] Back button works
- [ ] Deep linking (if implemented)

### Test API Integration
- [ ] API calls succeed
- [ ] Error handling works
- [ ] Loading states show
- [ ] Network errors handled

---

## 🐛 Troubleshooting

### Issue: "Unable to resolve module"

**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear cache and restart
npm start -- --clear
```

### Issue: "Network request failed"

**Solution:**
1. Check backend is running (`npm run dev` in api folder)
2. Verify API URL in `src/constants/config.ts`
3. For Android emulator, use `http://10.0.2.2:3000/api`
4. For iOS simulator, use `http://localhost:3000/api`

### Issue: Android emulator won't start

**Solution:**
1. Open Android Studio
2. Tools → Device Manager
3. Delete old emulator
4. Create new emulator
5. Try again

### Issue: "Expo Go" vs "Development Build"

**Current Setup:** You're using Expo Go (managed workflow)

If you see this option, stick with Expo Go for now:
```
› Using Expo Go
› Press s │ switch to development build
```

### Issue: Metro bundler stuck

**Solution:**
```bash
# Kill all node processes
taskkill /F /IM node.exe

# Restart
cd mobile
npm start
```

---

## 📊 Performance Tips

### Faster Reload
- Enable Fast Refresh (should be on by default)
- Use web for quick UI testing
- Use emulator for final testing

### Reduce Build Time
- Close other apps to free RAM
- Use web browser for most development
- Only use emulator when testing mobile-specific features

### Save Battery/Resources
- Close emulator when not needed
- Use web browser for long development sessions
- Only run backend when testing API calls

---

## 🎯 Recommended Workflow

### For Daily Development:

1. **Start Backend** (Terminal 1)
   ```bash
   cd api
   npm run dev
   ```

2. **Start Mobile App** (Terminal 2)
   ```bash
   cd mobile
   npm start
   ```

3. **Test in Browser** (Press `w`)
   - Fast iteration
   - Quick testing
   - Chrome DevTools

4. **Test in Emulator** (Periodically)
   - Before committing code
   - Testing mobile-specific features
   - Final verification

### For Final Testing:

1. Test on Android emulator
2. Test on iOS simulator (if Mac)
3. Test on physical device with Expo Go
4. Test all features end-to-end

---

## 📱 Current Configuration

```typescript
// mobile/src/constants/config.ts
export const API_BASE_URL = 'http://localhost:3000/api'; // ✅ Set for local testing
```

**For Android Emulator:** Change to `http://10.0.2.2:3000/api`
**For Physical Device:** Change to `http://192.168.0.6:3000/api`

---

## 🎨 What to Test

### Core Features
1. **Authentication Flow**
   - Login screen
   - Registration
   - Token persistence
   - Auto-login on restart

2. **Products Management**
   - List products
   - View details
   - Create/Edit/Delete
   - Pull to refresh

3. **Navigation**
   - Screen transitions
   - Back navigation
   - Deep linking

4. **UI/UX**
   - Responsive layout
   - Loading states
   - Error messages
   - Form validation

---

## ✅ Next Steps

1. **Start with Web** - Press `w` to test in browser
2. **Test Core Features** - Login, products, navigation
3. **Set up Emulator** - Install Android Studio or Xcode
4. **Test on Emulator** - More realistic testing
5. **Iterate** - Make changes and see live updates

---

## 🆘 Need Help?

**Common Commands:**
- `r` - Reload app
- `m` - Toggle menu
- `j` - Open debugger
- `w` - Open in web browser
- `a` - Open in Android emulator
- `i` - Open in iOS simulator
- `?` - Show all commands
- `Ctrl+C` - Stop server

**Documentation:**
- `README.md` - Overview
- `SETUP_GUIDE.md` - Detailed setup
- `EXPO_GO_GUIDE.md` - Expo Go instructions
- `ARCHITECTURE.md` - System architecture

---

**Ready to start testing! Press `w` in the terminal to open in your browser! 🚀**
