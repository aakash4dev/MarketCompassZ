'use client';

import React from 'react';
import { Trophy, TrendingUp, Star, Phone, MapPin, Globe } from 'lucide-react';

export default function ToppersPage() {
    const topBusinesses = [
        { rank: 1, name: 'Golden Palace Restaurant', category: 'Restaurant', location: 'Mumbai', rating: 4.9, reviews: 2847, calls: 0 },
        { rank: 2, name: 'Elite Fitness Center', category: 'Gym', location: 'Delhi', rating: 4.8, reviews: 1923, calls: 0 },
        { rank: 3, name: 'Sharma Auto Repair', category: 'Auto Service', location: 'Bangalore', rating: 4.8, reviews: 1654, calls: 0 },
        { rank: 4, name: 'Dental Care Plus', category: 'Healthcare', location: 'Pune', rating: 4.7, reviews: 1432, calls: 0 },
        { rank: 5, name: 'Royal Boutique', category: 'Fashion', location: 'Chennai', rating: 4.7, reviews: 1289, calls: 0 },
        { rank: 6, name: 'Tech Solutions Hub', category: 'IT Services', location: 'Hyderabad', rating: 4.6, reviews: 1087, calls: 0 },
        { rank: 7, name: 'Green Leaf Salon', category: 'Beauty', location: 'Kolkata', rating: 4.6, reviews: 976, calls: 0 },
        { rank: 8, name: 'Prime Plumbing', category: 'Home Services', location: 'Ahmedabad', rating: 4.5, reviews: 843, calls: 0 },
        { rank: 9, name: 'Sunset Cafe', category: 'Cafe', location: 'Jaipur', rating: 4.5, reviews: 734, calls: 0 },
        { rank: 10, name: 'Kids Learn Academy', category: 'Education', location: 'Lucknow', rating: 4.4, reviews: 627, calls: 0 },
    ];

    const topUsers = [
        { rank: 1, name: 'Rahul Kumar', role: 'Web Developer', leadsFound: 324, callsMade: 156, conversionRate: 48 },
        { rank: 2, name: 'Priya Sharma', role: 'Agency Owner', leadsFound: 289, callsMade: 143, conversionRate: 45 },
        { rank: 3, name: 'Amit Patel', role: 'Freelancer', leadsFound: 267, callsMade: 134, conversionRate: 42 },
        { rank: 4, name: 'Sneha Singh', role: 'Marketing Pro', leadsFound: 234, callsMade: 121, conversionRate: 40 },
        { rank: 5, name: 'Vikram Mehta', role: 'App Developer', leadsFound: 198, callsMade: 98, conversionRate: 38 },
    ];

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'from-yellow-500 to-orange-500';
        if (rank === 2) return 'from-gray-400 to-gray-600';
        if (rank === 3) return 'from-orange-600 to-orange-800';
        return 'from-cyan-500 to-blue-600';
    };

    const getRankBadge = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    return (
        <div className="min-h-screen pt-16 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-300">Leaderboards</span>
                    </div>
                    <h1 className="text-5xl font-black text-white mb-4">Top Performers</h1>
                    <p className="text-xl text-gray-400">Businesses & users leading the way</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Top Businesses from Google Maps */}
                    <div>
                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Top Businesses</h2>
                                    <p className="text-sm text-gray-400">Real data from Google Maps</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {topBusinesses.map((business) => (
                                    <div
                                        key={business.rank}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        {/* Rank Badge */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankColor(business.rank)} flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-xl font-black text-white">{getRankBadge(business.rank)}</span>
                                        </div>

                                        {/* Business Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-white mb-1 truncate">{business.name}</div>
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {business.location}
                                                </span>
                                                <span>•</span>
                                                <span>{business.category}</span>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="text-right flex-shrink-0">
                                            <div className="flex items-center gap-1 text-yellow-400 font-bold mb-1">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span>{business.rating}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">{business.reviews} reviews</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                                <p className="text-sm text-cyan-200 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    <span>All businesses shown don't have websites — perfect leads!</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Platform Users */}
                    <div>
                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Top Users</h2>
                                    <p className="text-sm text-gray-400">Most active lead hunters</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {topUsers.map((user) => (
                                    <div
                                        key={user.rank}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        {/* Rank Badge */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankColor(user.rank)} flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-xl font-black text-white">{getRankBadge(user.rank)}</span>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1">
                                            <div className="font-bold text-white mb-1">{user.name}</div>
                                            <div className="text-xs text-gray-400">{user.role}</div>
                                        </div>

                                        {/* Stats */}
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white mb-1">{user.leadsFound} leads</div>
                                            <div className="text-xs text-gray-400">{user.callsMade} calls</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                                <p className="text-sm text-indigo-200">
                                    💡 Start using the platform to appear on this leaderboard!
                                </p>
                            </div>
                        </div>

                        {/* Achievement Stats */}
                        <div className="mt-6 glass rounded-2xl p-6 border border-white/10">
                            <h3 className="font-bold text-white mb-4">Platform Achievements</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                                        10K+
                                    </div>
                                    <div className="text-xs text-gray-400">Total Leads Found</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-1">
                                        500+
                                    </div>
                                    <div className="text-xs text-gray-400">Active Users</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-3xl font-black bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent mb-1">
                                        95%
                                    </div>
                                    <div className="text-xs text-gray-400">Success Rate</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-1">
                                        24/7
                                    </div>
                                    <div className="text-xs text-gray-400">AI Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
