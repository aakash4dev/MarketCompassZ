'use client';

import { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus({
                    type: 'success',
                    text: data.mode === 'demo'
                        ? "Message received! (Demo mode — no email service configured, so this was logged server-side rather than emailed. Add RESEND_API_KEY to send real emails.)"
                        : "Message sent! We'll get back to you soon.",
                });
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setStatus({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Questions, feedback, or want to collaborate? Send a message and we&apos;ll respond as soon as we can.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="md:col-span-3 glass-card space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input"
                                    placeholder="Jane Doe"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    placeholder="you@example.com"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="input"
                                placeholder="How can we help?"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input resize-none"
                                placeholder="Tell us what's on your mind..."
                                disabled={isLoading}
                            />
                        </div>

                        {status && (
                            <div className={`p-4 rounded-lg text-sm ${status.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/50 text-green-300'
                                : 'bg-red-500/10 border border-red-500/50 text-red-300'
                                }`}>
                                {status.text}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </span>
                            ) : 'Send Message'}
                        </button>
                    </form>

                    {/* Sidebar */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-400" />
                                Other ways to reach us
                            </h3>
                            <div className="space-y-4">
                                <a href="mailto:aakash4dev.crypto@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-sm">aakash4dev.crypto@gmail.com</span>
                                </a>
                                <a href="https://github.com/aakash4dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                    <span className="text-sm">github.com/aakash4dev</span>
                                </a>
                                <a href="https://twitter.com/aakash4dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                    <span className="text-sm">@aakash4dev</span>
                                </a>
                                <a href="https://linkedin.com/in/aakash4dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                    <span className="text-sm">linkedin.com/in/aakash4dev</span>
                                </a>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                We typically respond within 1-2 business days. For urgent issues, reach out on GitHub or Twitter directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
