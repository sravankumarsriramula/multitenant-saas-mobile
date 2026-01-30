# 🚀 Quick Start - Local Testing

## Current Status

✅ **Mobile App Server**: Running (Expo)
✅ **Backend API**: Running on port 3000
✅ **Configuration**: Set to localhost

---

## 🌐 Test in Web Browser (Fastest!)

The Expo server is already running. To test in your browser:

### Option 1: Press Key in Terminal
In the terminal where `npm start` is running, press:
```
w
```

### Option 2: Open Browser Manually
Open your browser and go to:
```
http://localhost:8081
```

### What You'll See:
1. Browser opens
2. App loads (may take 10-20 seconds first time)
3. You'll see the **Login Screen**!

---

## 📱 Test in Android Emulator

### Prerequisites:
- Install Android Studio
- Create an Android Virtual Device (AVD)
- Start the emulator

### Run:
In the terminal where `npm start` is running, press:
```
a
```

**Note:** If you get connection errors, update `src/constants/config.ts`:
```typescript
export const API_BASE_URL = 'http://10.0.2.2:3000/api';
```

---

## 🍎 Test in iOS Simulator (Mac Only)

### Prerequisites:
- Install Xcode
- Install Xcode Command Line Tools

### Run:
In the terminal where `npm start` is running, press:
```
i
```

---

## 🧪 What to Test

### 1. Authentication
- [ ] Register a new user
  - Email: `test@example.com`
  - Password: `password123`
  - Name: `Test User`
  - Tenant ID: `tenant1`

- [ ] Login with credentials
- [ ] Logout

### 2. Products
- [ ] View products list
- [ ] Create a new product
- [ ] Update a product
- [ ] Delete a product

### 3. Navigation
- [ ] Navigate to different screens
- [ ] Back button works
- [ ] Home screen menu items work

---

## 🔄 Development Workflow

### Making Changes:

1. **Edit any file** in `mobile/src/`
2. **Save** (Ctrl+S)
3. **App reloads automatically** in browser/emulator
4. **See changes instantly!**

### Manual Reload:
Press `r` in the terminal

### Clear Cache:
```bash
# Stop server (Ctrl+C)
npm start -- --clear
```

---

## 📊 Current Setup

```
Terminal 1: Backend API
├─ Location: api/
├─ Command: npm run dev
├─ Status: ✅ Running
└─ URL: http://localhost:3000

Terminal 2: Mobile App
├─ Location: mobile/
├─ Command: npm start
├─ Status: ✅ Running
└─ URL: http://localhost:8081
```

---

## 🎯 Recommended: Start with Web

**Why?**
- ✅ Fastest to test
- ✅ Chrome DevTools available
- ✅ No emulator setup needed
- ✅ Instant reload

**How?**
Press `w` in the terminal where `npm start` is running!

---

## 🆘 Quick Troubleshooting

### App won't load in browser
- Check both terminals are running
- Press `r` to reload
- Clear cache: `npm start -- --clear`

### "Network request failed"
- Backend might not be running
- Check: http://localhost:3000 in browser
- Should see: `{"message":"EXIM SaaS API is running"}`

### Changes not showing
- Press `r` to reload manually
- Check file is saved
- Clear cache and restart

---

## 📚 Full Documentation

- **LOCAL_TESTING_GUIDE.md** - Complete testing guide
- **SETUP_GUIDE.md** - Detailed setup instructions
- **EXPO_GO_GUIDE.md** - Physical device testing
- **ARCHITECTURE.md** - System architecture

---

## ✅ Next Steps

1. **Press `w`** in terminal to open in browser
2. **Test login/register** functionality
3. **Test products** CRUD operations
4. **Make changes** and see live updates
5. **Set up emulator** for mobile testing (optional)

---

**Ready! Press `w` to start testing in your browser! 🎉**
