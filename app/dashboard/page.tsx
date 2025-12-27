'use client';

import React from 'react';
import { TrendingUp, Users, Target, Zap, BarChart3, Clock } from 'lucide-react';

export default function DashboardPage() {
    const stats = [
        { label: 'Total Leads Found', value: '1,234', change: '+12%', icon: Target, color: 'from-cyan-500 to-blue-600' },
        { label: 'Contacted', value: '856', change: '+8%', icon: Users, color: 'from-indigo-500 to-purple-600' },
        { label: 'Conversion Rate', value: '34%', change: '+5%', icon: TrendingUp, color: 'from-pink-500 to-orange-600' },
        { label: 'AI Scans Today', value: '47', change: '+23%', icon: Zap, color: 'from-green-500 to-teal-600' },
    ];

    const recentLeads = [
        { name: 'Sharma Trading Co.', category: 'Retail', location: 'Delhi', rating: 4.2, added: '2 hours ago' },
        { name: 'Elite Boutique', category: 'Fashion', location: 'Mumbai', rating: 4.5, added: '5 hours ago' },
        { name: 'Mumbai Spice', category: 'Restaurant', location: 'Pune', rating: 4.8, added: '1 day ago' },
        { name: 'Tech Repairs', category: 'Electronics', location: 'Bangalore', rating: 4.1, added: '1 day ago' },
        { name: 'Fitness Plus', category: 'Gym', location: 'Hyderabad', rating: 4.6, added: '2 days ago' },
    ];

    const activityData = [
        { day: 'Mon', searches: 23, leads: 18 },
        { day: 'Tue', searches: 31, leads: 24 },
        { day: 'Wed', searches: 28, leads: 22 },
        { day: 'Thu', searches: 35, leads: 29 },
        { day: 'Fri', searches: 42, leads: 35 },
        { day: 'Sat', searches: 19, leads: 14 },
        { day: 'Sun', searches: 15, leads: 11 },
    ];

    return (
        <div className="min-h-screen pt-16 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Track your lead generation performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                            </div>
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Leads */}
                    <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Recent Leads</h2>
                            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">View All</button>
                        </div>
                        <div className="space-y-3">
                            {recentLeads.map((lead, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex-1">
                                        <div className="font-bold text-white mb-1">{lead.name}</div>
                                        <div className="text-sm text-gray-400">{lead.category} • {lead.location}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                                                <span>★</span>
                                                <span>{lead.rating}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">{lead.added}</div>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Chart */}
                    <div className="glass rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Weekly Activity</h2>
                        <div className="space-y-4">
                            {activityData.map((day, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-400">{day.day}</span>
                                        <span className="text-white font-semibold">{day.leads} leads</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                                            style={{ width: `${(day.leads / 35) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <button className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all group">
                        <Zap className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">Start New Search</h3>
                        <p className="text-sm text-gray-400">Find more leads with AI</p>
                    </button>
                    <button className="glass rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all group">
                        <BarChart3 className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">View Analytics</h3>
                        <p className="text-sm text-gray-400">Deep dive into your data</p>
                    </button>
                    <button className="glass rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all group">
                        <Clock className="w-8 h-8 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">Export Leads</h3>
                        <p className="text-sm text-gray-400">Download as CSV</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
