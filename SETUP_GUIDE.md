# 🚀 Interactive Setup Guide - Let's Get Your Keys!

Follow along with me as we set up everything step by step.

---

## Part 1: Firebase Authentication (2 minutes)

### Step 1: Open Firebase Console

🔗 **[Click here to open Firebase Console](https://console.firebase.google.com/)**

1. **Sign in** with your Google account
2. You should see your project: **marketcompass-47d8e**
3. Click on it to open

### Step 2: Enable Google Sign-In

1. In the left sidebar, click **"Authentication"**
2. Click **"Get Started"** button (if you see it)
3. Click on the **"Sign-in method"** tab at the top
4. Find **"Google"** in the list of providers
5. Click on **"Google"**
6. Toggle the **"Enable"** switch to ON ✅
7. **Important**: Select your email from the "Support email" dropdown
8. Click **"Save"**

✅ **Done!** Google Sign-In is now enabled.

---

## Part 2: Create Firestore Database (2 minutes)

### Step 1: Navigate to Firestore

1. In the Firebase Console sidebar
2. Click **"Firestore Database"** (under "Build" section)

### Step 2: Create Database

1. Click the big **"Create database"** button
2. Choose **"Start in test mode"** (for development)
   - For production later, choose "production mode"
3. Click **"Next"**
4. Select location:
   - **For India**: Choose **"asia-south1 (Mumbai)"**
   - **For US**: Choose **"us-central1 (Iowa)"**
5. Click **"Enable"**

⏳ **Wait 30-60 seconds** for database creation...

✅ **Done!** Your Firestore database is ready.

### Step 3: Deploy Firestore Rules (Optional)

1. Click on the **"Rules"** tab
2. Copy the content from your local `firestore.rules` file
3. Paste it into the rules editor
4. Click **"Publish"**

---

## Part 3: Google Cloud & Billing Setup (5 minutes)

### Step 1: Open Google Cloud Console

🔗 **[Click here to open Google Cloud Console](https://console.cloud.google.com/)**

### Step 2: Select Your Project

1. At the **top of the page**, click the project dropdown
2. Find and select **"marketcompass-47d8e"**
   - This is the same project as your Firebase project

### Step 3: Enable Billing (Required for Maps API)

> ⚠️ **Don't worry!** You get **$300 free credits** for 90 days

🔗 **[Go directly to Billing](https://console.cloud.google.com/billing)**

**If you see "This project has no billing account":**

1. Click **"Link a billing account"**
2. Click **"Create billing account"**
3. Follow the steps:
   - Enter your **country**
   - Accept **terms of service**
   - Click **"Continue"**
4. Add payment method:
   - Enter **credit/debit card** details
   - Don't worry - you won't be charged automatically
   - Google gives you **$300 free credits**
5. Click **"Start my free trial"**

**If you already have a billing account:**
1. Select it from the list
2. Click **"Set account"**

✅ **Billing enabled!** You now have $300 free credits.

---

## Part 4: Enable Google Maps APIs (3 minutes)

### Step 1: Go to API Library

🔗 **[Click here to open API Library](https://console.cloud.google.com/apis/library)**

Make sure **"marketcompass-47d8e"** is selected at the top.

### Step 2: Enable Places API (New)

1. In the search box, type: **"Places API"**
2. Click on **"Places API (New)"**
3. Click the big blue **"ENABLE"** button
4. Wait 10-20 seconds for activation

✅ **Places API Enabled!**

### Step 3: Enable Geocoding API (Optional)

1. Click the **back arrow** or search again
2. Search for: **"Geocoding API"**
3. Click on it
4. Click **"ENABLE"**

✅ **Geocoding API Enabled!**

---

## Part 5: Create Google Maps API Key (3 minutes)

### Step 1: Go to Credentials

🔗 **[Click here to open Credentials](https://console.cloud.google.com/apis/credentials)**

### Step 2: Create API Key

1. Click **"+ CREATE CREDENTIALS"** at the top
2. Select **"API key"**
3. A popup appears with your new API key
4. **COPY THE KEY IMMEDIATELY** ⚠️

```
Example: AIzaSyABCDEF1234567890_your_actual_key
```

### Step 3: Restrict API Key (Recommended)

1. Click **"RESTRICT KEY"** in the popup
2. Give it a name: **"MarketCompassZ Maps API"**
3. **Application restrictions**:
   - For now, select **"None"**
   - After deployment, come back and add your domain
4. **API restrictions**:
   - Select **"Restrict key"**
   - Check these boxes:
     - ✅ **Places API (New)**
     - ✅ **Geocoding API**
     - ✅ **Maps JavaScript API** (if enabled)
5. Click **"SAVE"**

### Step 4: Add to .env File

Open your `.env` file and add:

```env
GOOGLE_MAPS_API_KEY=PASTE_YOUR_KEY_HERE
```

✨ **Example:**
```env
GOOGLE_MAPS_API_KEY=AIzaSyABCDEF1234567890_your_actual_key
```

---

## Part 6: Deploy Firestore Rules (2 minutes)

### Step 1: Go Back to Firebase Console

🔗 **[Firebase Console](https://console.firebase.google.com/)**

### Step 2: Navigate to Firestore Rules

1. Click on your project: **marketcompass-47d8e**
2. Go to **"Firestore Database"**
3. Click on the **"Rules"** tab

### Step 3: Add Security Rules

Copy and paste these rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, authenticated write
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.time < timestamp.date(2026, 1, 26);
    }
    
    // User profiles
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Leads - private to user
    match /leads/{leadId} {
      allow read, write: if request.auth != null && 
                            resource.data.userId == request.auth.uid;
    }
  }
}
```

Click **"Publish"**

✅ **Rules deployed!**

---

## 🎉 Final Checklist

Let's verify everything is set up:

- [ ] **Firebase Authentication** - Google Sign-In enabled
- [ ] **Firestore Database** - Created in test mode
- [ ] **Google Cloud Billing** - Linked ($300 credits)
- [ ] **Places API** - Enabled
- [ ] **Geocoding API** - Enabled (optional)
- [ ] **Maps API Key** - Created and restricted
- [ ] **API Key in .env** - Added to your .env file
- [ ] **Firestore Rules** - Deployed

---

## 🧪 Test Your Setup

### 1. Restart Dev Server

```bash
# Press Ctrl+C to stop
npm run dev
```

### 2. Test Authentication

1. Go to **http://localhost:3000**
2. Click **"Get Started"**
3. Try signing in with Google
4. You should see your name in the navbar!

### 3. Test AI Chat

1. On the homepage, try the AI chat
2. Type: "Find restaurants in Mumbai"
3. Click send
4. You should see mock results

---

## 💰 Cost Breakdown

**Free Tier Coverage:**

| Service | Free Tier | Your Usage (Est.) | Cost |
|---------|-----------|-------------------|------|
| **Google Cloud** | $300 credits (90 days) | Development | $0 |
| **Google Maps** | $200/month credit | ~$50/month | $0 |
| **Places API** | $32/1,000 requests | ~500 requests/month | $0 |
| **Firestore** | 1GB storage, 50K reads/day | Light usage | $0 |
| **Firebase Auth** | Unlimited | Light usage | $0 |

**Total**: **$0** for development & hackathon! 🎉

---

## 🆘 Troubleshooting

### "Billing required" error
✅ Make sure you linked a billing account in Google Cloud Console

### "API not enabled" error
✅ Go back to API Library and enable Places API, wait 1-2 minutes

### Google Sign-In not working
✅ Check that you selected a support email in Firebase Auth settings
✅ Make sure localhost is authorized (it should be by default)

### Can't find Firebase project in Google Cloud
✅ They're the same! Look for "marketcompass-47d8e"
✅ Make sure you're signed in with the same Google account

---

## 🎯 What's Next?

Once everything is set up:

1. **Integrate real AI** - Connect Gemini API to the chat
2. **Connect Google Maps** - Replace mock data with real searches
3. **Test lead generation** - Try finding actual businesses
4. **Deploy to Vercel** - Share your project with the world!

---

**Need help with any step?** Let me know which part you're stuck on! 🚀
