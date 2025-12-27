# 🎯 Quick Setup Guide - Visual Walkthrough

Follow these 3 simple steps to complete your MarketCompassZ setup!

---

## Step 1: Enable Firebase Authentication (2 minutes)

### 1.1 Go to Firebase Console

🔗 **[Open Firebase Console](https://console.firebase.google.com/)**

### 1.2 Select Your Project
- Look for **"marketcompass-47d8e"** in the project list
- Click on it to open

### 1.3 Navigate to Authentication
- In the left sidebar, click **"Build"** or **"Authentication"**
- Click **"Get Started"** if you see it

### 1.4 Enable Google Sign-In
1. Click on the **"Sign-in method"** tab
2. Find **"Google"** in the providers list
3. Click on **"Google"**
4. Toggle the **"Enable"** switch to ON
5. **Important**: Set a support email (select your email from dropdown)
6. Click **"Save"**

✅ **Done!** Google Sign-In is now enabled.

---

## Step 2: Create Firestore Database (2 minutes)

### 2.1 Navigate to Firestore
- In the same Firebase Console sidebar
- Click **"Firestore Database"** under "Build"

### 2.2 Create Database
1. Click **"Create database"** button
2. Choose mode:
   - **For Hackathon/Development**: Select **"Start in test mode"**
   - **For Production**: Select **"Start in production mode"**
3. Click **"Next"**

### 2.3 Select Location
1. Choose location closest to you:
   - **For India**: Select **"asia-south1 (Mumbai)"**
   - **For US**: Select **"us-central1 (Iowa)"**
2. Click **"Enable"**

⏳ Wait 30-60 seconds for database creation...

✅ **Done!** Firestore is ready.

---

## Step 3: Get Google Maps API Key (5 minutes)

### 3.1 Go to Google Cloud Console

🔗 **[Open Google Cloud Console](https://console.cloud.google.com/)**

### 3.2 Select Your Project
- At the top of the page, click the **project dropdown**
- Select **"marketcompass-47d8e"** (same as Firebase)

### 3.3 Enable Billing (Required for Maps API)

> ⚠️ Don't worry! You get **$300 free credits** + **$200/month for Maps**

1. Go to **[Billing](https://console.cloud.google.com/billing)**
2. If you see "Link a billing account":
   - Click **"Link a billing account"**
   - Click **"Create billing account"**
   - Enter your details (credit card required but won't be charged)
   - Google gives you **$300 free credits** for 90 days
3. If you already have billing: ✅ Skip to next step

### 3.4 Enable Places API

🔗 **[Go directly to Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)**

1. Make sure **"marketcompass-47d8e"** is selected at the top
2. Click the big blue **"ENABLE"** button
3. Wait 10-20 seconds for activation

✅ **Places API Enabled!**

### 3.5 Enable Additional Maps APIs (Optional but Recommended)

Enable these for full functionality:

1. **[Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)** - Click "ENABLE"
2. **[Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)** - Click "ENABLE" (for map display)

### 3.6 Create API Key

🔗 **[Go to Credentials](https://console.cloud.google.com/apis/credentials)**

1. Click **"+ CREATE CREDENTIALS"** at the top
2. Select **"API key"**
3. A popup shows your new API key - **COPY IT IMMEDIATELY**
4. Click **"RESTRICT KEY"** (recommended)

### 3.7 Restrict API Key (Recommended)

1. **Name your key**: "MarketCompassZ Maps API Key"
2. **Application restrictions** (for development):
   - Select **"None"** for now
   - After deployment, come back and add your domain
3. **API restrictions**:
   - Select **"Restrict key"**
   - Check these APIs:
     - ✅ Places API (New)
     - ✅ Geocoding API
     - ✅ Maps JavaScript API
4. Click **"SAVE"**

### 3.8 Copy Your API Key

Your key looks like: `AIzaSyABCDEF1234567890...`

**Add it to your `.env` file:**

```env
GOOGLE_MAPS_API_KEY=AIzaSyABCDEF1234567890_YOUR_ACTUAL_KEY
```

✅ **Done!** Maps API is configured.

---

## 🎉 Final Checklist

Before you start coding, verify:

- [x] **Firebase Authentication** - Google Sign-In enabled
- [x] **Firestore Database** - Created in test/production mode
- [x] **Google Cloud Billing** - Linked (using free credits)
- [x] **Places API** - Enabled
- [x] **API Key Created** - Copied to `.env` file
- [x] **API Key Restricted** - (Optional but recommended)

---

## 📝 Your Complete `.env` File

```env
# ============================================
# FIREBASE (You already have these)
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBKcwUm9-Qxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxx-47d8e.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxx-47d8e
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxx-47d8e.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=6346506xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=1:xxxxxxxxxxx:web:xxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-xxxxxxxxxxxxxx

# Firebase Admin SDK
FIREBASE_PROJECT_ID=marketcxxxxxxxxx
FIREBASE_PRIVATE_KEY_ID=d375c61da3bf53axxxxxxxxxxxxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR PRIVATE KEY]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminxxxxxxxx@marketcompass-47d8e.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=1003xxxxxxxxxxxxx

# ============================================
# GEMINI AI (You already have this)
# ============================================
GEMINI_API_KEY=xxxxxxxxxxxxxxxxxxx

# ============================================
# GOOGLE CLOUD
# ============================================
GOOGLE_CLOUD_PROJECT=marketcompass-47d8e
VERTEX_AI_LOCATION=us-central1

# ============================================
# GOOGLE MAPS (Add your new key here!)
# ============================================
GOOGLE_MAPS_API_KEY=YOUR_NEW_MAPS_API_KEY_HERE
```

---

## 🚀 Test Your Setup

1. **Restart your dev server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Go to localhost:3000**

3. **Click "Get Started" or "Login"**
   - You should see Google Sign-In working!

4. **Try the lead generation form**
   - Enter a niche and city
   - Click "Find Leads with AI"
   - (AI integration coming next!)

---

## ❓ Troubleshooting

### "Billing required" error
- Make sure you linked a billing account in Google Cloud Console
- You have $300 free credits, so no charges yet!

### "API not enabled" error
- Go back to the API Library and enable Places API
- Wait 1-2 minutes after enabling

### Google Sign-In not working
- Check that you selected a support email in Firebase Auth settings
- Make sure your domain is authorized (localhost should work by default)

### Can't find Firebase project
- Firebase project = Google Cloud project
- They share the same name: "marketcompass-47d8e"

---

## 💡 Quick Links

- 🔗 [Firebase Console](https://console.firebase.google.com/)
- 🔗 [Google Cloud Console](https://console.cloud.google.com/)
- 🔗 [API Library](https://console.cloud.google.com/apis/library)
- 🔗 [Credentials](https://console.cloud.google.com/apis/credentials)
- 🔗 [Billing](https://console.cloud.google.com/billing)

---

**Need help?** Let me know which step you're stuck on and I'll guide you through it! 🚀
