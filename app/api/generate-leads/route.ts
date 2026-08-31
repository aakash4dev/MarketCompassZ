import { NextRequest, NextResponse } from 'next/server';
import { runLeadGenerationAgent } from '@/lib/adk/agent';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, city, userId } = body;

        // Validate input
        if (!niche || !city || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields: niche, city, userId' },
                { status: 400 }
            );
        }

        // GOOGLE_MAPS_API_KEY is optional — the agent (via lib/maps/search.ts)
        // gracefully falls back to a realistic mock generator when it's absent
        // or the live call fails, so this endpoint always succeeds.
        const result = await runLeadGenerationAgent({
            niche,
            city,
            mapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        });

        // Persistence happens client-side (see components/LeadGenerationForm.tsx),
        // which keeps this route stateless and works identically whether Firestore
        // is configured or the app is running on the local mock leads store.
        return NextResponse.json({
            success: true,
            leads: result.leads,
            totalSearched: result.totalSearched,
            leadsFound: result.leadsFound,
            usedMockData: result.usedMockData,
            errors: result.errors,
        });
    } catch (error) {
        console.error('[API] Error in generate-leads:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
