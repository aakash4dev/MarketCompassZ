export default function HowItWorksPage() {
    const steps = [
        {
            number: '01',
            title: 'Sign In',
            description: 'Authenticate with your Google account for instant access',
            icon: '🔐',
            details: 'Secure Google OAuth authentication. No complex setup required.',
        },
        {
            number: '02',
            title: 'Define Your Target',
            description: 'Enter your niche (e.g., "bakery") and target city',
            icon: '🎯',
            details: 'Specify exactly what type of businesses you want to find and where.',
        },
        {
            number: '03',
            title: 'AI Agent Searches',
            description: 'Our AI agent scans Google Maps for matching businesses',
            icon: '🤖',
            details: 'Autonomous multi-step workflow powered by Gemini 1.5 Pro.',
        },
        {
            number: '04',
            title: 'Filter & Qualify',
            description: 'Automatically filters out businesses that already have websites',
            icon: '🔍',
            details: 'Only shows you the perfect prospects who need your services.',
        },
        {
            number: '05',
            title: 'Real-Time Results',
            description: 'Leads appear on your dashboard instantly as they\'re found',
            icon: '⚡',
            details: 'Live updates via Firebase Firestore. No refresh needed.',
        },
        {
            number: '06',
            title: 'Take Action',
            description: 'Copy details, open in Maps, and reach out to your leads',
            icon: '🚀',
            details: 'One-click actions to streamline your outreach process.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-500/10 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                        How It Works
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        From sign-in to leads in minutes. MarketCompassZ automates the entire lead generation process.
                    </p>
                </div>
            </section>

            {/* Steps Timeline */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row gap-6 items-start group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Number Badge */}
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                                        {step.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 card">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="text-4xl">{step.icon}</span>
                                        <h3 className="text-2xl font-bold text-primary-300">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-lg text-gray-300 mb-3">
                                        {step.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {step.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 px-4 bg-black/20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center gradient-text mb-12">
                        Powered By Industry-Leading Technology
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: 'Google ADK', description: 'AI Agent Development Kit' },
                            { name: 'Gemini 1.5 Pro', description: 'Advanced LLM' },
                            { name: 'Firebase', description: 'Auth & Database' },
                            { name: 'Google Maps', description: 'Places API' },
                        ].map((tech, index) => (
                            <div key={index} className="card text-center">
                                <h4 className="text-lg font-semibold text-white mb-2">{tech.name}</h4>
                                <p className="text-sm text-gray-400">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">
                        See It In Action
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Try it yourself - it's free to get started
                    </p>
                    <a href="/" className="btn-primary text-lg px-8 py-4 inline-block">
                        Start Generating Leads
                    </a>
                </div>
            </section>
        </div>
    );
}
