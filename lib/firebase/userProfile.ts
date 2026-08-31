import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

export interface UserProfile {
    name: string;
    occupation: string;
    gender: string;
    location: string;
    bio: string;
    updatedAt?: string;
}

const PROFILE_KEY_PREFIX = 'mcz_mock_profile_';

function isBrowser() {
    return typeof window !== 'undefined';
}

function mockGetProfile(uid: string): UserProfile | null {
    if (!isBrowser()) return null;
    try {
        const raw = window.localStorage.getItem(PROFILE_KEY_PREFIX + uid);
        return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
        return null;
    }
}

function mockSaveProfile(uid: string, profile: UserProfile): void {
    if (!isBrowser()) return;
    window.localStorage.setItem(PROFILE_KEY_PREFIX + uid, JSON.stringify(profile));
}

/**
 * Fetches a user's extended profile (name, occupation, bio, etc). Uses real
 * Firestore when configured, otherwise a localStorage-backed mock — so the
 * Profile Settings page works with zero external setup.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!isFirebaseConfigured) {
        return mockGetProfile(uid);
    }
    try {
        const profileRef = doc(db, 'userProfiles', uid);
        const profileSnap = await getDoc(profileRef);
        return profileSnap.exists() ? (profileSnap.data() as UserProfile) : null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}

export async function saveUserProfile(uid: string, profile: UserProfile): Promise<void> {
    const withTimestamp = { ...profile, updatedAt: new Date().toISOString() };
    if (!isFirebaseConfigured) {
        mockSaveProfile(uid, withTimestamp);
        return;
    }
    const profileRef = doc(db, 'userProfiles', uid);
    await setDoc(profileRef, withTimestamp, { merge: true });
}
