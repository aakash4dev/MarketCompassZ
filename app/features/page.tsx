export default function FeaturesPage() {
    const features = [
        {
            icon: '🤖',
            title: 'AI-Powered Discovery',
            description: 'Leverages Google ADK with Gemini 1.5 Pro for intelligent lead discovery and filtering.',
            details: [
                'Multi-step reasoning workflow',
                'Natural language processing',
                'Contextual business analysis',
                'Automated quality scoring',
            ],
        },
        {
            icon: '🗺️',
            title: 'Google Maps Integration',
            description: 'Comprehensive business search using Google Maps Places API for accurate, real-time data.',
            details: [
                'Location-based search',
                'Detailed business information',
                'Contact details extraction',
                'Geographic targeting',
            ],
        },
        {
            icon: '⚡',
            title: 'Real-Time Updates',
            description: 'Firebase Firestore integration ensures leads appear on your dashboard instantly as they\'re found.',
            details: [
                'Live synchronization',
                'Instant notifications',
                'No page refresh needed',
                'Multi-device sync',
            ],
        },
        {
            icon: '🎯',
            title: 'Targeted Filtering',
            description: 'Specify your niche and location to get precisely the leads you need.',
            details: [
                'Niche-specific search',
                'City/region targeting',
                'Custom criteria',
                'Advanced filters',
            ],
        },
        {
            icon: '🔍',
            title: 'Website Detection',
            description: 'Automatically identifies businesses without a web presence - your perfect prospects.',
            details: [
                'URL verification',
                'Domain analysis',
                'Social media check',
                'Digital footprint scan',
            ],
        },
        {
            icon: '🔐',
            title: 'Secure & Private',
            description: 'Firebase Authentication with Google OAuth ensures your data is safe and secure.',
            details: [
                'Google-backed auth',
                'Encrypted data storage',
                'GDPR compliant',
                'Private user data',
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                        Powerful Features
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Everything you need to automate lead generation and find your perfect clients
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card group hover:scale-105"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-primary-300 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {feature.description}
                                </p>
                                <ul className="space-y-2">
                                    {feature.details.map((detail, i) => (
                                        <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                                            <span className="text-accent-400">✓</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Sign in with Google and start generating leads in minutes
                    </p>
                    <a href="/" className="btn-primary text-lg px-8 py-4 inline-block">
                        Get Started Free
                    </a>
                </div>
            </section>
        </div>
    );
}
