import React from 'react';
import { adminDb } from '@/lib/firebase/admin';

export const revalidate = 60; // Revalidate every 60 seconds

async function getLeads() {
    if (!adminDb) return [];
    
    try {
        const snapshot = await adminDb.collection('leads_delhi_ncr')
            .orderBy('discoveredAt', 'desc')
            .limit(100)
            .get();
            
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore Timestamp to string for Client components if needed, 
            // or just render it directly if Server component
            discoveredAt: doc.data().discoveredAt?.toDate().toISOString() || new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching leads:", error);
        return [];
    }
}

export default async function DelhiNcrLeadsPage() {
    const leads = await getLeads();

    return (
        <div className="min-h-screen bg-sunrise-50 text-sand-950 py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 border-b border-sand-200 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-sunrise-900 mb-4">
                        Delhi NCR Leads
                    </h1>
                    <p className="text-lg text-sand-600">
                        Real businesses in the Delhi NCR region that do not currently have a website. 
                        These leads are automatically discovered by our background scanner.
                    </p>
                </div>

                {leads.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-soft p-12 text-center border border-sand-200">
                        <h3 className="text-xl font-semibold text-sand-800 mb-2">No leads found yet</h3>
                        <p className="text-sand-500">
                            Run the scanner script (`npx tsx scripts/scanner.ts`) to populate this list.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-soft border border-sand-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-sand-50 border-b border-sand-200">
                                        <th className="py-4 px-6 font-semibold text-sand-700 text-sm">Business Name</th>
                                        <th className="py-4 px-6 font-semibold text-sand-700 text-sm">Address</th>
                                        <th className="py-4 px-6 font-semibold text-sand-700 text-sm">Phone</th>
                                        <th className="py-4 px-6 font-semibold text-sand-700 text-sm">Niche / Query</th>
                                        <th className="py-4 px-6 font-semibold text-sand-700 text-sm">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead: any, idx: number) => (
                                        <tr key={lead.id} className={`border-b border-sand-100 hover:bg-sunrise-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-50/30'}`}>
                                            <td className="py-4 px-6 font-medium text-sunrise-900">
                                                {lead.name}
                                            </td>
                                            <td className="py-4 px-6 text-sand-600 text-sm max-w-xs truncate" title={lead.address}>
                                                {lead.address}
                                            </td>
                                            <td className="py-4 px-6 text-sand-600 text-sm">
                                                {lead.phone || 'N/A'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-block px-3 py-1 bg-sunrise-100 text-sunrise-800 text-xs rounded-full font-medium capitalize">
                                                    {lead.query}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {lead.rating ? (
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-amber-500 text-lg">★</span>
                                                        <span className="font-medium text-sand-800">{lead.rating}</span>
                                                        <span className="text-xs text-sand-400 ml-1">({lead.reviewCount})</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sand-400 text-sm">No ratings</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-sand-50 py-3 px-6 text-sm text-sand-500 border-t border-sand-200">
                            Showing up to 100 most recent leads.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
