import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';
import {
    mockSignInWithGoogle,
    mockSignUpWithEmail,
    mockSignInWithEmail,
    mockResetPassword,
    mockSignOut,
    mockOnAuthStateChange,
    AppUser,
} from '@/lib/mock/localAuth';

export type { AppUser } from '@/lib/mock/localAuth';

const googleProvider = new GoogleAuthProvider();

/** Normalizes a real Firebase `User` down to the app-wide `AppUser` shape. */
function toAppUser(user: User): AppUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
        },
    };
}

/**
 * All exports below transparently use real Firebase Authentication when
 * `isFirebaseConfigured` is true, and fall back to the localStorage-backed
 * mock in lib/mock/localAuth.ts otherwise. This lets the rest of the app
 * (Navigation, auth page, profile page, dashboard) call a single consistent
 * API regardless of whether a Firebase project is actually wired up.
 */
export const signInWithGoogle = async (): Promise<AppUser> => {
    if (!isFirebaseConfigured) return mockSignInWithGoogle();
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return toAppUser(result.user);
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

export const signUpWithEmail = async (email: string, password: string): Promise<AppUser> => {
    if (!isFirebaseConfigured) return mockSignUpWithEmail(email, password);
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return toAppUser(result.user);
    } catch (error) {
        console.error('Error signing up with email:', error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string): Promise<AppUser> => {
    if (!isFirebaseConfigured) return mockSignInWithEmail(email, password);
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return toAppUser(result.user);
    } catch (error) {
        console.error('Error signing in with email:', error);
        throw error;
    }
};

export const resetPassword = async (email: string): Promise<void> => {
    if (!isFirebaseConfigured) return mockResetPassword(email);
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

export const signOut = async (): Promise<void> => {
    if (!isFirebaseConfigured) return mockSignOut();
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

export const onAuthStateChange = (callback: (user: AppUser | null) => void): (() => void) => {
    if (!isFirebaseConfigured) return mockOnAuthStateChange(callback);
    return onAuthStateChanged(auth, (user) => callback(user ? toAppUser(user) : null));
};
