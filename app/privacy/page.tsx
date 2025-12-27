export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black text-white mb-4">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: December 27, 2025</p>

                <div className="glass-card space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-300 leading-relaxed">
                            MarketCompassZ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-white mb-3 mt-4">Personal Information</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            When you create an account, we collect:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Name and email address (via Google Authentication)</li>
                            <li>Profile information (occupation, location, bio - if provided)</li>
                            <li>Account credentials and authentication tokens</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3 mt-4">Usage Data</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We automatically collect:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Search queries and filters used</li>
                            <li>Businesses you view, save, or interact with</li>
                            <li>Device information (browser type, OS, IP address)</li>
                            <li>Usage patterns and feature interactions</li>
                            <li>Log data and error reports</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3 mt-4">Third-Party Data</h3>
                        <p className="text-gray-300 leading-relaxed">
                            We retrieve publicly available business information from Google Maps API and other public sources. This data is not personal information about you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">We use collected information to:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Provide, operate, and maintain the Service</li>
                            <li>Improve and personalize user experience</li>
                            <li>Process your searches and deliver results</li>
                            <li>Save your preferences and search history</li>
                            <li>Send service-related communications</li>
                            <li>Detect, prevent, and address technical issues</li>
                            <li>Analyze usage patterns to improve features</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>

                        <p className="text-gray-300 leading-relaxed mb-3">
                            We do NOT sell your personal information. We may share information with:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3 mt-4">Service Providers</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                            <li>Google (Firebase, Maps API, Gemini AI)</li>
                            <li>Hosting and infrastructure providers</li>
                            <li>Analytics services</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Legal Requirements</h3>
                        <p className="text-gray-300 leading-relaxed">
                            We may disclose information if required by law, court order, or to protect our rights and safety.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We implement industry-standard security measures:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Encryption in transit (HTTPS/TLS)</li>
                            <li>Secure authentication via Google OAuth</li>
                            <li>Firebase security rules for data access control</li>
                            <li>Regular security audits and updates</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-3">
                            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Maintain your session and authentication</li>
                            <li>Remember your preferences</li>
                            <li>Analyze site traffic and usage</li>
                            <li>Improve Service functionality</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-3">
                            You can control cookies through your browser settings, but this may affect Service functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Depending on your location, you may have rights to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                            <li><strong className="text-white">Correction:</strong> Update inaccurate information</li>
                            <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong className="text-white">Portability:</strong> Export your data in a machine-readable format</li>
                            <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-3">
                            To exercise these rights, contact us at privacy@marketcompassz.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We retain your personal information for as long as your account is active or as needed to provide services. After account deletion, we may retain some data for legal, security, or business purposes as permitted by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The Service is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Links</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The Service may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Policy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may update this Privacy Policy periodically. We will notify you of significant changes via email or prominent notice on the Service. Continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed mb-2">
                            If you have questions or concerns about this Privacy Policy, contact us at:
                        </p>
                        <p className="text-cyan-400">privacy@marketcompassz.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
