'use client';

import { Lead } from '@/lib/firebase/firestore';

interface LeadsTableProps {
    leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
    if (leads.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No leads yet</h3>
                <p className="text-gray-400">Generate your first batch of leads using the form above!</p>
            </div>
        );
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                {leads.map((lead, index) => (
                    <div
                        key={lead.id}
                        className="card hover:scale-102 transition-transform"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold text-primary-300">{lead.businessName}</h3>
                                    <span className="text-xs px-3 py-1 rounded-full glass text-accent-300 border border-accent-500/30">
                                        {lead.niche}
                                    </span>
                                </div>

                                <div className="space-y-1 text-sm text-gray-400">
                                    <p className="flex items-center gap-2">
                                        <span>📍</span>
                                        <span>{lead.address}</span>
                                    </p>
                                    {lead.phone && (
                                        <p className="flex items-center gap-2">
                                            <span>📞</span>
                                            <span>{lead.phone}</span>
                                        </p>
                                    )}
                                    <p className="flex items-center gap-2">
                                        <span>🌐</span>
                                        <span className="text-red-400">No Website</span>
                                    </p>
                                    {lead.socialLinks && lead.socialLinks.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span>📱</span>
                                            <div className="flex gap-2">
                                                {lead.socialLinks.map((link, i) => (
                                                    <a
                                                        key={i}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary-400 hover:text-primary-300 underline text-xs"
                                                    >
                                                        Social {i + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => copyToClipboard(`${lead.businessName}\n${lead.address}${lead.phone ? `\n${lead.phone}` : ''}`)}
                                    className="text-xs btn-secondary py-2 px-4"
                                    title="Copy details"
                                >
                                    📋 Copy
                                </button>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs btn-secondary py-2 px-4 text-center"
                                    title="Open in Google Maps"
                                >
                                    🗺️ Maps
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
