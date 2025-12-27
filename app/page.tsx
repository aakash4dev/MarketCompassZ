'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Zap, Users, ArrowRight, Play, Sparkles, Globe, BarChart3, Shield, Rocket, CheckCircle2, Search, Briefcase, MapPin, DollarSign, PieChart } from 'lucide-react';
import AILeadChat from '@/components/AILeadChat';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative px-4 py-20 md:py-32 overflow-hidden">
                {/* Background Elements & Floating Animations */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {/* Gradients */}
                    <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float" />
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />

                    {/* Floating Icons */}
                    <div className="absolute top-1/4 left-1/4 animate-float opacity-20" style={{ animationDelay: '0s' }}>
                        <DollarSign className="w-16 h-16 text-cyan-400" />
                    </div>
                    <div className="absolute top-1/3 right-1/4 animate-float opacity-20" style={{ animationDelay: '2s' }}>
                        <Search className="w-12 h-12 text-purple-400" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/3 animate-float opacity-20" style={{ animationDelay: '4s' }}>
                        <PieChart className="w-14 h-14 text-pink-400" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 animate-float opacity-20" style={{ animationDelay: '1.5s' }}>
                        <TrendingUp className="w-16 h-16 text-blue-400" />
                    </div>
                    <div className="absolute top-20 left-20 animate-float opacity-10" style={{ animationDelay: '3s' }}>
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-8">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">Powered by Google ADK & Gemini AI</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                        Find Businesses{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Without Websites
                        </span>
                        <br />
                        <span className="text-gray-400 text-4xl md:text-5xl">in Seconds, Not Hours</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        Our AI Agent scans Google Maps to discover businesses with no digital presence — delivering{' '}
                        <span className="text-white font-semibold">ready-to-pitch leads</span> straight to your dashboard.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link
                            href="/auth?mode=signup"
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            Start Finding Leads
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <button className="px-8 py-4 rounded-xl border-2 border-gray-700 text-white font-bold text-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                10K+
                            </div>
                            <div className="text-sm text-gray-500">Leads Found</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                500+
                            </div>
                            <div className="text-sm text-gray-500">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                95%
                            </div>
                            <div className="text-sm text-gray-500">Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Chat Interface Section */}
            <section className="relative px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Lead Hunt</span>
                        </h2>
                        <p className="text-gray-400 text-lg">Chat with AI to find exactly what you need — ratings, location, niche, and more!</p>
                    </div>

                    <AILeadChat />
                </div>
            </section>

            {/* Why MarketCompassZ Section */}
            <section className="relative px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Why <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MarketCompassZ</span>?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                            Stop manually browsing Google Maps. Let AI find your next clients while you focus on closing deals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Briefcase className="w-6 h-6" />,
                                title: 'ADK-Powered Agent',
                                desc: 'Autonomous AI that reasons through multi-step searches to find the best leads for your niche.'
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Real-Time Sync',
                                desc: 'Leads appear instantly on your dashboard as the agent discovers new businesses.'
                            },
                            {
                                icon: <Globe className="w-6 h-6" />,
                                title: 'Social Enrichment',
                                desc: 'Cross-references Google Maps with social media to verify business activity and quality.'
                            },
                            {
                                icon: <Rocket className="w-6 h-6" />,
                                title: 'Instant Results',
                                desc: 'Get dozens of qualified leads in minutes instead of hours of manual searching.'
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: 'Google Auth',
                                desc: 'Seamless login with your existing Google account. No new passwords to remember.'
                            },
                            {
                                icon: <BarChart3 className="w-6 h-6" />,
                                title: 'Lead Scoring',
                                desc: 'AI-powered scoring helps you prioritize the most promising opportunities first.'
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            How It <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Works</span>
                        </h2>
                        <p className="text-gray-400 text-lg">From search to pitch-ready leads in four simple steps.</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-blue-600"></div>

                        <div className="space-y-20">
                            {[
                                {
                                    icon: <Search className="w-8 h-8" />,
                                    title: 'Enter Your Criteria',
                                    desc: "Choose a business niche (like 'Plumbers' or 'Restaurants') and a target city or region.",
                                    num: '01',
                                    align: 'right'
                                },
                                {
                                    icon: <Sparkles className="w-8 h-8" />,
                                    title: 'AI Agent Scans',
                                    desc: 'Our ADK-powered agent autonomously searches Google Maps and cross-references multiple data sources.',
                                    num: '02',
                                    align: 'left'
                                },
                                {
                                    icon: <CheckCircle2 className="w-8 h-8" />,
                                    title: 'Leads Discovered',
                                    desc: 'Businesses without websites or apps are identified, scored, and added to your dashboard in real-time.',
                                    num: '03',
                                    align: 'right'
                                },
                                {
                                    icon: <Rocket className="w-8 h-8" />,
                                    title: 'Start Pitching',
                                    desc: 'Contact high-quality leads directly with all the info you need to close the deal.',
                                    num: '04',
                                    align: 'left'
                                }
                            ].map((step, i) => (
                                <div key={i} className={`md:flex md:items-center md:gap-8 ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Content */}
                                    <div className={`flex-1 mb-4 md:mb-0 ${step.align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                                        <h3 className="text-2xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>

                                    {/* Icon */}
                                    <div className="relative flex-shrink-0 z-10 mb-8 md:mb-0">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/50">
                                            {step.icon}
                                        </div>
                                        <div className={`absolute -top-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black -right-2`}>
                                            {step.num}
                                        </div>
                                    </div>

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative px-4 py-20">
                <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-white/10">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Ready to Find Your Next Clients?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Enter a niche and city above to let our AI discover businesses without digital presence.
                    </p>
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>
        </div>
    );
}
