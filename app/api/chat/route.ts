import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from '@googlemaps/google-maps-services-js';
import { NextResponse } from 'next/server';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize Google Maps Client
const mapsClient = new Client({});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                content: "I'm having trouble connecting to my brain (Gemini API Key missing). Please check your configuration.",
                leads: []
            });
        }

        // 1. Analyze user intent with Gemini
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
        const response = result.response;
        const text = response.text();

        let analysis;
        try {
            // Clean up code blocks if present
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            analysis = JSON.parse(cleanJson);
        } catch (e) {
            console.error('Failed to parse Gemini response:', text);
            // Fallback for non-lead queries
            return NextResponse.json({
                content: "I'm not sure I understood that. Could you try asking for businesses in a specific city? e.g., 'Find dentists in Miami'",
                leads: []
            });
        }

        if (!analysis.isLeadQuery) {
            // Just a chat message
            const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const chatResult = await chatModel.generateContent(`User said: "${message}". Respond helpfully as an AI Lead Gen assistant.`);
            return NextResponse.json({
                content: chatResult.response.text(),
                leads: []
            });
        }

        // 2. Search Google Maps (or Mock if billing fails)
        let leads: any[] = [];
        let location = analysis.location || 'New York'; // Default if missing

        try {
            if (!process.env.GOOGLE_MAPS_API_KEY) {
                throw new Error('No Maps API Key');
            }

            // Geocode location to get lat/lng
            const geocodeRes = await mapsClient.geocode({
                params: {
                    address: location,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });

            if (geocodeRes.data.results.length > 0) {
                const { lat, lng } = geocodeRes.data.results[0].geometry.location;

                // Search for places
                const placesRes = await mapsClient.textSearch({
                    params: {
                        query: analysis.keyword,
                        location: { lat, lng },
                        radius: 5000,
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                });

                // Transform to our Lead format
                leads = placesRes.data.results
                    .filter(place => place.rating && place.rating >= (analysis.minRating || 0))
                    .slice(0, 5) // Limit to 5 for demo
                    .map(place => ({
                        name: place.name,
                        address: place.formatted_address,
                        rating: place.rating,
                        reviews: place.user_ratings_total,
                        category: analysis.keyword, // Simplified
                        place_id: place.place_id
                    }));
            }

        } catch (error: any) {
            console.error('Google Maps API Error:', error.message);
            // Fallback to Mock Data if API fails (e.g. billing issue)
            console.log('Falling back to mock data due to API error');
            leads = [
                {
                    name: `Top ${analysis.keyword} Pro`,
                    address: `123 Main St, ${location}`,
                    rating: 4.8,
                    reviews: 124,
                    category: analysis.keyword
                },
                {
                    name: `${location} Best ${analysis.keyword}`,
                    address: `456 Market Ave, ${location}`,
                    rating: 4.5,
                    reviews: 89,
                    category: analysis.keyword
                },
                {
                    name: `Elite ${analysis.keyword} Services`,
                    address: `789 Broadway, ${location}`,
                    rating: 4.2,
                    reviews: 56,
                    category: analysis.keyword
                }
            ];
        }

        // 3. Generate Summary Response
        const summaryPrompt = `
User asked: "${message}"
I found ${leads.length} results.
Leads: ${JSON.stringify(leads.map(l => l.name))}

Write a short, enthusiastic response introducing these results. Mention that I've found some great matches without websites (simulated).
`;
        const summaryResult = await model.generateContent(summaryPrompt);

        return NextResponse.json({
            content: summaryResult.response.text(),
            leads: leads
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            content: "Sorry, I ran into a glitch processing your request.",
            leads: []
        }, { status: 500 });
    }
}
