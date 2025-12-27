'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/firebase/auth';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Docs', href: '/docs' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo.svg"
                            alt="MarketCompassZ"
                            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-xl font-bold gradient-text hidden sm:inline">
                            MarketCompassZ
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-400 ${isActive(link.href) ? 'text-primary-400' : 'text-gray-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <Link href="/dashboard" className="btn-primary py-2 px-4 text-sm">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/" className="btn-primary py-2 px-4 text-sm">
                                Get Started
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2 animate-slide-up">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 rounded-lg transition-colors ${isActive(link.href)
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 px-4">
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary w-full text-center block py-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary w-full text-center block py-2"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
