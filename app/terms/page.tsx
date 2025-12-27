export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black text-white mb-4">Terms of Service</h1>
                <p className="text-gray-400 mb-8">Last updated: December 27, 2025</p>

                <div className="glass-card space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            By accessing and using MarketCompassZ ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            MarketCompassZ provides an AI-powered lead generation platform that helps users discover businesses without digital presence through Google Maps integration and artificial intelligence.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            The Service includes but is not limited to: business search functionality, AI-powered qualification, data aggregation from public sources, and lead management tools.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            You must create an account to use certain features of the Service. You are responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use</li>
                            <li>Ensuring you are at least 18 years of age</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">You agree NOT to:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Use the Service for any illegal or unauthorized purpose</li>
                            <li>Violate any laws in your jurisdiction</li>
                            <li>Use the Service to spam, harass, or harm others</li>
                            <li>Attempt to gain unauthorized access to the Service</li>
                            <li>Resell, redistribute, or commercialize data obtained from the Service without permission</li>
                            <li>Use automated systems to scrape or extract data beyond normal use</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Usage and API Compliance</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            The Service uses Google Maps API and other third-party services. You agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Comply with Google Maps Platform Terms of Service</li>
                            <li>Use business data obtained through the Service ethically and legally</li>
                            <li>Respect business owners' privacy and communication preferences</li>
                            <li>Follow applicable anti-spam and marketing laws (CAN-SPAM, GDPR, etc.)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The Service and its original content, features, and functionality are owned by MarketCompassZ and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
                        <p className="text-gray-300 leading-relaxed">
                            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee the accuracy, completeness, or timeliness of business data. Use of the Service is at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            MarketCompassZ shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="text-cyan-400 mt-2">support@marketcompassz.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
