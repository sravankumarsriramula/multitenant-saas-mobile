# Building APK for Android

This guide will help you build an APK file for your EXIM SaaS mobile app.

## Prerequisites

1. **Expo Account**: You need an Expo account (free)
   - Sign up at: https://expo.dev/signup
   - Or login: `npx expo login`

2. **EAS CLI**: Install EAS (Expo Application Services) CLI
   ```bash
   npm install -g eas-cli
   ```

## Build Methods

### Method 1: EAS Build (Recommended - Cloud Build)

This is the easiest and recommended method. Expo builds your app in the cloud.

#### Step 1: Login to Expo
```bash
npx expo login
```

#### Step 2: Configure EAS Build
```bash
cd mobile
eas build:configure
```

This will create an `eas.json` file in your project.

#### Step 3: Build APK
```bash
# Build APK (for testing/distribution outside Play Store)
eas build -p android --profile preview

# OR build AAB (for Google Play Store)
eas build -p android --profile production
```

**What happens:**
- Your code is uploaded to Expo's servers
- The app is built in the cloud
- You'll get a download link when it's ready (usually 10-20 minutes)

#### Step 4: Download APK
- You'll receive a link in the terminal
- Or check: https://expo.dev/accounts/[your-account]/projects/exim-saas-mobile/builds

---

### Method 2: Local Build (Advanced)

If you want to build locally, you need Android Studio and the Android SDK.

#### Prerequisites:
1. Install Android Studio
2. Set up Android SDK
3. Configure environment variables (ANDROID_HOME)

#### Build Command:
```bash
npx expo run:android --variant release
```

---

## Build Profiles Explained

### Preview Profile (APK - For Testing)
- Creates an APK file
- Can be installed directly on Android devices
- Good for testing and sharing with testers
- **Use this for now**

### Production Profile (AAB - For Play Store)
- Creates an Android App Bundle (AAB)
- Required for Google Play Store submission
- Smaller download size for users
- **Use this when publishing to Play Store**

---

## Quick Start Commands

```bash
# 1. Login to Expo
npx expo login

# 2. Navigate to mobile directory
cd mobile

# 3. Configure EAS (first time only)
eas build:configure

# 4. Build APK for testing
eas build -p android --profile preview

# 5. Wait for build to complete and download the APK
```

---

## Troubleshooting

### Issue: "Not logged in"
**Solution:**
```bash
npx expo login
```

### Issue: "Project not configured"
**Solution:**
```bash
eas build:configure
```

### Issue: "Build failed"
**Solution:**
- Check the build logs at expo.dev
- Common issues:
  - Missing app.json configuration
  - Invalid package name
  - Dependency conflicts

### Issue: "APK too large"
**Solution:**
- Use production build (creates AAB)
- Remove unused dependencies
- Enable Hermes engine (already enabled in your app.json)

---

## After Building

### Installing APK on Device

1. **Download the APK** from the Expo build page
2. **Transfer to your phone** (via USB, email, or cloud storage)
3. **Enable "Install from Unknown Sources"** in Android settings
4. **Tap the APK file** to install

### Testing the APK

1. Install on your device
2. Open the app
3. Test all features:
   - Login/Register
   - Dashboard
   - Users screen
   - Navigation
   - API calls

---

## Build Configuration (eas.json)

The `eas.json` file will be created automatically, but here's what it looks like:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

---

## Next Steps

1. **Build APK**: Use the preview profile for testing
2. **Test thoroughly**: Install and test on multiple devices
3. **Prepare for Play Store**: 
   - Create app icons (512x512 for Play Store)
   - Write app description
   - Take screenshots
   - Create privacy policy
4. **Build AAB**: Use production profile for Play Store submission

---

## Useful Links

- **Expo Build Dashboard**: https://expo.dev/accounts/[your-account]/projects
- **EAS Build Documentation**: https://docs.expo.dev/build/introduction/
- **Android App Signing**: https://docs.expo.dev/app-signing/app-credentials/

---

## Cost

- **Free Tier**: 30 builds per month
- **Paid Plans**: Available if you need more builds

---

## Alternative: Development Build

If you want to test without building a full APK:

```bash
# Create a development build
eas build --profile development --platform android

# Then use Expo Go or the dev client to test
```
