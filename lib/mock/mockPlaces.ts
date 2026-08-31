/**
 * Deterministic, believable "business without a website" generator.
 *
 * Used whenever GOOGLE_MAPS_API_KEY isn't configured (or the live Places API call
 * fails, e.g. billing not enabled) so lead search always returns useful, varied
 * results instead of an error. Shared by app/api/chat/route.ts and lib/maps/search.ts.
 */

export interface MockPlace {
    name: string;
    address: string;
    phone: string;
    rating: number;
    reviews: number;
    location: { lat: number; lng: number };
    website: undefined; // always "no website" — that's the product's whole premise
}

const NAME_PREFIXES = ['Prime', 'Elite', 'Metro', 'Golden', 'Reliable', 'Trusted', 'Family', 'Modern', 'Premier', 'Local'];
const NAME_SUFFIXES = ['Pros', 'Experts', 'Co.', 'Services', 'Specialists', 'Group', 'Shop', 'Studio'];

// Small city -> approximate lat/lng lookup so generated leads have plausible
// coordinates. Falls back to a pseudo-random offset for unknown cities.
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
    'new york': { lat: 40.7128, lng: -74.006 },
    chicago: { lat: 41.8781, lng: -87.6298 },
    miami: { lat: 25.7617, lng: -80.1918 },
    austin: { lat: 30.2672, lng: -97.7431 },
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    seattle: { lat: 47.6062, lng: -122.3321 },
    boston: { lat: 42.3601, lng: -71.0589 },
    denver: { lat: 39.7392, lng: -104.9903 },
    atlanta: { lat: 33.749, lng: -84.388 },
    delhi: { lat: 28.7041, lng: 77.1025 },
    mumbai: { lat: 19.076, lng: 72.8777 },
    bangalore: { lat: 12.9716, lng: 77.5946 },
};

// Simple seeded PRNG (mulberry32) so the same niche+city always produces the
// same "random" results — nicer for demos than pure Math.random().
function seededRandom(seed: number) {
    let t = seed;
    return () => {
        t |= 0;
        t = (t + 0x6d2b79f5) | 0;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

function titleCase(str: string): string {
    return str.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

export function generateMockPlaces(niche: string, city: string, count = 5): MockPlace[] {
    const cleanNiche = (niche || 'business').trim();
    const cleanCity = (city || 'your area').trim();
    const rand = seededRandom(hashString(`${cleanNiche.toLowerCase()}|${cleanCity.toLowerCase()}`));
    const baseCoords = CITY_COORDS[cleanCity.toLowerCase()] || { lat: 39.8283 + (rand() - 0.5) * 20, lng: -98.5795 + (rand() - 0.5) * 40 };

    const streets = ['Main St', 'Market Ave', 'Broadway', 'Oak St', 'Elm St', 'Park Rd', '5th Ave', 'Sunset Blvd'];

    const places: MockPlace[] = Array.from({ length: count }, () => {
        const prefix = NAME_PREFIXES[Math.floor(rand() * NAME_PREFIXES.length)];
        const suffix = NAME_SUFFIXES[Math.floor(rand() * NAME_SUFFIXES.length)];
        const streetNum = 100 + Math.floor(rand() * 899);
        const street = streets[Math.floor(rand() * streets.length)];
        const areaCode = 200 + Math.floor(rand() * 700);

        return {
            name: `${prefix} ${titleCase(cleanNiche)} ${suffix}`,
            address: `${streetNum} ${street}, ${titleCase(cleanCity)}`,
            phone: `(${areaCode}) 555-${String(1000 + Math.floor(rand() * 8999)).slice(0, 4)}`,
            rating: Math.round((3.8 + rand() * 1.2) * 10) / 10,
            reviews: 20 + Math.floor(rand() * 480),
            location: {
                lat: baseCoords.lat + (rand() - 0.5) * 0.08,
                lng: baseCoords.lng + (rand() - 0.5) * 0.08,
            },
            website: undefined,
        };
    });

    return places.sort((a, b) => b.rating - a.rating);
}
