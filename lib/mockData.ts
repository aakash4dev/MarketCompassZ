// Mock data for MarketCompassZ demo

export interface Campaign {
    id: string;
    title: string;
    description: string;
    image: string;
    slayScore: number;
    creator: string;
    creatorAvatar: string;
    category: string;
    sentiment: 'bullish' | 'neutral' | 'bearish';
    createdAt: string;
    tags: string[];
}

export interface Strategist {
    id: string;
    name: string;
    avatar: string;
    slayScore: number;
    campaigns: number;
    rank: number;
}

export interface MarketTicker {
    id: string;
    text: string;
    type: 'campaign' | 'sentiment' | 'trend';
}

export interface SentimentData {
    timestamp: number;
    value: number;
    label: string;
}

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
    {
        id: 'camp-1',
        title: 'AI-Powered SaaS Launch',
        description: 'Complete marketing strategy for B2B SaaS targeting enterprise AI adoption',
        image: '/api/placeholder/400/300',
        slayScore: 9850,
        creator: 'Sarah Chen',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'B2B Tech',
        sentiment: 'bullish',
        createdAt: '2025-01-15',
        tags: ['AI', 'Enterprise', 'SaaS'],
    },
    {
        id: 'camp-2',
        title: 'Viral TikTok Campaign',
        description: 'Gen-Z targeting strategy with influencer partnerships and trend riding',
        image: '/api/placeholder/400/300',
        slayScore: 8920,
        creator: 'Marcus Rivera',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'Social Media',
        sentiment: 'bullish',
        createdAt: '2025-01-14',
        tags: ['Social', 'Viral', 'GenZ'],
    },
    {
        id: 'camp-3',
        title: 'FinTech Product Launch',
        description: 'Multi-channel strategy for cryptocurrency wallet targeting millennials',
        image: '/api/placeholder/400/300',
        slayScore: 7650,
        creator: 'Alex Kim',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'FinTech',
        sentiment: 'neutral',
        createdAt: '2025-01-13',
        tags: ['Crypto', 'Finance', 'Mobile'],
    },
    {
        id: 'camp-4',
        title: 'E-commerce Holiday Campaign',
        description: 'Seasonal marketing blitz with AI-optimized ad copy and targeting',
        image: '/api/placeholder/400/300',
        slayScore: 9200,
        creator: 'Emma Davis',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'E-commerce',
        sentiment: 'bullish',
        createdAt: '2025-01-12',
        tags: ['Retail', 'Holiday', 'Performance'],
    },
    {
        id: 'camp-5',
        title: 'Healthcare App Awareness',
        description: 'Trust-building campaign for mental health app with testimonials',
        image: '/api/placeholder/400/300',
        slayScore: 6800,
        creator: 'Dr. Priya Sharma',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'Healthcare',
        sentiment: 'neutral',
        createdAt: '2025-01-11',
        tags: ['Health', 'Wellness', 'Mobile'],
    },
    {
        id: 'camp-6',
        title: 'Gaming Platform Hype',
        description: 'Pre-launch buzz generation for competitive gaming platform',
        image: '/api/placeholder/400/300',
        slayScore: 8100,
        creator: 'Tyler Johnson',
        creatorAvatar: '/api/placeholder/40/40',
        category: 'Gaming',
        sentiment: 'bullish',
        createdAt: '2025-01-10',
        tags: ['Gaming', 'Esports', 'Community'],
    },
];

// Mock Strategists
export const mockStrategists: Strategist[] = [
    { id: '1', name: 'Sarah Chen', avatar: '/api/placeholder/40/40', slayScore: 9850, campaigns: 23, rank: 1 },
    { id: '2', name: 'Emma Davis', avatar: '/api/placeholder/40/40', slayScore: 9200, campaigns: 19, rank: 2 },
    { id: '3', name: 'Marcus Rivera', avatar: '/api/placeholder/40/40', slayScore: 8920, campaigns: 31, rank: 3 },
    { id: '4', name: 'Tyler Johnson', avatar: '/api/placeholder/40/40', slayScore: 8100, campaigns: 15, rank: 4 },
    { id: '5', name: 'Alex Kim', avatar: '/api/placeholder/40/40', slayScore: 7650, campaigns: 12, rank: 5 },
];

// Mock Market Ticker
export const mockMarketTicker: MarketTicker[] = [
    { id: '1', text: 'AI-Generated Campaign for "TechBrand" reaching 1M impressions...', type: 'campaign' },
    { id: '2', text: 'Market Sentiment: Bullish on GenAI Marketing...', type: 'sentiment' },
    { id: '3', text: 'Trending: Voice-First Search Optimization...', type: 'trend' },
    { id: '4', text: 'New Strategy Created: E-commerce Holiday Blitz...', type: 'campaign' },
    { id: '5', text: 'Market Alert: LinkedIn Engagement Up 47%...', type: 'sentiment' },
    { id: '6', text: 'Top Performing: Short-Form Video Content...', type: 'trend' },
];

// Mock Sentiment Data (last 24 hours)
export const mockSentimentData: SentimentData[] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: Date.now() - (23 - i) * 3600000,
    value: 50 + Math.sin(i * 0.5) * 30 + Math.random() * 10,
    label: `${i}:00`,
}));

// Mock Analytics Data
export const mockAnalytics = {
    totalCampaigns: 156,
    totalUsers: 1243,
    tokensSpent: 2847392,
    avgSlayScore: 7842,
    tokensByModel: {
        'GPT-4o': 1200000,
        'Gemini Pro': 980000,
        'Stable Diffusion': 667392,
    },
    revenueByDay: Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        revenue: 500 + Math.random() * 500,
        tokens: 100000 + Math.random() * 50000,
    })),
};
