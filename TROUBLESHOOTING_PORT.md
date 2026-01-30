# 🔧 Fixing Port Conflict Issue

## Problem
Port 8081 is already in use by another Expo server.

## ✅ Solution - Clean Start

Follow these steps to start fresh:

### Step 1: Stop All Node Processes

Open **PowerShell** or **Command Prompt** and run:

```bash
taskkill /F /IM node.exe
```

This will stop all running Node.js processes (including old Expo servers).

### Step 2: Start Backend API

Open a **new terminal** and run:

```bash
cd d:\Sravan\Projects\multitenant-saas\api
npm run dev
```

You should see:
```
Server is running on port 3000
```

**Keep this terminal open!**

### Step 3: Start Mobile App

Open **another new terminal** and run:

```bash
cd d:\Sravan\Projects\multitenant-saas\mobile
npm start
```

Wait for it to load. You should see:
```
› Metro waiting on exp://localhost:8081
› Scan the QR code above with Expo Go
```

### Step 4: Test in Browser

Once the Expo server is running, press:
```
w
```

Or open your browser to:
```
http://localhost:8081
```

---

## 🎯 Alternative: Use Different Port

If port 8081 is still busy, you can use a different port:

```bash
cd mobile
npx expo start --port 8082
```

Then access at:
```
http://localhost:8082
```

---

## 🔍 Check What's Using Port 8081

To see what's using port 8081:

```bash
netstat -ano | findstr :8081
```

This will show the PID (Process ID). Then kill it:

```bash
taskkill /F /PID <PID_NUMBER>
```

---

## 📋 Recommended Terminal Setup

**Terminal 1: Backend**
```bash
cd d:\Sravan\Projects\multitenant-saas\api
npm run dev
```

**Terminal 2: Mobile App**
```bash
cd d:\Sravan\Projects\multitenant-saas\mobile
npm start
```

**Keep both terminals running!**

---

## ✅ Quick Commands Reference

**Stop all Node processes:**
```bash
taskkill /F /IM node.exe
```

**Start backend:**
```bash
cd api && npm run dev
```

**Start mobile:**
```bash
cd mobile && npm start
```

**Use different port:**
```bash
cd mobile && npx expo start --port 8082
```

**Clear Expo cache:**
```bash
cd mobile && npm start -- --clear
```

---

## 🆘 Still Having Issues?

### Issue: Port still in use after killing processes

**Solution:**
1. Restart your computer
2. Or use a different port: `npx expo start --port 8082`

### Issue: Expo won't start

**Solution:**
```bash
cd mobile
rm -rf node_modules
npm install
npm start
```

### Issue: Backend won't start

**Solution:**
Check if something else is using port 3000:
```bash
netstat -ano | findstr :3000
```

---

## 🎉 Once Running

When both servers are running:

1. **Backend**: http://localhost:3000
2. **Mobile**: http://localhost:8081 (or 8082)

Press `w` in the mobile terminal to test in browser!

---

**Need help? Check the other documentation files in the mobile folder.**

---

## 📱 Troubleshooting Android Connection (Physical Device)

### 1. "Not able to access exp://..."
This usually means your **Windows Firewall** is blocking the connection.

**Fix 1: Allow Node.js through Firewall**
1.  Press `Windows Key`, type **"Allow an app through Windows Firewall"**.
2.  Click **Change settings** (Shield icon).
3.  Scroll down to find **Node.js JavaScript Runtime**.
4.  Ensure **BOTH** the "Private" and "Public" checkboxes are checked.
5.  Click OK and try scanning the QR code again.

**Fix 2: Use Tunneling (Bypasses Firewall)**
If firewall settings are hard to change, try running Expo in Tunnel mode:
```bash
npx expo start --tunnel
```
*Note: This might be slower, but it works across different networks.*

### 2. "Network Error" / API Issues
If the app loads but you can't log in (Network Error), your phone can't reach the Backend API (Port 5000).

1.  Ensure `src/constants/config.ts` has your computer's **IP Address** (e.g., `192.168.0.6`), NOT `localhost`.
2.  Ensure your Backend Server is running.
3.  You might need to allow port `5000` through the Firewall as well.

### 3. Check Ports
Your terminal logs will say which port is used (e.g., `Waiting on http://localhost:8081`).
-   If it says **8081**, use `exp://192.168.0.6:8081`
-   If it says **8082**, use `exp://192.168.0.6:8082`
