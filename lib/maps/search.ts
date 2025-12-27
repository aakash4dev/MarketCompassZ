import { Client } from '@googlemaps/google-maps-services-js';

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
}

export async function searchPlaces(
    niche: string,
    city: string,
    apiKey: string
): Promise<PlaceResult[]> {
    try {
        const query = `${niche} in ${city}`;

        const response = await client.textSearch({
            params: {
                query,
                key: apiKey,
            },
        });

        if (response.data.status !== 'OK' || !response.data.results) {
            console.error('Maps API error:', response.data.status);
            return [];
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
        }));

        return places;
    } catch (error) {
        console.error('Error searching places:', error);
        throw error;
    }
}

export function hasWebsite(place: PlaceResult): boolean {
    return !!(place.website && place.website.trim() !== '');
}
