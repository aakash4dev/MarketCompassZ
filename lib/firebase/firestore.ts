import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp,
    DocumentData,
} from 'firebase/firestore';
import { db } from './config';

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
    createdAt: Timestamp;
}

const LEADS_COLLECTION = 'leads';

export const saveLead = async (lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> => {
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

export const subscribeToLeads = (
    userId: string,
    callback: (leads: Lead[]) => void
): (() => void) => {
    const q = query(
        collection(db, LEADS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const leads: Lead[] = [];
        snapshot.forEach((doc) => {
            leads.push({ id: doc.id, ...doc.data() } as Lead);
        });
        callback(leads);
    });
};
