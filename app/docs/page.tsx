import Link from 'next/link';

export const metadata = {
    title: 'Documentation | MarketCompassZ',
    description: 'Setup guide, environment variables, architecture, and API reference for MarketCompassZ.',
};

const sections = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'zero-setup', label: 'Zero-Setup Mode' },
    { id: 'env-vars', label: 'Environment Variables' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'deployment', label: 'Deployment' },
];

const envVars = [
    { name: 'NEXT_PUBLIC_FIREBASE_*', required: false, description: 'Firebase project config. Missing/placeholder ⇒ auth & leads use the local mock (localStorage) automatically.' },
    { name: 'FIREBASE_PROJECT_ID / PRIVATE_KEY / CLIENT_EMAIL', required: false, description: 'Firebase Admin SDK service account, for server-side Firestore access (optional).' },
    { name: 'GEMINI_API_KEY', required: false, description: 'Google Gemini API key. Missing ⇒ chat/lead search falls back to a local keyword-matching heuristic.' },
    { name: 'GOOGLE_MAPS_API_KEY', required: false, description: 'Google Places API key. Missing ⇒ lead search falls back to a realistic mock business generator.' },
    { name: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY', required: false, description: 'reCAPTCHA v2 site key for the auth page. Missing ⇒ reCAPTCHA step is skipped entirely.' },
    { name: 'RESEND_API_KEY', required: false, description: 'Resend.com API key for the contact form. Missing ⇒ messages are logged server-side instead of emailed.' },
    { name: 'CONTACT_EMAIL_TO', required: false, description: 'Destination address for contact form submissions (defaults to the maintainer\'s email).' },
];

const endpoints = [
    { method: 'POST', path: '/api/chat', description: 'Conversational lead search. Analyzes the message (Gemini or local heuristic), searches Maps (or mock data), returns a summary + lead list.' },
    { method: 'POST', path: '/api/generate-leads', description: 'Runs the lead-generation agent for a given niche + city, returns matching businesses without a website.' },
    { method: 'POST', path: '/api/contact', description: 'Sends a contact form submission via Resend, or logs it server-side in demo mode.' },
    { method: 'GET', path: '/api/status', description: 'Reports which integrations (Firebase, Gemini, Maps, Email) are configured with real credentials vs. running on mocks.' },
];

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_1fr] gap-10">
                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-1">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">On this page</p>
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Content */}
                <div className="min-w-0">
                    <h1 className="text-5xl font-black text-white mb-4">Documentation</h1>
                    <p className="text-gray-400 mb-12 text-lg">
                        Everything you need to run, configure, and extend MarketCompassZ.
                    </p>

                    <section id="getting-started" className="scroll-mt-24 mb-14">
                        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
                        <div className="glass-card space-y-4">
                            <p className="text-gray-300">Clone the repo and install dependencies:</p>
                            <pre className="bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-cyan-300 overflow-x-auto">
{`git clone https://github.com/aakash4dev/MarketCompassZ.git
cd MarketCompassZ
npm install
cp .env.example .env.local
npm run dev`}
                            </pre>
                            <p className="text-gray-300">
                                Open <code className="text-cyan-300">http://localhost:3000</code>. That&apos;s it — no API keys are required to explore
                                every feature; see <a href="#zero-setup" className="text-indigo-400 hover:text-indigo-300">Zero-Setup Mode</a> below.
                            </p>
                        </div>
                    </section>

                    <section id="zero-setup" className="scroll-mt-24 mb-14">
                        <h2 className="text-2xl font-bold text-white mb-4">Zero-Setup Mode</h2>
                        <div className="glass-card space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                                Every external integration in MarketCompassZ is optional. When a credential is missing or still
                                set to its placeholder value, the relevant feature automatically switches to a local fallback:
                            </p>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">Auth</strong> — accounts are stored in the browser&apos;s localStorage instead of Firebase Authentication. Google Sign-In signs you into a stable demo identity.</span></li>
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">Leads</strong> — saved to localStorage instead of Firestore, with the same real-time update behavior in the dashboard.</span></li>
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">AI chat/search</strong> — a local keyword-matching heuristic extracts niche + location instead of calling Gemini.</span></li>
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">Business search</strong> — a seeded mock generator returns realistic &quot;no website&quot; businesses instead of calling Google Places.</span></li>
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">Contact form</strong> — messages are logged server-side instead of emailed via Resend.</span></li>
                                <li className="flex gap-3"><span className="text-cyan-400">●</span><span><strong className="text-white">reCAPTCHA</strong> — the verification step is skipped on the auth page.</span></li>
                            </ul>
                            <p className="text-gray-400 text-sm">
                                Check the dashboard&apos;s &quot;System Status&quot; panel any time to see exactly which integrations are live vs. mocked.
                            </p>
                        </div>
                    </section>

                    <section id="env-vars" className="scroll-mt-24 mb-14">
                        <h2 className="text-2xl font-bold text-white mb-4">Environment Variables</h2>
                        <div className="glass-card overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b border-white/10">
                                        <th className="pb-3 pr-4">Variable</th>
                                        <th className="pb-3">What happens if it&apos;s missing</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {envVars.map((v) => (
                                        <tr key={v.name}>
                                            <td className="py-3 pr-4 font-mono text-cyan-300 whitespace-nowrap align-top">{v.name}</td>
                                            <td className="py-3 text-gray-400">{v.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="architecture" className="scroll-mt-24 mb-14">
                        <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
                        <div className="glass-card space-y-3 text-gray-300 leading-relaxed">
                            <p><strong className="text-white">Frontend:</strong> Next.js 15 App Router, React 19, Tailwind CSS.</p>
                            <p><strong className="text-white">Auth layer:</strong> <code className="text-cyan-300">lib/firebase/auth.ts</code> exposes a single API that transparently uses real Firebase Auth or the localStorage mock in <code className="text-cyan-300">lib/mock/localAuth.ts</code>, based on <code className="text-cyan-300">isFirebaseConfigured</code>.</p>
                            <p><strong className="text-white">Data layer:</strong> <code className="text-cyan-300">lib/firebase/firestore.ts</code> similarly unifies real Firestore and the mock store in <code className="text-cyan-300">lib/mock/mockLeads.ts</code>.</p>
                            <p><strong className="text-white">Lead-gen agent:</strong> <code className="text-cyan-300">lib/adk/agent.ts</code> orchestrates a Maps search (<code className="text-cyan-300">lib/maps/search.ts</code>) and filters out businesses that already have a website. Runs server-side via <code className="text-cyan-300">/api/generate-leads</code>; the client persists returned leads.</p>
                        </div>
                    </section>

                    <section id="api-reference" className="scroll-mt-24 mb-14">
                        <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
                        <div className="space-y-4">
                            {endpoints.map((e) => (
                                <div key={e.path} className="glass-card">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="badge">{e.method}</span>
                                        <code className="text-cyan-300 font-mono">{e.path}</code>
                                    </div>
                                    <p className="text-gray-400 text-sm">{e.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="deployment" className="scroll-mt-24 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Deployment</h2>
                        <div className="glass-card space-y-3 text-gray-300 leading-relaxed">
                            <p>Deploys cleanly to Vercel — connect the repo and set your environment variables in the project settings. The app works with zero variables set (demo mode), so you can ship a live preview immediately and layer in real credentials later.</p>
                            <p className="text-gray-400 text-sm">Note: the localStorage-based mock (auth + leads) is per-browser and won&apos;t be shared across devices or team members — configure Firebase before inviting real users.</p>
                        </div>
                    </section>

                    <div className="text-center pt-8 border-t border-white/10">
                        <p className="text-gray-400 mb-4">Still have questions?</p>
                        <Link href="/contact" className="btn-secondary">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
