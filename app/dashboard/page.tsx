'use client';

import React from 'react';
import {
    Users,
    Mail,
    TrendingUp,
    Building2,
    MoreHorizontal,
    Search,
    Filter,
    Download,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// --- Mock Data ---

const stats = [
    { title: 'Total Leads Found', value: '1,248', change: '+12.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Outreach Sent', value: '432', change: '+8.2%', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Response Rate', value: '24.8%', change: '+2.1%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Saved Businesses', value: '156', change: '+4.3%', icon: Building2, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const chartData = [
    { name: 'Mon', leads: 45 },
    { name: 'Tue', leads: 52 },
    { name: 'Wed', leads: 38 },
    { name: 'Thu', leads: 65 },
    { name: 'Fri', leads: 48 },
    { name: 'Sat', leads: 25 },
    { name: 'Sun', leads: 15 },
];

const recentLeads = [
    { id: 1, name: 'Pinnacle Plumbing', category: 'Plumbers', location: 'Chicago, IL', status: 'New', time: '2 mins ago' },
    { id: 2, name: 'Taste of Italy', category: 'Restaurants', location: 'New York, NY', status: 'Contacted', time: '1 hour ago' },
    { id: 3, name: 'Elite Fitness Pro', category: 'Gyms', location: 'Miami, FL', status: 'Saved', time: '3 hours ago' },
    { id: 4, name: 'Modern Smiles', category: 'Dentists', location: 'Austin, TX', status: 'New', time: '5 hours ago' },
    { id: 5, name: 'TechFix Solutions', category: 'IT Support', location: 'San Francisco, CA', status: 'Contacted', time: '1 day ago' },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24 pb-20">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Welcome back, Aakash</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors">
                            <Clock className="w-4 h-4" />
                            <span>Last 7 Days</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                            <Download className="w-4 h-4" />
                            <span>Export Report</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl md:hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="flex items-center text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-gray-400 text-sm">{stat.title}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Size: 2/3 - Chart */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Discovery Performance</h2>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-xs text-gray-400">Leads Generated</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopColorOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopColorOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Size: 1/3 - Quick Actions / Activity */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-blue-300">
                                        <Search className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-white">Start New Search</p>
                                        <p className="text-xs text-gray-400">Find businesses in a new city</p>
                                    </div>
                                </div>
                                <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-purple-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-white">Email Campaign</p>
                                        <p className="text-xs text-gray-400">Draft emails to saved leads</p>
                                    </div>
                                </div>
                                <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">System Status</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Gemini AI Brain: <span className="text-green-400">Online</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300 mt-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Google Maps API: <span className="text-yellow-400">Simulated</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Leads Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold">Recent Discoveries</h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    className="bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
                                />
                            </div>
                            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                                <Filter className="w-4 h-4 text-gray-300" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-gray-400 text-sm">
                                    <th className="p-4 font-medium">Business Name</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Found</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {recentLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4 font-medium text-white">{lead.name}</td>
                                        <td className="p-4 text-gray-300">{lead.category}</td>
                                        <td className="p-4 text-gray-300">{lead.location}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    lead.status === 'Contacted' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                        'bg-green-500/10 text-green-400 border-green-500/20'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">{lead.time}</td>
                                        <td className="p-4 text-right">
                                            <button className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-white/10 text-center">
                        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            View All Leads &rarr;
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
