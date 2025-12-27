export default function PricingPage() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for trying out MarketCompassZ',
            features: [
                '10 leads per month',
                'Google Maps integration',
                'Basic filters',
                'Dashboard access',
                'Community support',
            ],
            cta: 'Get Started Free',
            href: '/',
            highlighted: false,
        },
        {
            name: 'Pro',
            price: '$29',
            period: 'per month',
            description: 'For serious freelancers and agencies',
            features: [
                'Unlimited leads',
                'Advanced AI filtering',
                'Priority processing',
                'Export to CSV',
                'Email support',
                'Custom integrations',
                'Analytics dashboard',
            ],
            cta: 'Start Pro Trial',
            href: '/',
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact us',
            description: 'For teams and large agencies',
            features: [
                'Everything in Pro',
                'Dedicated account manager',
                'Custom AI training',
                'API access',
                'White-label options',
                'SLA guarantee',
                'Phone support',
            ],
            cta: 'Contact Sales',
            href: '/contact',
            highlighted: false,
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Start free, scale as you grow. No hidden fees.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`card relative ${plan.highlighted ? 'ring-2 ring-primary-500 scale-105' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                    <div className="mb-2">
                                        <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">{plan.period}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <span className="text-accent-400 flex-shrink-0">✓</span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={plan.href}
                                    className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.highlighted
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 bg-black/20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-center gradient-text mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I cancel anytime?',
                                a: 'Yes! Cancel your subscription at any time. No questions asked, no long-term contracts.',
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.',
                            },
                            {
                                q: 'Is there a free trial for Pro?',
                                a: 'Yes! All Pro plans come with a 14-day free trial. No credit card required.',
                            },
                            {
                                q: 'How does the lead limit work?',
                                a: 'Leads are counted when the AI agent successfully finds and saves a business without a website to your dashboard.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="card">
                                <h4 className="text-lg font-semibold text-primary-300 mb-2">{faq.q}</h4>
                                <p className="text-gray-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">
                        Still Have Questions?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Contact our team for custom solutions and enterprise pricing
                    </p>
                    <a href="/contact" className="btn-primary text-lg px-8 py-4 inline-block">
                        Contact Sales
                    </a>
                </div>
            </section>
        </div>
    );
}
