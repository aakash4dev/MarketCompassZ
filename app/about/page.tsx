import Link from 'next/link';
import Image from 'next/image';
import { Target, Zap, Users, Github, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'About | MarketCompassZ',
    description: 'The story, mission, and tech stack behind MarketCompassZ — an AI-powered lead generation platform for developers.',
};

const values = [
    {
        icon: <Target className="w-6 h-6" />,
        title: 'Purpose-Built',
        description: 'Every feature exists to solve one problem: helping developers and agencies find businesses that genuinely need a website.',
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'AI-First',
        description: 'Google ADK and Gemini power the search reasoning, so you describe what you want in plain English instead of clicking through filters.',
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: 'Built in the Open',
        description: 'MarketCompassZ is open source (MIT licensed) — fork it, self-host it, or contribute back.',
    },
];

const stack = [
    'Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Firebase (Auth + Firestore)',
    'Google Gemini AI', 'Google Maps Places API', 'Framer Motion', 'Recharts',
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">Built for the GenAI Hackathon Delhi</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                        About <span className="gradient-text">MarketCompassZ</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Millions of small businesses still don&apos;t have a website. MarketCompassZ is an autonomous
                        AI agent that finds them for you — so freelancers and agencies can spend their time
                        building, not searching.
                    </p>
                </div>

                {/* Mission */}
                <div className="glass-card mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Manually browsing Google Maps for businesses without websites is slow, repetitive, and doesn&apos;t scale.
                        We built MarketCompassZ to automate that entire workflow: describe your ideal client in plain
                        language, and an AI agent scans real business data, filters out anyone who already has a
                        website, and hands you a ready-to-pitch lead list — with CSV export for your own outreach
                        tools.
                    </p>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {values.map((value, i) => (
                        <div key={i} className="glass rounded-2xl p-6 border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>

                {/* Founder */}
                <div className="glass-card mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Who Built This</h2>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Image
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash-Singh-Rajput&backgroundColor=6366f1,ec4899&backgroundType=gradientLinear"
                            alt="Aakash Singh Rajput"
                            width={112}
                            height={112}
                            className="w-28 h-28 rounded-2xl border-2 border-white/10 shrink-0"
                            unoptimized
                        />
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl font-bold text-white">Aakash Singh Rajput</h3>
                            <p className="text-cyan-400 text-sm font-semibold mb-3">Creator & Maintainer</p>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Full-stack developer building AI-powered tools for developers and small businesses.
                                MarketCompassZ started as a hackathon project and grew into a full product exploring
                                what autonomous agents can do for lead generation.
                            </p>
                            <a
                                href="https://github.com/aakash4dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                github.com/aakash4dev
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="glass-card mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
                    <div className="flex flex-wrap gap-3">
                        {stack.map((tech) => (
                            <span key={tech} className="badge">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass rounded-3xl p-10 border border-white/10">
                    <h2 className="text-3xl font-black text-white mb-3">Want to see it in action?</h2>
                    <p className="text-gray-400 mb-6">Try the live AI demo right on the homepage — no sign-up required.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth?mode=signup" className="btn-primary">Get Started Free</Link>
                        <Link href="/contact" className="btn-secondary">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
