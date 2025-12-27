# MarketCompassZ Setup Instructions

## Step 1: Copy Environment Variables

Copy the `.env.local.example` file to create your `.env.local`:

```bash
cp .env.local.example .env.local
```

## Step 2: Add Missing API Keys

The Firebase client credentials are already configured. You need to add:

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project `market-compass-z` (or create it)
3. Enable **Places API** and **Geocoding API**
4. Create an API key under "Credentials"
5. Add to `.env.local`:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### Firebase Admin SDK (Optional - for server-side operations)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Settings → Service Accounts
3. Click "Generate New Private Key"
4. Download the JSON file
5. Extract these values to `.env.local`:
   ```
   FIREBASE_CLIENT_EMAIL=<from JSON file>
   FIREBASE_PRIVATE_KEY="<from JSON file, keep quotes>"
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 5: Test the Application

1. Click "Sign in with Google"
2. Enter a niche (e.g., "bakery") and city (e.g., "Delhi")
3. Click "Generate Leads"
4. Watch as leads appear in real-time!

## Important Notes

- **Firebase credentials** in `.env.local` are already configured
- The **NEXT_PUBLIC_** variables are **safe to expose** in client-side code (they're public by design)
- The **server-side keys** (FIREBASE_PRIVATE_KEY, GOOGLE_MAPS_API_KEY) must NEVER be committed
- `.env.local` is in `.gitignore` to protect your secrets
- For production deployment on Vercel, add all environment variables in the Vercel dashboard

## Firestore Setup

In Firebase Console, go to Firestore Database and create these indexes:

**Collection**: `leads`
- Composite index: `userId` (Ascending) + `createdAt` (Descending)

This enables efficient queries for user-specific leads in chronological order.
