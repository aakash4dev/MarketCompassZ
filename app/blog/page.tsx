'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export default function BlogPage() {
    const categories = ['All', 'Strategy', 'Sales', 'Technical', 'Case Studies'];
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="min-h-screen pt-16 px-4 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-white mb-4">Blog</h1>
                    <p className="text-xl text-gray-400">Tips, strategies, and insights for developers</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-xl font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all group h-full">
                                {/* Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                                    <span className="text-white/50 text-6xl font-black">{post.id}</span>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-500">{post.readTime}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <span className="text-cyan-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center glass rounded-3xl p-12 border border-white/10">
                    <h2 className="text-3xl font-black text-white mb-4">
                        Ready to Find Your Next Clients?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Stop reading, start doing. Use AI to find qualified leads in minutes.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                        Try MarketCompassZ Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
