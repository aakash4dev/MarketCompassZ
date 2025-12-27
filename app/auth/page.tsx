'use client';

import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // reCAPTCHA and checkbox
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isOver18, setIsOver18] = useState(false);

    const onRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
        if (token) {
            setError(''); // Clear error when reCAPTCHA is completed
        }
    };

    const handleGoogleSignIn = async () => {
        if (!recaptchaToken || !isOver18) {
            setError('Please complete the reCAPTCHA and confirm you are over 18 years old');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Sign in error:', error);
            setError(error.message || 'Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaToken || !isOver18) {
            setError('Please complete the reCAPTCHA and confirm you are over 18 years old');
            return;
        }

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (mode === 'signup' && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            if (mode === 'signup') {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Auth error:', error);
            const errorMessage = error.code === 'auth/email-already-in-use'
                ? 'This email is already registered'
                : error.code === 'auth/invalid-email'
                    ? 'Invalid email address'
                    : error.code === 'auth/user-not-found'
                        ? 'No account found with this email'
                        : error.code === 'auth/wrong-password'
                            ? 'Incorrect password'
                            : error.message || 'Authentication failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Auth Card - Wider for large screens */}
            <div className="glass-card max-w-md lg:max-w-2xl w-full z-10 relative">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 glass-strong p-1 rounded-lg">
                    <button
                        onClick={() => {
                            setMode('login');
                            setError('');
                        }}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${mode === 'login'
                            ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            setMode('signup');
                            setError('');
                        }}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${mode === 'signup'
                            ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm mb-6">
                        {error}
                    </div>
                )}

                {/* Full Width Layout */}
                <div className="space-y-6">
                    {/* Email/Password Form */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            {mode === 'login' ? 'Login with Email' : 'Create Account'}
                        </h2>

                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {mode === 'signup' && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="input"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            )}

                            {/* reCAPTCHA and Verifications */}
                            <div className="space-y-4 pt-2">
                                {/* reCAPTCHA - Left aligned */}
                                <div>
                                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                            onChange={onRecaptchaChange}
                                            theme="dark"
                                        />
                                    ) : (
                                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-400 text-sm">
                                            reCAPTCHA site key not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your .env file.
                                        </div>
                                    )}
                                </div>

                                {/* Age Verification - Left aligned */}
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={isOver18}
                                        onChange={(e) => setIsOver18(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
                                    />
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        I am at least 18 years old
                                    </span>
                                </label>

                                {/* Newsletter Subscription - Optional */}
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="mt-1 w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
                                    />
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        Subscribe to newsletter for updates and tips
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !recaptchaToken || !isOver18}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="spinner w-6 h-6 mx-auto"></div>
                                ) : mode === 'login' ? (
                                    'Login'
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Divider */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-gray-400">or continue with</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Sign In & Benefits */}
                    <div className="space-y-6">
                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading || !recaptchaToken || !isOver18}
                            className="w-full glass-strong hover:bg-white/15 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="spinner w-6 h-6"></div>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span>Continue with Google</span>
                                </>
                            )}
                        </button>

                        {/* Benefits List - Centered Box with Left-Aligned Content */}
                        <div className="flex justify-center pt-4">
                            <div className="w-1/2 glass-strong rounded-xl p-4 border border-white/20">
                                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">Benefits of signing in</p>
                                <div className="space-y-2">
                                    {[
                                        { icon: '🎯', text: 'Personalized market insights' },
                                        { icon: '💾', text: 'Save favorite locations' },
                                        { icon: '📊', text: 'AI-powered recommendations' },
                                        { icon: '🔔', text: 'Real-time updates' }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <span className="text-xl">{feature.icon}</span>
                                            <span>{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Notice */}
                <div className="mt-6">
                    <p className="text-xs text-gray-400 text-center">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link>
                    </p>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-indigo-500/30 rounded-lg rotate-12 animate-float pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-pink-500/30 rounded-full animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-purple-500/30 rounded-lg -rotate-12 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '2s' }}></div>
        </div>
    );
}
