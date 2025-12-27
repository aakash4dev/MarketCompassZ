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
        { id: 'restaurants', label: '🍽️ Restaurants', keywords: 'restaurant, cafe, food' },
        { id: 'home-services', label: '🔧 Home Services', keywords: 'plumber, electrician, carpenter, hvac' },
        { id: 'health-beauty', label: '💇 Health & Beauty', keywords: 'salon, spa, barber, massage' },
        { id: 'auto', label: '🚗 Automotive', keywords: 'auto repair, car wash, mechanic' },
        { id: 'professional', label: '💼 Professional Services', keywords: 'lawyer, dentist, doctor, accountant' }
    ];

    const handleSearch = () => {
        setIsSearching(true);
        // TODO: Integrate Google Maps API and Gemini AI
        setTimeout(() => setIsSearching(false), 2000);
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
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {genres.map((genre) => (
                                            <button
                                                key={genre.id}
                                                onClick={() => setSelectedGenre(genre.id)}
                                                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${selectedGenre === genre.id
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-2 border-indigo-400 shadow-lg'
                                                        : 'glass border border-white/20 text-gray-300 hover:bg-white/10'
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
                <div className="absolute bottom-0 left-0 right-0 h-72 glass border-t border-white/10 overflow-y-auto">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Search Results</h3>
                        <div className="text-center py-12">
                            {isSearching ? (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                                    <p className="text-gray-400">Searching for businesses...</p>
                                </div>
                            ) : (
                                <p className="text-gray-400">
                                    {useAI
                                        ? 'Enter your search criteria above and let AI find the perfect matches'
                                        : 'Select a business type and location to start your search'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
