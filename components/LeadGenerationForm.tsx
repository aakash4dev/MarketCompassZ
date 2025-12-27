'use client';

import { useState } from 'react';

interface LeadGenerationFormProps {
    userId: string;
}

export default function LeadGenerationForm({ userId }: LeadGenerationFormProps) {
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
                setMessage('✅ Lead generation started! Leads will appear below in real-time.');
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
