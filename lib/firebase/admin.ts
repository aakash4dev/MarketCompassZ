import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        // We allow initialization without credentials for development/testing if no private key is set
        if (process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        } else {
            console.warn("Initializing Firebase Admin with application default credentials (or local mock)");
            admin.initializeApp();
        }
    } catch (error: any) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export default admin;
