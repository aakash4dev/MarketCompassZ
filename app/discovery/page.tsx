'use client';

import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Loader2 } from 'lucide-react';

export default function DiscoveryPage() {
    const [useAI, setUseAI] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [location, setLocation] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Genre categories for Direct Search
    const genres = [
        { id: 'restaurants', label: 'Restaurants', keywords: 'restaurant, diner, bistro, eatery' },
        { id: 'cafes', label: 'Coffee & Tea', keywords: 'coffee shop, cafe, bakery, tea house' },
        { id: 'plumbers', label: 'Plumbers', keywords: 'plumber, plumbing, drain cleaning, water heater' },
        { id: 'electricians', label: 'Electricians', keywords: 'electrician, wiring, lighting, electrical' },
        { id: 'hvac', label: 'HVAC', keywords: 'heating, air conditioning, ventilation, ac repair' },
        { id: 'landscaping', label: 'Landscaping', keywords: 'lawn care, gardening, tree service, landscaping' },
        { id: 'cleaning', label: 'Cleaning Services', keywords: 'house cleaning, janitorial, maid service, commercial cleaning' },
        { id: 'salons', label: 'Hair Salons', keywords: 'hair salon, barber shop, stylist, hairdresser' },
        { id: 'spas', label: 'Spas & Wellness', keywords: 'massage, facial, day spa, wellness center' },
        { id: 'dentists', label: 'Dentists', keywords: 'dental clinic, orthodontist, oral surgery, pediatric dentist' },
        { id: 'doctors', label: 'Medical Clinics', keywords: 'medical clinic, family practice, pediatrician, urgent care' },
        { id: 'lawyers', label: 'Legal Services', keywords: 'attorney, law firm, legal services, lawyer' },
        { id: 'accountants', label: 'Accounting', keywords: 'cpa, tax preparation, bookkeeping, accountant' },
        { id: 'real-estate', label: 'Real Estate', keywords: 'realtor, property management, real estate agent, broker' },
        { id: 'auto-repair', label: 'Auto Repair', keywords: 'mechanic, auto shop, collision repair, oil change' },
        { id: 'car-wash', label: 'Auto Detailing', keywords: 'car wash, auto detailing, car spa, mobile detailing' },
        { id: 'gyms', label: 'Fitness & Gyms', keywords: 'fitness center, yoga studio, personal training, gym' },
        { id: 'retail', label: 'Retail Stores', keywords: 'boutique, clothing store, gift shop, retail' },
        { id: 'construction', label: 'Construction', keywords: 'general contractor, home builder, remodeling, renovation' },
        { id: 'pets', label: 'Pet Services', keywords: 'veterinarian, dog grooming, pet sitting, animal hospital' }
    ];

    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        setIsSearching(true);
        setResults([]); // Clear previous results

        try {
            // Construct query based on mode
            const query = useAI
                ? aiPrompt
                : `Find ${genres.find(g => g.id === selectedGenre)?.label || 'businesses'} in ${location}`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });

            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            setResults(data.leads || []);

        } catch (error) {
            console.error('Search error:', error);
            // Optional: Show error state
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen pt-16">
            {/* Map Container */}
            <div className="relative h-[calc(100vh-4rem)]">
                {/* Google Maps Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-space-900 to-space-950">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
                            <p className="text-gray-400">Google Maps will load here</p>
                            <p className="text-sm text-gray-500 mt-2">Add GOOGLE_MAPS_API_KEY to .env to enable</p>
                        </div>
                    </div>
                </div>

                {/* Floating Search Panel (Center-Top) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-10">
                    <div className="glass rounded-2xl p-6 border border-white/20 shadow-2xl">
                        {/* Search Mode Toggle */}
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => setUseAI(false)}
                                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${!useAI
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <Search className="w-5 h-5" />
                                Direct Search
                            </button>
                            <button
                                onClick={() => setUseAI(true)}
                                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${useAI
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <Sparkles className="w-5 h-5" />
                                AI Prompt
                            </button>
                        </div>

                        {!useAI ? (
                            /* Direct Search Mode */
                            <div className="space-y-6">
                                {/* Genre Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-3">
                                        Select Business Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {genres.map((genre) => (
                                            <button
                                                key={genre.id}
                                                onClick={() => setSelectedGenre(genre.id)}
                                                className={`px-3 py-2 rounded-lg font-medium text-xs transition-all ${selectedGenre === genre.id
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border border-indigo-400 shadow-md transform scale-105'
                                                    : 'glass border border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                {genre.label}
                                            </button>
                                        ))}
                                    </div>
                                    {selectedGenre && (
                                        <p className="text-xs text-gray-400 mt-2">
                                            Searching for: {genres.find(g => g.id === selectedGenre)?.keywords}
                                        </p>
                                    )}
                                </div>

                                {/* Location Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Enter city, state, or zipcode..."
                                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    disabled={!selectedGenre || !location || isSearching}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSearching ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            Find Businesses
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            /* AI Prompt Mode */
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Describe what you're looking for (AI will understand)
                                </label>
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="Example: Find me 5-star rated plumbers in Chicago that don't have websites but have at least 100 reviews..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                                />

                                {/* Example Prompts */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-gray-400">Try:</span>
                                    {[
                                        'Find restaurants without websites in NYC',
                                        'Highly rated hair salons in LA',
                                        'Auto repair shops with 4+ stars'
                                    ].map((example, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setAiPrompt(example)}
                                            className="px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-500/30 transition-colors"
                                        >
                                            {example}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSearch}
                                    disabled={!aiPrompt.trim() || isSearching}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSearching ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            AI is searching...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Search with AI
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Panel (Bottom) */}
                <div className={`absolute bottom-0 left-0 right-0 glass border-t border-white/10 overflow-hidden transition-all duration-300 ${results.length > 0 ? 'h-[50vh]' : 'h-72'} bg-space-950/90 backdrop-blur-xl`}>
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="flex items-center justify-between mb-6 sticky top-0 z-10 bg-transparent pb-2 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Search className="w-5 h-5 text-cyan-400" />
                                Search Results
                                {results.length > 0 && (
                                    <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-gray-300">
                                        {results.length} found
                                    </span>
                                )}
                            </h3>
                        </div>

                        {isSearching ? (
                            <div className="text-center py-12">
                                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                                <p className="text-gray-400">Scanning Google Maps for leads...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                                {results.map((lead: any, i: number) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{lead.name}</h4>
                                                <p className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                                    {lead.category}
                                                </p>
                                            </div>
                                            {lead.rating && (
                                                <div className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded-lg">
                                                    <span>★</span>
                                                    <span>{lead.rating}</span>
                                                    <span className="text-gray-400 text-xs">({lead.reviews})</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-300">
                                            <p className="flex items-center gap-2 text-gray-400">
                                                <MapPin className="w-4 h-4 text-gray-500" />
                                                {lead.address}
                                            </p>
                                            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                                                <span className="text-xs text-red-300 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                                    No Website
                                                </span>
                                                <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                                                    View Details →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">
                                    {useAI
                                        ? 'Enter your search criteria above and let AI find the perfect matches'
                                        : 'Select a business type and location to start your search'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
