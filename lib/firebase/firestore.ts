import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { mockSaveLead, mockSubscribeToLeads } from '@/lib/mock/mockLeads';

export interface Lead {
    id?: string;
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
    createdAt: string; // ISO string — normalized here so UI code never touches Firestore internals
}

const LEADS_COLLECTION = 'leads';

/**
 * Saves a lead against the current user. Uses real Firestore when configured
 * (see lib/firebase/config.ts: isFirebaseConfigured), otherwise falls back to
 * a localStorage-backed mock (lib/mock/mockLeads.ts) so lead capture works
 * with zero external setup.
 */
export const saveLead = async (lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> => {
    if (!isFirebaseConfigured) {
        return mockSaveLead(lead);
    }
    try {
        const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
            ...lead,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving lead:', error);
        throw error;
    }
};

/**
 * Subscribes to real-time updates for a user's leads. Uses Firestore's
 * onSnapshot when configured, otherwise a CustomEvent-based mock listener
 * that gives the same "instant update" UX from localStorage.
 */
export const subscribeToLeads = (
    userId: string,
    callback: (leads: Lead[]) => void
): (() => void) => {
    if (!isFirebaseConfigured) {
        return mockSubscribeToLeads(userId, callback);
    }

    const q = query(
        collection(db, LEADS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(
        q,
        (snapshot) => {
            const leads: Lead[] = [];
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const createdAt = data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate().toISOString()
                    : new Date().toISOString();
                leads.push({ id: docSnap.id, ...data, createdAt } as Lead);
            });
            callback(leads);
        },
        (error) => {
            console.error('Error subscribing to leads:', error);
            callback([]);
        }
    );
};
