import { searchPlaces, PlaceResult, hasWebsite } from '@/lib/maps/search';
import { isMapsConfigured } from '@/lib/env';

export interface AgentConfig {
    niche: string;
    city: string;
    mapsApiKey?: string;
}

export interface AgentLead {
    businessName: string;
    address: string;
    phone?: string;
    location: { lat: number; lng: number };
    niche: string;
    city: string;
    hasWebsite: false;
    rating?: number;
    reviews?: number;
}

export interface AgentResult {
    totalSearched: number;
    leadsFound: number;
    leads: AgentLead[];
    errors: string[];
    /** True when results came from the local mock generator instead of the live Places API. */
    usedMockData: boolean;
}

/**
 * ADK-style agent for autonomous lead generation. Searches Google Maps
 * (or gracefully falls back to a local mock generator when GOOGLE_MAPS_API_KEY
 * isn't configured — see lib/maps/search.ts), then filters down to businesses
 * without a website. Persistence is the caller's responsibility (see
 * app/api/generate-leads/route.ts + components/LeadGenerationForm.tsx), which
 * keeps this function pure and easy to run in any environment (serverless or
 * long-running).
 */
export async function runLeadGenerationAgent(config: AgentConfig): Promise<AgentResult> {
    const { niche, city, mapsApiKey } = config;
    const result: AgentResult = {
        totalSearched: 0,
        leadsFound: 0,
        leads: [],
        errors: [],
        usedMockData: !isMapsConfigured,
    };

    try {
        console.log(`[Agent] Searching for ${niche} in ${city}...`);
        const places: PlaceResult[] = await searchPlaces(niche, city, mapsApiKey || '');
        result.totalSearched = places.length;

        if (places.length === 0) {
            result.errors.push('No businesses found for this search');
            return result;
        }

        console.log(`[Agent] Found ${places.length} businesses. Filtering for no-website leads...`);
        const leadsWithoutWebsite = places.filter((place) => !hasWebsite(place));

        result.leads = leadsWithoutWebsite.map((place) => ({
            businessName: place.name,
            address: place.address,
            phone: place.phone,
            location: place.location,
            niche,
            city,
            hasWebsite: false as const,
            rating: place.rating,
            reviews: place.reviews,
        }));
        result.leadsFound = result.leads.length;

        console.log(`[Agent] Complete! Found ${result.leadsFound} leads`);
    } catch (error) {
        console.error('[Agent] Fatal error:', error);
        result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    }

    return result;
}

/**
 * Future enhancement: Integrate Google ADK with Gemini 1.5 Pro for multi-step
 * reasoning (social media enrichment, quality scoring, automated outreach
 * message generation). Requires Vertex AI credentials + an ADK agent with
 * tools — falls back to the direct implementation above until then.
 */
export async function runGeminiAgent(config: AgentConfig): Promise<AgentResult> {
    return runLeadGenerationAgent(config);
}
