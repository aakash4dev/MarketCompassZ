'use client';

import React, { useState } from 'react';
import { Search, MapPin, Sliders, Sparkles } from 'lucide-react';

export default function DiscoveryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [useAI, setUseAI] = useState(false);

    const quickSearches = [
        'Restaurants without websites',
        'Plumbers with 4+ stars',
        'Hair salons in my area',
        'Auto repair shops',
        'Dentists accepting new patients'
    ];

    return (
        <div className="min-h-screen pt-16">
            {/* Map Container */}
            <div className="relative h-[calc(100vh-4rem)]">
                {/* Google Maps Placeholder - Will integrate actual Maps API */}
                <div className="absolute inset-0 bg-gradient-to-br from-space-900 to-space-950">
                    {/* Mock Map Background */}
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
                            <p className="text-gray-400">Google Maps will load here</p>
                            <p className="text-sm text-gray-500 mt-2">Add GOOGLE_MAPS_API_KEY to .env to enable</p>
                        </div>
                    </div>
                </div>

                {/* Floating Search Bar (Center) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-10">
                    <div className="glass rounded-2xl p-4 border border-white/20 shadow-2xl">
                        {/* Search Mode Toggle */}
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => setUseAI(false)}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${!useAI
                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <Search className="w-4 h-4 inline mr-2" />
                                Direct Search
                            </button>
                            <button
                                onClick={() => setUseAI(true)}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${useAI
                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <Sparkles className="w-4 h-4 inline mr-2" />
                                AI Prompt
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={
                                    useAI
                                        ? "Ask AI: 'Find 5-star rated plumbers in Chicago without websites...'"
                                        : "Search for: restaurants, plumbers, dentists..."
                                }
                                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-lg"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                                Search
                            </button>
                        </div>

                        {/* Quick Search Pills */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {quickSearches.map((search, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSearchQuery(search)}
                                    className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters Panel (Right Side) */}
                <div className="absolute right-4 top-8 glass rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <Sliders className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-bold text-white">Filters</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Rating</label>
                            <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm">
                                <option>All Ratings</option>
                                <option>4+ Stars</option>
                                <option>4.5+ Stars</option>
                                <option>5 Stars</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Distance</label>
                            <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm">
                                <option>Any Distance</option>
                                <option>Within 5km</option>
                                <option>Within 10km</option>
                                <option>Within 25km</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Reviews</label>
                            <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm">
                                <option>Any Number</option>
                                <option>100+ Reviews</option>
                                <option>500+ Reviews</option>
                                <option>1000+ Reviews</option>
                            </select>
                        </div>
                        <div className="pt-3 border-t border-white/10">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span>Only businesses without websites</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results Panel (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-64 glass border-t border-white/10 overflow-y-auto">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Search Results</h3>
                        <p className="text-gray-400 text-center py-8">
                            Enter a search query above to find businesses on the map
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
