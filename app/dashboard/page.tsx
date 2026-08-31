'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Building2,
    MapPin,
    Download,
    Sparkles,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { onAuthStateChange, AppUser } from '@/lib/firebase/auth';
import { subscribeToLeads, Lead } from '@/lib/firebase/firestore';
import LeadGenerationForm from '@/components/LeadGenerationForm';
import LeadsTable from '@/components/LeadsTable';

interface SystemStatus {
    firebase: boolean;
    gemini: boolean;
    maps: boolean;
    email: boolean;
}

function downloadLeadsAsCSV(leads: Lead[]) {
    const headers = ['Business Name', 'Address', 'Phone', 'Niche', 'City', 'Has Website', 'Found At'];
    const rows = leads.map((lead) => [
        lead.businessName,
        lead.address,
        lead.phone || '',
        lead.niche,
        lead.city,
        lead.hasWebsite ? 'Yes' : 'No',
        lead.createdAt,
    ]);

    const escapeCsv = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marketcompassz-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<AppUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (!currentUser) {
                router.push('/auth');
            }
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToLeads(user.uid, setLeads);
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        fetch('/api/status')
            .then((res) => res.json())
            .then(setStatus)
            .catch(() => setStatus({ firebase: false, gemini: false, maps: false, email: false }));
    }, []);

    const filteredLeads = useMemo(() => {
        if (!searchTerm.trim()) return leads;
        const term = searchTerm.toLowerCase();
        return leads.filter(
            (lead) =>
                lead.businessName.toLowerCase().includes(term) ||
                lead.city.toLowerCase().includes(term) ||
                lead.niche.toLowerCase().includes(term)
        );
    }, [leads, searchTerm]);

    const stats = useMemo(() => {
        const uniqueCities = new Set(leads.map((l) => l.city.toLowerCase())).size;
        const uniqueNiches = new Set(leads.map((l) => l.niche.toLowerCase())).size;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const leadsToday = leads.filter((l) => new Date(l.createdAt) >= today).length;

        return [
            { title: 'Total Leads Found', value: String(leads.length), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { title: 'Found Today', value: String(leadsToday), icon: Sparkles, color: 'text-green-500', bg: 'bg-green-500/10' },
            { title: 'Cities Searched', value: String(uniqueCities), icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { title: 'Niches Searched', value: String(uniqueNiches), icon: Building2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ];
    }, [leads]);

    const chartData = useMemo(() => {
        const days: { name: string; leads: number; date: string }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push({
                name: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.toDateString(),
                leads: 0,
            });
        }
        leads.forEach((lead) => {
            const leadDate = new Date(lead.createdAt).toDateString();
            const bucket = days.find((d) => d.date === leadDate);
            if (bucket) bucket.leads += 1;
        });
        return days;
    }, [leads]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24 pb-20">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Welcome back, {user.displayName || user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => downloadLeadsAsCSV(leads)}
                            disabled={leads.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export CSV</span>
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
                            <h2 className="text-xl font-semibold">Discovery Performance (7 Days)</h2>
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
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Size: 1/3 - Lead Generation + System Status */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                            Find New Leads
                        </h2>
                        <LeadGenerationForm userId={user.uid} />

                        <div className="mt-8">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">System Status</h3>
                            {status ? (
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full ${status.gemini ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                        Gemini AI Brain: <span className={status.gemini ? 'text-green-400' : 'text-yellow-400'}>{status.gemini ? 'Live' : 'Demo mode'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full ${status.maps ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                        Google Maps API: <span className={status.maps ? 'text-green-400' : 'text-yellow-400'}>{status.maps ? 'Live' : 'Simulated'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full ${status.firebase ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                        Firebase: <span className={status.firebase ? 'text-green-400' : 'text-yellow-400'}>{status.firebase ? 'Connected' : 'Local mock'}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">Checking...</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold">Your Discovered Leads</h2>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search leads by name, city, or niche..."
                            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-72"
                        />
                    </div>
                    <div className="p-6">
                        <LeadsTable leads={filteredLeads} />
                    </div>
                </div>

            </div>
        </div>
    );
}
