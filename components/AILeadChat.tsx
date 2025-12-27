'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, MapPin, Star, Phone } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    leads?: Lead[];
}

interface Lead {
    name: string;
    address: string;
    phone: string;
    rating?: number;
    reviews?: number;
    category: string;
}

export default function AILeadChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm your AI lead generation assistant. Tell me what kind of businesses you're looking for. For example: \"Find plumbers in New York with 4+ star ratings\" or \"Show me restaurants in Los Angeles without websites\"."
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        // Simulate AI processing (replace with actual Gemini API call)
        setTimeout(() => {
            // Mock lead generation based on user query
            const mockLeads: Lead[] = [
                {
                    name: 'Sharma Trading Co.',
                    address: 'Karol Bagh, Delhi',
                    phone: '+91-9876543210',
                    rating: 4.2,
                    reviews: 156,
                    category: 'General Store'
                },
                {
                    name: 'Elite Boutique',
                    address: 'Connaught Place, Delhi',
                    phone: '+91-9876543211',
                    rating: 4.5,
                    reviews: 89,
                    category: 'Fashion'
                },
                {
                    name: 'Mumbai Spice Restaurant',
                    address: 'Punjabi Bagh, Delhi',
                    phone: '+91-9876543212',
                    rating: 4.8,
                    reviews: 342,
                    category: 'Restaurant'
                }
            ];

            const aiResponse: Message = {
                role: 'assistant',
                content: `I found ${mockLeads.length} businesses matching your criteria. All of them don't have a website and are perfect prospects for your services!`,
                leads: mockLeads
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[600px] glass rounded-2xl border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white">AI Lead Hunter</h3>
                    <p className="text-xs text-white/80">Powered by Gemini AI & Google Maps</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            {/* Message Bubble */}
                            <div
                                className={`rounded-2xl p-4 ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                        : 'bg-white/5 border border-white/10 text-white'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>

                            {/* Lead Cards */}
                            {message.leads && message.leads.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {message.leads.map((lead, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-white">{lead.name}</h4>
                                                {lead.rating && (
                                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span>{lead.rating}</span>
                                                        <span className="text-gray-400 text-xs">({lead.reviews})</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-300">
                                                <p className="flex items-center gap-2">
                                                    <MapPin className="w-3 h-3 text-cyan-400" />
                                                    {lead.address}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <Phone className="w-3 h-3 text-cyan-400" />
                                                    {lead.phone}
                                                </p>
                                                <span className="inline-block px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs">
                                                    {lead.category}
                                                </span>
                                                <p className="text-xs text-red-400 mt-2">
                                                    ⚠️ No website detected - Perfect prospect!
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                            <span className="text-sm text-gray-300">AI is searching Google Maps...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., Find 4+ star plumbers in Chicago without websites..."
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Be specific! Mention niche, city, ratings, or any special criteria
                </p>
            </form>
        </div>
    );
}
