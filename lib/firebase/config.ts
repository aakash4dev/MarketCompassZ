import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { isRealValue } from '@/lib/env';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Placeholder values ship in .env.example / .env.local so the repo boots without
 * any setup. We detect them here so the rest of the app can gracefully fall back
 * to a local (localStorage-backed) mock of Auth + Firestore — see lib/mock/*.
 *
 * To go live: create a real Firebase project, enable Authentication (Google) and
 * Firestore, then put the real values in .env.local. Once NEXT_PUBLIC_FIREBASE_API_KEY
 * stops looking like a placeholder, the app automatically switches to real Firebase.
 */
export const isFirebaseConfigured: boolean =
    isRealValue(firebaseConfig.apiKey) &&
    isRealValue(firebaseConfig.projectId) &&
    isRealValue(firebaseConfig.appId);

// Initialize Firebase (safe even with placeholder values — the SDK only talks to
// the network once an actual auth/firestore call is made, which we guard against
// via isFirebaseConfigured before ever reaching real Firebase code paths).
let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
} else if (typeof window !== 'undefined') {
    // Keep a harmless dummy app around so any accidental direct import of `auth`/`db`
    // doesn't crash at module-eval time. All real calls are gated behind isFirebaseConfigured.
    app = !getApps().length ? initializeApp({ apiKey: 'demo', projectId: 'demo-project', appId: 'demo' }) : getApps()[0];
}

export const auth: Auth = (authInstance = app ? getAuth(app) : (null as unknown as Auth));
export const db: Firestore = (dbInstance = app ? getFirestore(app) : (null as unknown as Firestore));

// Initialize Analytics (only in browser, only with real config)
export const analytics: Analytics | null =
    typeof window !== 'undefined' && isFirebaseConfigured && app ? getAnalytics(app) : null;

export default app;
