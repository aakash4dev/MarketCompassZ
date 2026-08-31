import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { isGeminiConfigured, isMapsConfigured } from '@/lib/env';
import { searchPlaces, hasWebsite } from '@/lib/maps/search';

// Only construct the Gemini client when a real key is present — the SDK throws
// on some invalid-key shapes even before a network call is made.
const genAI = isGeminiConfigured ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string) : null;

interface QueryAnalysis {
    isLeadQuery: boolean;
    keyword: string;
    location: string | null;
    minRating: number;
}

const NICHE_KEYWORDS = [
    'plumber', 'plumbers', 'restaurant', 'restaurants', 'salon', 'salons', 'dentist', 'dentists',
    'gym', 'gyms', 'cafe', 'cafes', 'coffee shop', 'electrician', 'electricians', 'lawyer', 'lawyers',
    'accountant', 'accountants', 'contractor', 'contractors', 'landscaper', 'landscapers', 'mechanic',
    'mechanics', 'auto repair', 'barber', 'barbers', 'spa', 'spas', 'cleaner', 'cleaning service',
    'roofer', 'roofers', 'hvac', 'veterinarian', 'vet', 'real estate agent', 'realtor', 'bakery',
    'photographer', 'florist', 'chiropractor', 'physical therapist', 'tutor', 'consultant', 'business',
    'businesses',
];

/**
 * Lightweight, dependency-free heuristic used whenever GEMINI_API_KEY isn't
 * configured (or looks like a placeholder). It extracts a niche keyword and a
 * location from the raw message with simple regex/keyword matching so the
 * lead-search experience still works end-to-end without any AI key.
 */
function heuristicAnalyze(message: string): QueryAnalysis {
    const lower = message.toLowerCase();

    const keyword = NICHE_KEYWORDS.find((k) => lower.includes(k)) || 'businesses';

    // "... in <Location>" — take everything after the last " in " up to punctuation.
    const inMatch = lower.match(/\bin\s+([a-z\s,]+?)(?:$|[.,!?]|\bwith\b|\bthat\b|\bwithout\b)/);
    const location = inMatch ? inMatch[1].trim().replace(/\s+/g, ' ') : null;

    const ratingMatch = lower.match(/(\d(?:\.\d)?)\s*\+?\s*star/);
    const minRating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;

    const leadIntentWords = ['find', 'search', 'looking for', 'show me', 'need', 'leads', 'businesses', ...NICHE_KEYWORDS];
    const isLeadQuery = leadIntentWords.some((w) => lower.includes(w));

    return { isLeadQuery, keyword, location, minRating };
}

function summarizeWithoutGemini(keyword: string, location: string, count: number): string {
    if (count === 0) {
        return `I couldn't find any ${keyword} in ${location} right now — try a different niche or city.`;
    }
    return `Found ${count} ${keyword} in ${location} that currently have no website — these are prime prospects, ready to pitch. (Running in demo mode: add a GEMINI_API_KEY to unlock AI-written summaries.)`;
}

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        if (!message || typeof message !== 'string') {
            return NextResponse.json({ content: 'Please send a message to search for leads.', leads: [] }, { status: 400 });
        }

        // 1. Analyze user intent — with Gemini when configured, otherwise a local heuristic.
        let analysis: QueryAnalysis;
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const analysisPrompt = `
You are an expert lead generation assistant. Analyze this user query: "${message}"

Extract the following information in JSON format:
{
    "isLeadQuery": boolean, // true if user is looking for businesses/leads
    "keyword": string, // e.g., "plumbers", "restaurants"
    "location": string, // e.g., "New York", "Chicago", or null if not found
    "minRating": number // e.g., 4.0, or 0 if not specified
}
Do not include markdown formatting, just the raw JSON string.`;

                const result = await model.generateContent(analysisPrompt);
                const text = result.response.text();
                const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
                analysis = JSON.parse(cleanJson);
            } catch (e) {
                console.error('Gemini analysis failed, falling back to heuristic:', e);
                analysis = heuristicAnalyze(message);
            }
        } else {
            analysis = heuristicAnalyze(message);
        }

        if (!analysis.isLeadQuery) {
            if (genAI) {
                try {
                    const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                    const chatResult = await chatModel.generateContent(`User said: "${message}". Respond helpfully as an AI Lead Gen assistant.`);
                    return NextResponse.json({ content: chatResult.response.text(), leads: [] });
                } catch (e) {
                    console.error('Gemini chat failed:', e);
                }
            }
            return NextResponse.json({
                content: "I'm not sure I understood that. Try asking for businesses in a specific city, e.g. \"Find dentists in Miami\" or \"Show me restaurants in Austin without websites\".",
                leads: [],
            });
        }

        // 2. Search Google Maps (or the local mock generator — see lib/maps/search.ts)
        const location = analysis.location || 'New York';
        const places = await searchPlaces(analysis.keyword, location, process.env.GOOGLE_MAPS_API_KEY || '');
        const leads = places
            .filter((place) => !hasWebsite(place))
            .filter((place) => !analysis.minRating || (place.rating || 0) >= analysis.minRating)
            .slice(0, 6)
            .map((place) => ({
                name: place.name,
                address: place.address,
                phone: place.phone,
                rating: place.rating,
                reviews: place.reviews,
                category: analysis.keyword,
            }));

        // 3. Generate a natural-language summary — Gemini when available, canned text otherwise.
        let content: string;
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const summaryPrompt = `
User asked: "${message}"
I found ${leads.length} results.
Leads: ${JSON.stringify(leads.map((l) => l.name))}

Write a short, enthusiastic response introducing these results. Mention that I've found some great matches without websites.`;
                const summaryResult = await model.generateContent(summaryPrompt);
                content = summaryResult.response.text();
            } catch (e) {
                console.error('Gemini summary failed, using canned response:', e);
                content = summarizeWithoutGemini(analysis.keyword, location, leads.length);
            }
        } else {
            content = summarizeWithoutGemini(analysis.keyword, location, leads.length);
        }

        return NextResponse.json({
            content,
            leads,
            usedMockMaps: !isMapsConfigured,
            usedMockGemini: !isGeminiConfigured,
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            content: "Sorry, I ran into a glitch processing your request. Please try again.",
            leads: [],
        }, { status: 500 });
    }
}
