/**
 * Local mock authentication.
 *
 * Used automatically whenever Firebase isn't configured (see lib/firebase/config.ts:
 * isFirebaseConfigured), so the whole app — sign in, sign up, profile, dashboard —
 * works with zero external setup. Everything is stored in the browser's localStorage
 * and mirrors the shape of the `AppUser` type used throughout the app.
 *
 * NOT for production use as-is: passwords are stored in plain text in localStorage.
 * Once you plug in a real Firebase project (see .env.local / API_SETUP_GUIDE.md),
 * this module is bypassed entirely and lib/firebase/auth.ts talks to real Firebase.
 */

export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    metadata: {
        creationTime?: string;
        lastSignInTime?: string;
    };
}

interface StoredAccount {
    uid: string;
    email: string;
    password: string; // plain text — mock only, see file header
    displayName: string;
    photoURL: string;
    createdAt: string;
}

const USERS_KEY = 'mcz_mock_users';
const SESSION_KEY = 'mcz_mock_session';
const AUTH_EVENT = 'mcz-auth-changed';

function isBrowser() {
    return typeof window !== 'undefined';
}

function readUsers(): Record<string, StoredAccount> {
    if (!isBrowser()) return {};
    try {
        return JSON.parse(window.localStorage.getItem(USERS_KEY) || '{}');
    } catch {
        return {};
    }
}

function writeUsers(users: Record<string, StoredAccount>) {
    if (!isBrowser()) return;
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeUid(email: string): string {
    return `mock_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

function avatarFor(seed: string): string {
    // DiceBear "initials" avatar — free, no API key required.
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;
}

function toAppUser(account: StoredAccount, lastSignInTime = new Date().toISOString()): AppUser {
    return {
        uid: account.uid,
        email: account.email,
        displayName: account.displayName,
        photoURL: account.photoURL,
        metadata: {
            creationTime: account.createdAt,
            lastSignInTime,
        },
    };
}

function setSession(uid: string | null) {
    if (!isBrowser()) return;
    if (uid) {
        window.localStorage.setItem(SESSION_KEY, uid);
    } else {
        window.localStorage.removeItem(SESSION_KEY);
    }
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
}

function getCurrentAccount(): StoredAccount | null {
    if (!isBrowser()) return null;
    const uid = window.localStorage.getItem(SESSION_KEY);
    if (!uid) return null;
    const users = readUsers();
    return users[uid] || null;
}

export async function mockSignInWithGoogle(): Promise<AppUser> {
    // Simulated Google account — since we have no real OAuth without credentials,
    // we sign the visitor in with a stable demo identity persisted in this browser.
    const email = 'demo.user@marketcompassz.app';
    const uid = makeUid(email);
    const users = readUsers();
    const existing = users[uid];
    const account: StoredAccount = existing || {
        uid,
        email,
        password: '',
        displayName: 'Demo User',
        photoURL: avatarFor('Demo User'),
        createdAt: new Date().toISOString(),
    };
    users[uid] = account;
    writeUsers(users);
    setSession(uid);
    return toAppUser(account);
}

export async function mockSignUpWithEmail(email: string, password: string): Promise<AppUser> {
    const uid = makeUid(email);
    const users = readUsers();
    if (users[uid]) {
        throw Object.assign(new Error('This email is already registered'), { code: 'auth/email-already-in-use' });
    }
    const displayName = email.split('@')[0];
    const account: StoredAccount = {
        uid,
        email,
        password,
        displayName,
        photoURL: avatarFor(displayName),
        createdAt: new Date().toISOString(),
    };
    users[uid] = account;
    writeUsers(users);
    setSession(uid);
    return toAppUser(account);
}

export async function mockSignInWithEmail(email: string, password: string): Promise<AppUser> {
    const uid = makeUid(email);
    const users = readUsers();
    const account = users[uid];
    if (!account) {
        throw Object.assign(new Error('No account found with this email'), { code: 'auth/user-not-found' });
    }
    if (account.password !== password) {
        throw Object.assign(new Error('Incorrect password'), { code: 'auth/wrong-password' });
    }
    account.password = password;
    users[uid] = account;
    writeUsers(users);
    setSession(uid);
    return toAppUser(account, new Date().toISOString());
}

export async function mockResetPassword(email: string): Promise<void> {
    // No real email service configured — this is a no-op that resolves successfully
    // so the UI flow doesn't break. Swap in a real email provider for production.
    void email;
    return Promise.resolve();
}

export async function mockSignOut(): Promise<void> {
    setSession(null);
}

export function mockOnAuthStateChange(callback: (user: AppUser | null) => void): () => void {
    if (!isBrowser()) {
        callback(null);
        return () => {};
    }

    const emit = () => {
        const account = getCurrentAccount();
        callback(account ? toAppUser(account) : null);
    };

    emit();
    window.addEventListener(AUTH_EVENT, emit);
    window.addEventListener('storage', emit);

    return () => {
        window.removeEventListener(AUTH_EVENT, emit);
        window.removeEventListener('storage', emit);
    };
}

export function getMockCurrentUser(): AppUser | null {
    const account = getCurrentAccount();
    return account ? toAppUser(account) : null;
}
