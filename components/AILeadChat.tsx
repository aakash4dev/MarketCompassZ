'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Loader2, MapPin, Star, Phone } from 'lucide-react';

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
            content: "Hi! I'm your lead generation assistant. Tell me what kind of businesses you're looking for. For example: \"Find plumbers in New York with 4+ star ratings\" or \"Show me restaurants in Los Angeles without websites\"."
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

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();

            // Add AI response
            const aiResponse: Message = {
                role: 'assistant',
                content: data.content,
                leads: data.leads
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Chat error:', error);
            // Error fallback
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting to the server right now. Please try again in a moment."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-sunrise-500 to-rose-500 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white">Lead Hunter</h3>
                    <p className="text-xs text-white/90">Automated Prospecting System</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sand-50/30">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            {/* Message Bubble */}
                            <div
                                className={`rounded-2xl p-4 ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-sunrise-500 to-rose-500 text-white shadow-sm'
                                    : 'bg-white border border-sand-200 text-sand-800 shadow-sm'
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
                                            className="bg-white border border-sand-200 rounded-xl p-4 hover:border-sunrise-300 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-sand-900">{lead.name}</h4>
                                                {lead.rating && (
                                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span>{lead.rating}</span>
                                                        <span className="text-sand-400 text-xs">({lead.reviews})</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-1 text-sm text-sand-600">
                                                <p className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-sunrise-500" />
                                                    {lead.address}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-sunrise-500" />
                                                    {lead.phone}
                                                </p>
                                                <span className="inline-block px-2 py-1 mt-2 rounded-lg bg-sunrise-50 text-sunrise-700 text-xs font-semibold border border-sunrise-100">
                                                    {lead.category}
                                                </span>
                                                <p className="text-xs font-semibold text-rose-500 mt-2 bg-rose-50 inline-block px-2 py-1 rounded-md">
                                                    No website detected
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
                        <div className="bg-white border border-sand-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                            <Loader2 className="w-5 h-5 text-sunrise-500 animate-spin" />
                            <span className="text-sm text-sand-600">Searching database...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-sand-200 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., Find 4+ star plumbers in Chicago without websites..."
                        className="flex-1 px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sand-900 placeholder-sand-400 focus:border-sunrise-400 focus:ring-2 focus:ring-sunrise-100 focus:outline-none transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-sunrise-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-sunrise-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-sand-500 mt-2 pl-2">
                    Tip: Be specific! Mention niche, city, ratings, or any special criteria
                </p>
            </form>
        </div>
    );
}
