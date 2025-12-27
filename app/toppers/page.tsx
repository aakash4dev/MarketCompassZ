'use client';

import React from 'react';
import { Trophy, Star, MapPin, Phone, ExternalLink, Award, Crown } from 'lucide-react';

// --- Mock "Elite" Data ---
const podiumLeads = [
    {
        rank: 1,
        name: "Mama's Authentic Kitchen",
        category: "Restaurant",
        location: "Chicago, IL",
        rating: 4.9,
        reviews: 428,
        potential: "High"
    },
    {
        rank: 2,
        name: "Precision Auto Works",
        category: "Auto Repair",
        location: "Austin, TX",
        rating: 4.8,
        reviews: 315,
        potential: "High"
    },
    {
        rank: 3,
        name: "Green Leaf Landscaping",
        category: "Home Services",
        location: "Miami, FL",
        rating: 4.8,
        reviews: 289,
        potential: "Medium"
    }
];

const runnerUps = [
    { rank: 4, name: "City Dental Care", category: "Health", rating: 4.7, reviews: 156, location: "New York, NY" },
    { rank: 5, name: "Elite Roofing Pros", category: "Construction", rating: 4.6, reviews: 204, location: "Denver, CO" },
    { rank: 6, name: "Cozy Corner Cafe", category: "Restaurant", rating: 4.6, reviews: 189, location: "Seattle, WA" },
    { rank: 7, name: "Sharp Cuts Barbershop", category: "Beauty", rating: 4.5, reviews: 342, location: "Atlanta, GA" },
    { rank: 8, name: "Reliable Movers", category: "Services", rating: 4.5, reviews: 120, location: "Boston, MA" },
];

export default function ToppersPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4">

            {/* Hero Section */}
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

                <h1 className="text-5xl md:text-7xl font-black mb-4 flex items-center justify-center gap-4">
                    <Crown className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-400" />
                    <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
                        TOPPERS
                    </span>
                    <Crown className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-400" />
                </h1>
                <p className="text-xl text-yellow-100/60 max-w-2xl mx-auto font-light">
                    The <span className="text-yellow-400 font-semibold">Hall of Fame</span> for high-potential businesses without websites.
                    These are your golden opportunities.
                </p>
            </div>

            {/* The Podium */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 h-auto md:h-[500px]">

                    {/* Rank 2 (Silver) */}
                    <div className="order-2 md:order-1 w-full md:w-1/3 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600 rounded-t-3xl p-6 relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-300 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg z-10">2</div>
                            <div className="text-center mt-6">
                                <h3 className="text-2xl font-bold text-gray-200 mb-2 truncate">{podiumLeads[1].name}</h3>
                                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
                                    <Star className="fill-yellow-400 w-5 h-5" />
                                    <span className="font-bold">{podiumLeads[1].rating}</span>
                                    <span className="text-gray-500 text-sm">({podiumLeads[1].reviews})</span>
                                </div>
                                <div className="text-sm text-gray-400 mb-6">{podiumLeads[1].location}</div>
                                <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                        {/* Pedestal Base */}
                        <div className="w-full h-24 bg-gradient-to-b from-gray-800 to-transparent opacity-50 rounded-b-2xl" />
                    </div>

                    {/* Rank 1 (Gold) */}
                    <div className="order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center z-10 -mb-8 md:mb-0">
                        <div className="absolute -top-16 animate-bounce">
                            <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        </div>
                        <div className="w-full bg-gradient-to-b from-yellow-900/80 to-black border-2 border-yellow-500/50 rounded-t-3xl p-8 relative shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)] group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold w-12 h-12 rounded-full flex items-center justify-center border-4 border-black shadow-xl z-20 text-xl">1</div>
                            <div className="text-center mt-8">
                                <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">Top Pick</span>
                                <h3 className="text-3xl font-black text-white mb-2 leading-tight">{podiumLeads[0].name}</h3>
                                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="fill-yellow-400 w-5 h-5" />)}
                                    </div>
                                    <span className="font-bold ml-2 text-lg">{podiumLeads[0].rating}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-8">{podiumLeads[0].reviews} Verified Reviews • No Website</p>
                                <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg rounded-xl shadow-lg shadow-yellow-500/20 transition-all">
                                    Claim This Lead
                                </button>
                            </div>
                        </div>
                        {/* Pedestal Base */}
                        <div className="w-full h-32 bg-gradient-to-b from-yellow-900/50 to-transparent rounded-b-2xl border-x border-yellow-500/10" />
                    </div>

                    {/* Rank 3 (Bronze) */}
                    <div className="order-3 md:order-3 w-full md:w-1/3 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-b from-orange-900/40 to-black border border-orange-700/50 rounded-t-3xl p-6 relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-400 text-orange-900 font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-black shadow-lg z-10">3</div>
                            <div className="text-center mt-6">
                                <h3 className="text-2xl font-bold text-gray-200 mb-2 truncate">{podiumLeads[2].name}</h3>
                                <div className="flex items-center justify-center gap-2 text-orange-400 mb-4">
                                    <Star className="fill-orange-400 w-5 h-5" />
                                    <span className="font-bold">{podiumLeads[2].rating}</span>
                                    <span className="text-gray-500 text-sm">({podiumLeads[2].reviews})</span>
                                </div>
                                <div className="text-sm text-gray-400 mb-6">{podiumLeads[2].location}</div>
                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                        {/* Pedestal Base */}
                        <div className="w-full h-16 bg-gradient-to-b from-orange-900/20 to-transparent rounded-b-2xl" />
                    </div>
                </div>
            </div>

            {/* Runner Ups List */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 border-b border-white/10 flex items-center gap-3">
                        <Award className="text-yellow-400 w-6 h-6" />
                        <h2 className="text-xl font-bold">Honorable Mentions</h2>
                    </div>
                    <div>
                        {runnerUps.map((lead) => (
                            <div key={lead.rank} className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <span className="text-2xl font-black text-white/20 group-hover:text-yellow-500/50 transition-colors w-8">
                                        #{lead.rank}
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-yellow-400 transition-colors">{lead.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            <span>{lead.category}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                            <span>{lead.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
                                        <span>{lead.rating}</span>
                                        <Star className="w-4 h-4 fill-yellow-400" />
                                    </div>
                                    <span className="text-xs text-gray-500">{lead.reviews} reviews</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
