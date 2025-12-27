'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOut } from '@/lib/firebase/auth';
import { subscribeToLeads, Lead } from '@/lib/firebase/firestore';
import AuthButton from '@/components/AuthButton';
import LeadGenerationForm from '@/components/LeadGenerationForm';
import LeadsTable from '@/components/LeadsTable';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (!currentUser) {
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (user) {
            const unsubscribe = subscribeToLeads(user.uid, (newLeads) => {
                setLeads(newLeads);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen p-6">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-8">
                <div className="glass rounded-xl p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src="/logo.svg"
                            alt="MarketCompassZ Logo"
                            className="w-12 h-12 animate-pulse-slow"
                        />
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">MarketCompassZ 🧭</h1>
                            <p className="text-gray-400 mt-1">Welcome, {user.displayName || user.email}</p>
                        </div>
                    </div>
                    <AuthButton isSignedIn={true} onSignOut={handleSignOut} />
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto space-y-8">
                {/* Lead Generation Form */}
                <section className="glass rounded-xl p-8 animate-slide-up">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-300">Generate New Leads</h2>
                    <LeadGenerationForm userId={user.uid} />
                </section>

                {/* Leads Display */}
                <section className="glass rounded-xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-2xl font-semibold mb-6 text-primary-300">
                        Your Leads {leads.length > 0 && <span className="text-accent-400">({leads.length})</span>}
                    </h2>
                    <LeadsTable leads={leads} />
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-500">
                <p>© 2025 MarketCompassZ by Aakash Singh Rajput. Licensed under MIT.</p>
            </footer>
        </div>
    );
}
