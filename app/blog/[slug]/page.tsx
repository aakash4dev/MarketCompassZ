'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';
import ReactMarkdown from 'react-markdown';

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                    <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <article className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
                            {post.category}
                        </span>
                        <span className="text-gray-400 text-sm">{post.readTime}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={`/${post.image}.png`}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="glass-card">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-white mb-4 mt-8" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />,
                                p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-white/10 px-2 py-1 rounded text-cyan-400 text-sm" {...props} />,
                                pre: ({ node, ...props }) => <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                                a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4" {...props} />,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Author Box */}
                <div className="mt-12 glass-card flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                        {post.author.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">{post.author}</h3>
                        <p className="text-gray-400 text-sm">
                            Developer advocate and lead generation expert, helping developers find their next clients faster.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center glass-card">
                    <h2 className="text-3xl font-black text-white mb-4">
                        Ready to Find Your Leads?
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Put these strategies into action with MarketCompassZ
                    </p>
                    <Link
                        href="/"
                        className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                        Start Finding Leads
                    </Link>
                </div>
            </article>
        </div>
    );
}
