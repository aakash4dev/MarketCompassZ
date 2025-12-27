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

        // Get API key from environment
        const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!mapsApiKey) {
            return NextResponse.json(
                { error: 'Google Maps API key not configured' },
                { status: 500 }
            );
        }

        // Run the agent asynchronously
        // In production, this should be a background job/cloud function
        const agentPromise = runLeadGenerationAgent({
            niche,
            city,
            userId,
            mapsApiKey,
        });

        // Don't await - let it run in background
        agentPromise
            .then((result) => {
                console.log('[API] Lead generation complete:', result);
            })
            .catch((error) => {
                console.error('[API] Lead generation failed:', error);
            });

        return NextResponse.json({
            success: true,
            message: 'Lead generation started. Results will appear in real-time.',
        });
    } catch (error) {
        console.error('[API] Error in generate-leads:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
