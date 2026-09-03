'use client';

import React from 'react';
import Link from 'next/link';
import AILeadChat from '@/components/AILeadChat';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-sunrise-50 text-sand-900 font-sans selection:bg-sunrise-200">
            {/* Hero Section */}
            <section className="relative px-6 py-24 md:py-32 overflow-hidden">
                {/* Minimal Background Gradients */}
                <div className="absolute inset-0 -z-10 bg-mesh-gradient-light opacity-60 mix-blend-multiply" />
                
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-sunrise-200 shadow-sm mx-auto">
                        <span className="text-sm font-semibold text-sunrise-700 uppercase tracking-wide">
                            Automated Prospecting System
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-sand-950 leading-tight">
                        Discover Local Businesses{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunrise-600 to-rose-600">
                            Without Websites
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-sand-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Stop manual searching. Our platform automatically scans map data to find high-quality leads that need digital presence, delivered straight to your dashboard.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link
                            href="/auth?mode=signup"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sunrise-600 text-white font-semibold text-lg hover:bg-sunrise-700 hover:shadow-lg hover:shadow-sunrise-500/30 transition-all duration-300"
                        >
                            Start Searching Leads
                        </Link>
                        <button
                            onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-sand-200 text-sand-800 font-semibold text-lg hover:bg-sand-50 hover:border-sand-300 transition-all duration-300"
                        >
                            View Live Demo
                        </button>
                    </div>

                    {/* Stats (Minimalist) */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16 border-t border-sand-200/60 mt-16">
                        <div>
                            <div className="text-3xl font-bold text-sand-900 mb-1">10,000+</div>
                            <div className="text-sm text-sand-500 font-medium">Verified Leads</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-sand-900 mb-1">Daily</div>
                            <div className="text-sm text-sand-500 font-medium">Data Updates</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-sand-900 mb-1">Global</div>
                            <div className="text-sm text-sand-500 font-medium">Region Coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chat Interface Section */}
            <section id="live-demo" className="relative px-6 py-24 bg-white border-y border-sand-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-sand-950">
                            Search Interface
                        </h2>
                        <p className="text-sand-600 text-lg">
                            Query our database to filter businesses by rating, location, and category.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sand-200 shadow-xl shadow-sand-200/50 bg-sand-50/50 p-2 md:p-6">
                        <AILeadChat />
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="relative px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-sand-950">
                            Core Features
                        </h2>
                        <p className="text-sand-600 text-lg max-w-2xl mx-auto">
                            Designed to streamline your outbound sales process by providing structured, verified data.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Automated Discovery',
                                desc: 'Continuous scanning of business directories to find entities lacking an online presence.'
                            },
                            {
                                title: 'Structured Data',
                                desc: 'Receive clean data including business name, address, phone number, and current ratings.'
                            },
                            {
                                title: 'Real-Time Updates',
                                desc: 'Leads are populated into your dashboard immediately as they are discovered.'
                            },
                            {
                                title: 'Location Targeting',
                                desc: 'Specify exact cities, neighborhoods, or regions to focus your outreach efforts.'
                            },
                            {
                                title: 'Category Filtering',
                                desc: 'Target specific niches like restaurants, contractors, or healthcare clinics.'
                            },
                            {
                                title: 'Quality Scoring',
                                desc: 'Filter out permanently closed businesses or those with extremely low ratings.'
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 border border-sand-200 shadow-sm hover:shadow-md hover:border-sunrise-300 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-sunrise-100 flex items-center justify-center mb-6">
                                    <span className="text-xl font-bold text-sunrise-700">0{i + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-sand-900 mb-3">{feature.title}</h3>
                                <p className="text-sand-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative px-6 py-24 bg-white border-y border-sand-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-sand-950">
                            Workflow Process
                        </h2>
                        <p className="text-sand-600 text-lg">
                            From defining your criteria to acquiring actionable leads.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'Define Target',
                                desc: "Input your desired location and business category."
                            },
                            {
                                title: 'System Scan',
                                desc: 'The backend queries map databases for matching entities.'
                            },
                            {
                                title: 'Data Filtering',
                                desc: 'Results are parsed to identify businesses without a website.'
                            },
                            {
                                title: 'Dashboard Sync',
                                desc: 'Verified leads are exported to your workspace.'
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative">
                                {/* Connector Line (Desktop) */}
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-sand-200"></div>
                                )}
                                
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-white border-2 border-sunrise-500 flex items-center justify-center text-sunrise-600 font-bold mb-6 bg-white shadow-sm">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-sand-900 mb-3">{step.title}</h3>
                                    <p className="text-sand-600 leading-relaxed max-w-xs">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative px-6 py-32 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-sand-950 tracking-tight">
                        Begin Your Search
                    </h2>
                    <p className="text-sand-600 text-xl font-light">
                        Access our database of local businesses that need your web development services.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/auth?mode=signup"
                            className="inline-flex px-10 py-5 rounded-xl bg-sand-900 text-white font-semibold text-lg hover:bg-sand-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

