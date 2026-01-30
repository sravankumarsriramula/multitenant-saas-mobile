# 📱 Expo Go Setup Guide

## What is Expo Go?

Expo Go is a free mobile app that lets you run your React Native app on your phone **without building** the app. Perfect for development and testing!

## ✅ Your Setup is Ready!

Your mobile app is already configured to work with Expo Go. Here's how to use it:

---

## 🚀 Step-by-Step Guide

### Step 1: Install Expo Go on Your Phone

Download from your app store:

**📱 iOS (iPhone/iPad)**
- Open App Store
- Search for "Expo Go"
- Install the app
- [Direct Link](https://apps.apple.com/app/expo-go/id982107779)

**🤖 Android**
- Open Play Store
- Search for "Expo Go"
- Install the app
- [Direct Link](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Make Sure You're on the Same WiFi

**IMPORTANT:** Your phone and computer must be on the **same WiFi network**!

- ✅ Computer WiFi: Connected
- ✅ Phone WiFi: Same network as computer
- ❌ Don't use mobile data on your phone

**Your Computer's IP:** `192.168.0.6` (already configured!)

### Step 3: Start the Backend API

Open a terminal and run:

```bash
cd api
npm run dev
```

You should see:
```
Server is running on port 3000
```

**Keep this terminal running!**

### Step 4: Start the Mobile App

Open a **new terminal** and run:

```bash
cd mobile
npm start
```

You'll see something like:

```
› Metro waiting on exp://192.168.0.6:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### Step 5: Scan the QR Code

**On Android:**
1. Open the **Expo Go** app
2. Tap **"Scan QR Code"**
3. Point your camera at the QR code in the terminal
4. Wait for the app to load

**On iOS (iPhone):**
1. Open the **Camera** app (not Expo Go!)
2. Point at the QR code in the terminal
3. Tap the notification that appears
4. It will open in Expo Go
5. Wait for the app to load

### Step 6: Use the App!

Once loaded, you should see the **Login Screen**!

**Test Credentials:**
- You can register a new account
- Or use existing credentials from your web app

---

## 🎯 What You'll See

1. **Login Screen** - Enter email and password
2. **Register Screen** - Create new account
3. **Home Screen** - Dashboard with menu items
4. **Products Screen** - View and manage products

---

## 🔄 Development Workflow

### Making Changes

1. Edit any file in `mobile/src/`
2. Save the file
3. The app will **automatically reload** on your phone!
4. See changes instantly ⚡

### Reload Manually

If auto-reload doesn't work:
- Shake your phone
- Tap "Reload" in the menu
- Or press `r` in the terminal

### View Logs

- Terminal shows console.log output
- Shake phone → "Debug Remote JS" for Chrome DevTools

---

## ⚠️ Troubleshooting

### Issue: "Unable to connect to server"

**Solution:**
1. Make sure backend is running (`npm run dev` in api folder)
2. Check that phone and computer are on same WiFi
3. Verify IP address is correct (192.168.0.6)
4. Try disabling firewall temporarily

### Issue: "Network request failed"

**Solution:**
1. Backend might not be running
2. Check Windows Firewall - allow port 3000
3. Restart the backend server

### Issue: QR code won't scan

**Solution:**
- Make terminal window bigger so QR code is larger
- Increase screen brightness
- On iOS, use Camera app (not Expo Go)
- On Android, use Expo Go app

### Issue: App loads but can't login

**Solution:**
1. Check backend is running
2. Open browser: `http://192.168.0.6:3000`
3. Should see: `{"message":"EXIM SaaS API is running"}`
4. If not, backend isn't accessible

### Issue: "Couldn't load exp://..."

**Solution:**
1. Close Expo Go completely
2. Restart `npm start` in mobile folder
3. Scan QR code again

---

## 🔥 Hot Tips

### Faster Development

1. **Keep terminals open:**
   - Terminal 1: Backend (`cd api && npm run dev`)
   - Terminal 2: Mobile (`cd mobile && npm start`)

2. **Use shortcuts:**
   - Press `r` to reload
   - Press `m` to toggle menu
   - Press `j` to open debugger

3. **Shake to debug:**
   - Shake your phone
   - Access developer menu
   - Enable "Fast Refresh"

### Testing on Multiple Devices

You can test on multiple phones simultaneously:
1. Install Expo Go on all devices
2. Scan the same QR code
3. All devices will run the app!

---

## 📊 Current Configuration

```typescript
// mobile/src/constants/config.ts
export const API_BASE_URL = 'http://192.168.0.6:3000/api';
```

**This is already set up for you!** ✅

---

## 🎨 What's Next?

Now that you have Expo Go working:

1. **Test the app** - Try login, products, etc.
2. **Make changes** - Edit screens and see live updates
3. **Add features** - Build more screens
4. **Customize UI** - Update styles and components

---

## 📱 Expo Go vs Production Build

| Feature | Expo Go | Production Build |
|---------|---------|------------------|
| Installation | Free app from store | Build your own app |
| Development | ✅ Perfect | Not needed |
| Testing | ✅ Instant | Slow (rebuild needed) |
| Distribution | ❌ Can't share | ✅ Can publish to stores |
| Custom Native Code | ❌ Limited | ✅ Full access |
| Speed | Fast enough | Faster |

**For now, use Expo Go for development!** When ready to publish, we'll build the production app.

---

## 🆘 Need Help?

If you encounter issues:

1. Check this guide
2. Verify backend is running
3. Confirm same WiFi network
4. Check firewall settings
5. Restart everything

---

## ✅ Quick Checklist

Before scanning QR code:

- [ ] Expo Go installed on phone
- [ ] Phone and computer on same WiFi
- [ ] Backend running (`cd api && npm run dev`)
- [ ] Mobile app started (`cd mobile && npm start`)
- [ ] QR code visible in terminal
- [ ] Ready to scan!

---

**You're all set! Scan the QR code and start developing! 🚀**
