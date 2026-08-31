/**
 * Local mock Firestore for leads.
 *
 * Used automatically whenever Firebase isn't configured (see lib/firebase/config.ts:
 * isFirebaseConfigured), so lead capture + the dashboard's "real-time" feed work with
 * zero external setup. Everything is stored in the browser's localStorage, scoped per
 * userId, and mirrors the public shape of lib/firebase/firestore.ts's `Lead` type.
 *
 * "Real-time" updates are simulated with a CustomEvent, the same pattern used by
 * lib/mock/localAuth.ts, so every subscribed component in the tab updates instantly
 * whenever a lead is added — matching the UX of Firestore's onSnapshot listener.
 */

export interface MockLead {
    id: string;
    businessName: string;
    address: string;
    phone?: string;
    location: {
        lat: number;
        lng: number;
    };
    niche: string;
    city: string;
    hasWebsite: boolean;
    socialLinks?: string[];
    userId: string;
    createdAt: string; // ISO string
}

const LEADS_KEY = 'mcz_mock_leads';
const LEADS_EVENT = 'mcz-leads-changed';

function isBrowser() {
    return typeof window !== 'undefined';
}

function readAll(): MockLead[] {
    if (!isBrowser()) return [];
    try {
        return JSON.parse(window.localStorage.getItem(LEADS_KEY) || '[]');
    } catch {
        return [];
    }
}

function writeAll(leads: MockLead[]) {
    if (!isBrowser()) return;
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent(LEADS_EVENT));
}

export async function mockSaveLead(lead: Omit<MockLead, 'id' | 'createdAt'>): Promise<string> {
    const leads = readAll();
    const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const record: MockLead = { ...lead, id, createdAt: new Date().toISOString() };
    leads.unshift(record);
    writeAll(leads);
    return id;
}

export function mockSubscribeToLeads(userId: string, callback: (leads: MockLead[]) => void): () => void {
    if (!isBrowser()) {
        callback([]);
        return () => {};
    }

    const emit = () => {
        const leads = readAll()
            .filter((lead) => lead.userId === userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(leads);
    };

    emit();
    window.addEventListener(LEADS_EVENT, emit);
    window.addEventListener('storage', emit);

    return () => {
        window.removeEventListener(LEADS_EVENT, emit);
        window.removeEventListener('storage', emit);
    };
}

export function mockGetLeadsOnce(userId: string): MockLead[] {
    return readAll().filter((lead) => lead.userId === userId);
}
