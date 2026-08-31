import { Client } from '@googlemaps/google-maps-services-js';
import { isMapsConfigured } from '@/lib/env';
import { generateMockPlaces } from '@/lib/mock/mockPlaces';

const client = new Client({});

export interface PlaceResult {
    name: string;
    address: string;
    phone?: string;
    location: {
        lat: number;
        lng: number;
    };
    website?: string;
    rating?: number;
    reviews?: number;
}

function toMockResults(niche: string, city: string, count = 6): PlaceResult[] {
    return generateMockPlaces(niche, city, count).map((place) => ({
        name: place.name,
        address: place.address,
        phone: place.phone,
        location: place.location,
        website: place.website,
        rating: place.rating,
        reviews: place.reviews,
    }));
}

/**
 * Searches for businesses matching `niche` in `city`. Uses the real Google
 * Places API when GOOGLE_MAPS_API_KEY is configured, and gracefully falls
 * back to deterministic mock results (all "without a website", matching this
 * product's premise) whenever the key is missing OR the live call fails
 * (e.g. billing not enabled) — so lead search always works.
 */
export async function searchPlaces(
    niche: string,
    city: string,
    apiKey: string
): Promise<PlaceResult[]> {
    if (!isMapsConfigured || !apiKey) {
        return toMockResults(niche, city);
    }

    try {
        const query = `${niche} in ${city}`;

        const response = await client.textSearch({
            params: {
                query,
                key: apiKey,
            },
        });

        if (response.data.status !== 'OK' || !response.data.results?.length) {
            console.warn('Maps API returned no results, falling back to mock data:', response.data.status);
            return toMockResults(niche, city);
        }

        const places: PlaceResult[] = response.data.results.map((place) => ({
            name: place.name || 'Unknown',
            address: place.formatted_address || '',
            phone: place.formatted_phone_number,
            location: {
                lat: place.geometry?.location.lat || 0,
                lng: place.geometry?.location.lng || 0,
            },
            website: place.website,
            rating: place.rating,
            reviews: place.user_ratings_total,
        }));

        return places;
    } catch (error) {
        console.error('Error searching places, falling back to mock data:', error);
        return toMockResults(niche, city);
    }
}

export function hasWebsite(place: PlaceResult): boolean {
    return !!(place.website && place.website.trim() !== '');
}
