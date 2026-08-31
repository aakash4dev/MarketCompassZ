'use client';

import { useState } from 'react';
import { saveLead } from '@/lib/firebase/firestore';

interface LeadGenerationFormProps {
    userId: string;
    onLeadsAdded?: (count: number) => void;
}

export default function LeadGenerationForm({ userId, onLeadsAdded }: LeadGenerationFormProps) {
    const [niche, setNiche] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!niche.trim() || !city.trim()) {
            setMessage('Please enter both niche and city');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/generate-leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    niche: niche.trim(),
                    city: city.trim(),
                    userId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const leads = data.leads || [];

                // Persist each discovered lead. Uses real Firestore when configured,
                // otherwise the localStorage-backed mock (lib/mock/mockLeads.ts) — either
                // way, subscribed listeners (the dashboard) update in real time.
                await Promise.all(
                    leads.map((lead: any) =>
                        saveLead({
                            businessName: lead.businessName,
                            address: lead.address,
                            phone: lead.phone,
                            location: lead.location,
                            niche: lead.niche || niche.trim(),
                            city: lead.city || city.trim(),
                            hasWebsite: false,
                            userId,
                        })
                    )
                );

                if (leads.length > 0) {
                    setMessage(
                        `✅ Found ${leads.length} new lead${leads.length === 1 ? '' : 's'}${data.usedMockData ? ' (demo data — add GOOGLE_MAPS_API_KEY for live results)' : ''}! Check the table below.`
                    );
                } else {
                    setMessage('No businesses without a website were found for that search. Try a different niche or city.');
                }

                onLeadsAdded?.(leads.length);
                setNiche('');
                setCity('');
            } else {
                setMessage(`❌ Error: ${data.error || 'Failed to generate leads'}`);
            }
        } catch (error) {
            console.error('Error generating leads:', error);
            setMessage('❌ Failed to start lead generation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="niche" className="block text-sm font-medium text-gray-300 mb-2">
                            Business Niche
                        </label>
                        <input
                            id="niche"
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g., bakery, salon, restaurant"
                            className="input"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., Delhi, Mumbai, Bangalore"
                            className="input"
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating Leads...
                        </span>
                    ) : (
                        '🚀 Generate Leads'
                    )}
                </button>
            </form>

            {message && (
                <div className={`p-4 rounded-lg ${message.startsWith('✅')
                        ? 'bg-green-500/10 border border-green-500/50 text-green-300'
                        : 'bg-red-500/10 border border-red-500/50 text-red-300'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
}
