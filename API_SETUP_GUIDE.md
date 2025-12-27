# Complete API Setup Guide for MarketCompassZ

This guide will walk you through getting all required API keys and enabling necessary Firebase features.

## 🔥 Firebase Setup (Already Done ✅)

You mentioned you've already initialized Firebase. Here's what you need to enable:

### Required Firebase Services

1. **Firebase Authentication**
   - Go to Firebase Console → Authentication
   - Click "Get Started"
   - Enable **Google Sign-In**:
     - Click "Google" provider
     - Toggle "Enable"
     - Set support email
     - Click "Save"
   - Enable **Email/Password** (optional for email auth):
     - Click "Email/Password"
     - Toggle "Enable"
     - Click "Save"

2. **Cloud Firestore**
   - Go to Firebase Console → Firestore Database
   - Click "Create database"
   - Choose "Start in **production mode**" (or test mode for development)
   - Select location closest to your users
   - Click "Enable"

3. **Firebase Storage** (Optional - for lead exports/attachments)
   - Go to Firebase Console → Storage
   - Click "Get started"
   - Choose security rules mode
   - Click "Done"

### Firebase Configuration ✅
You already have these from your Firebase project (stored in your `.env` file):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# ... (check your .env file for complete list)
```

---

## 🗝️ Google Cloud Platform (GCP) Setup

### Step 1: Create/Access Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **Option A**: Link your existing Firebase project
   - Your Firebase project is already a GCP project
   - Select it from the project dropdown at the top
   
3. **Option B**: If you don't see it, enable Firebase integration:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click your project settings (gear icon)
   - Go to "Service accounts" tab
   - Click "Manage service account permissions in Google Cloud Console"

### Step 2: Enable Billing (Required for Vertex AI)

> ⚠️ **Important**: Vertex AI requires a billing account. You can use the free trial ($300 credit).

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Click "Link a billing account"
3. Create a new billing account or link an existing one
4. Google gives you **$300 free credits** for new accounts

### Step 3: Get Vertex AI Setup

#### Enable Vertex AI API

1. Go to [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com)
2. Make sure your project is selected
3. Click **"Enable"**
4. Wait 1-2 minutes for activation

#### Get Vertex AI Credentials

**Option 1: Use Gemini API Key (Recommended for Hackathon)**

For the hackathon, you can use the **Gemini API** directly instead of Vertex AI:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Select your project or create a new one
4. Copy the API key and store it in your `.env` file

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Option 2: Vertex AI Service Account (Production)**

If you want to use Vertex AI instead:

1. Go to [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click **"Create Service Account"**
3. Name: `vertex-ai-service`
4. Grant role: **"Vertex AI User"**
5. Click **"Done"**
6. Click on the created service account
7. Go to **"Keys"** tab → Add Key → Create new key → JSON
8. Download the JSON file
9. Store it securely (DON'T commit to Git!)

```env
GOOGLE_CLOUD_PROJECT=marketcompass-47d8e
VERTEX_AI_LOCATION=us-central1
# Path to service account JSON
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

---

## 🗺️ Google Maps API Setup

### Step 1: Enable Google Maps APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `marketcompass-47d8e`
3. Go to [APIs & Services → Library](https://console.cloud.google.com/apis/library)
4. Search and enable these APIs:
   - ✅ **Places API (New)** - For finding businesses
   - ✅ **Maps JavaScript API** - For map display (optional)
   - ✅ **Geocoding API** - For location conversion

### Step 2: Create Maps API Key

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **"Create Credentials"** → "API Key"
3. Copy the API key immediately
4. Click **"Restrict Key"** (recommended):
   - **Application restrictions**:
     - For development: Choose "None" temporarily
     - For production: Choose "HTTP referrers" and add your domain
   - **API restrictions**:
     - Select "Restrict key"
     - Check: Places API, Maps JavaScript API, Geocoding API
5. Click "Save"

```env
GOOGLE_MAPS_API_KEY=YOUR_MAPS_API_KEY_HERE
```

### Step 3: Enable Billing for Maps

> ⚠️ Maps API also requires billing, but you get **$200 free monthly credit** for Maps.

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link the same billing account
3. You're covered by free tier for development!

---

## 📝 Complete .env File

Here's your complete `.env` file template with **PLACEHOLDERS** (replace with your actual keys):

```env
# ============================================
# FIREBASE CONFIGURATION
# ============================================
# Get these from Firebase Console → Project Settings → General
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# Firebase Admin SDK (Backend Only)
# Get these from Firebase Console → Project Settings → Service Accounts
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id_here

# ============================================
# GEMINI AI
# ============================================
# Get from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# ============================================
# GOOGLE CLOUD / VERTEX AI
# ============================================
GOOGLE_CLOUD_PROJECT=your-project-id
VERTEX_AI_LOCATION=us-central1

# ============================================
# GOOGLE MAPS API
# ============================================
# Get from: Google Cloud Console → APIs & Services → Credentials
GOOGLE_MAPS_API_KEY=your_maps_api_key_here
```

> ⚠️ **SECURITY WARNING**: Never commit your `.env` file to Git! It's already in `.gitignore`.

---

## 🎯 Quick Start Checklist

### For Hackathon (Minimum Required):

- [x] **Firebase Auth** - Enable Google Sign-In
- [x] **Firestore** - Enable database
- [x] **Gemini API Key** - You have it! ✅
- [ ] **Google Maps API** - Get from Cloud Console
  - Enable Places API
  - Create API key
  - Enable billing (uses free tier)

### For Production (Full Features):

- [ ] **Vertex AI** - Enable API + Service Account
- [ ] **Maps Additional APIs** - Geocoding, Maps JavaScript
- [ ] **Firebase Storage** - For file uploads
- [ ] **API Restrictions** - Lock down API keys

---

## 💡 Pro Tips

1. **For the Hackathon**: You can get started with just:
   - Firebase (you have it)
   - Gemini API (you have it)
   - Google Maps API (get in 5 minutes)

2. **Cost Management**:
   - Maps: $200 free/month credit
   - Gemini API: Free tier available
   - Vertex AI: Included in $300 GCP credit

3. **Security**:
   - Add `.env` to `.gitignore` (already done)
   - Never commit API keys
   - Use environment variables in Vercel/production

4. **Testing**:
   - Start with unrestricted API keys during development
   - Add restrictions before going live

---

## 🚀 Next Steps

1. ✅ Commit and push (doing this now)
2. ⬜ Enable **Firebase Authentication** (Google Sign-In)
3. ⬜ Enable **Cloud Firestore**
4. ⬜ Get **Google Maps API key**
5. ⬜ Test the lead generation form
6. ⬜ Deploy to Vercel

Let me know when you're ready for the next step!
