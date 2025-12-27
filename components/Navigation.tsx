'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOut } from '@/lib/firebase/auth';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Navigation() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut();
    };

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Discovery', href: '/discovery' },
        { label: 'Toppers', href: '/toppers' },
        { label: 'Blog', href: '/blog' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-space-950/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Logo size={40} className="transform group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xl font-black gradient-text hidden sm:block">MarketCompassZ</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors ${pathname === link.href
                                    ? 'text-indigo-400'
                                    : 'text-gray-300 hover:text-indigo-400'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoading ? (
                            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        ) : user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-300" />
                                </button>

                                {/* Dropdown Menu */}
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 glass-card border border-white/20 rounded-lg shadow-xl">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 rounded-t-lg transition-colors"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            Profile Settings
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setProfileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/10 rounded-b-lg transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth"
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors text-sm font-semibold"
                                >
                                    Signup | Login
                                </Link>
                                <Link
                                    href="/auth?mode=signup"
                                    className="btn-primary text-sm"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-space-900/95 backdrop-blur-lg border-t border-white/10">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block text-base font-semibold ${pathname === link.href ? 'text-indigo-400' : 'text-gray-300'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block w-full px-4 py-3 rounded-lg text-center bg-gray-100 text-gray-900 font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-3 rounded-lg text-center border border-gray-300 text-gray-700 font-semibold"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth"
                                        className="block w-full px-4 py-3 rounded-lg text-center border border-gray-300 text-gray-700 font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth?mode=signup"
                                        className="block w-full px-4 py-3 rounded-lg text-center bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
