'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/firebase/auth';
import AuthButton from '@/components/AuthButton';

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                router.push('/dashboard');
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
                {/* Logo/Title */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <img
                            src="/logo.svg"
                            alt="MarketCompassZ Logo"
                            className="w-20 h-20 md:w-24 md:h-24 animate-pulse-slow"
                        />
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        MarketCompassZ 🧭
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Autonomous Lead Generation for Developers
                    </p>
                </div>

                {/* Description */}
                <div className="glass rounded-2xl p-8 max-w-2xl mx-auto space-y-4">
                    <p className="text-lg text-gray-200">
                        Stop manually searching for clients. Let our <span className="text-primary-400 font-semibold">AI Agent</span> powered by
                        <span className="text-accent-400 font-semibold"> Google ADK</span> autonomously find businesses without websites.
                    </p>
                    <p className="text-gray-400">
                        Just enter a niche and city. We&apos;ll scan Google Maps, identify businesses without digital presence,
                        and deliver ready-to-pitch leads directly to your dashboard.
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="card">
                        <div className="text-4xl mb-3">🤖</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-300">AI-Powered</h3>
                        <p className="text-gray-400 text-sm">Google ADK with Gemini 1.5 Pro for intelligent lead discovery</p>
                    </div>
                    <div className="card">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-300">Real-Time Updates</h3>
                        <p className="text-gray-400 text-sm">Leads appear instantly on your dashboard as they&apos;re found</p>
                    </div>
                    <div className="card">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-300">Targeted Search</h3>
                        <p className="text-gray-400 text-sm">Specify your niche and location for precise results</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <AuthButton isSignedIn={false} />
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500 pt-8">
                    Built for <a href="https://www.commudle.com/communities/tensorflow-delhi/events/genai-hackathon-delhi"
                        target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">
                        GenAI Hackathon Delhi
                    </a>
                    <br />
                    by <span className="text-accent-400">Aakash Singh Rajput</span>
                </div>
            </div>
        </main>
    );
}
