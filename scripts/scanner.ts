import { Client } from "@googlemaps/google-maps-services-js";
import { adminDb } from "../lib/firebase/admin";
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const client = new Client({});

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchDelhiNCRLeads(query: string) {
    console.log(`\n========================================`);
    console.log(`[${new Date().toISOString()}] Starting scan for: ${query} in Delhi NCR`);
    console.log(`========================================`);

    if (!MAPS_API_KEY) {
        console.error("Error: GOOGLE_MAPS_API_KEY is not set in .env.local");
        return;
    }

    if (!adminDb) {
        console.error("Error: Firebase Admin is not initialized properly.");
        return;
    }

    try {
        let nextPageToken: string | undefined = undefined;
        let totalProcessed = 0;
        let leadsFound = 0;
        let pageCount = 0;

        do {
            pageCount++;
            console.log(`Fetching page ${pageCount}...`);
            
            const response = await client.textSearch({
                params: {
                    query: `${query} in Delhi NCR`,
                    key: MAPS_API_KEY,
                    pagetoken: nextPageToken,
                },
                timeout: 10000,
            });

            const results = response.data.results;
            
            for (const place of results) {
                totalProcessed++;
                
                // We need Place Details to get the website reliably
                if (place.place_id) {
                    try {
                        const detailsResponse = await client.placeDetails({
                            params: {
                                place_id: place.place_id,
                                fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'rating', 'user_ratings_total', 'types'],
                                key: MAPS_API_KEY,
                            },
                            timeout: 5000,
                        });
                        
                        const details = detailsResponse.data.result;

                        // Check if the business does NOT have a website
                        if (!details.website) {
                            console.log(`[LEAD] Found: ${details.name} (No website)`);
                            
                            const leadData = {
                                placeId: place.place_id,
                                name: details.name || 'Unknown',
                                address: details.formatted_address || '',
                                phone: details.formatted_phone_number || null,
                                rating: details.rating || null,
                                reviewCount: details.user_ratings_total || 0,
                                types: details.types || [],
                                query: query,
                                discoveredAt: new Date(),
                                status: 'new', // new, contacted, interested, rejected
                            };

                            // Save to Firestore
                            await adminDb.collection('leads_delhi_ncr').doc(place.place_id).set(leadData, { merge: true });
                            leadsFound++;
                        }
                    } catch (detailError) {
                        console.error(`Failed to get details for place ${place.place_id}:`, detailError);
                    }
                    
                    // Respect API rate limits (1 second per detail request)
                    await delay(1000);
                }
            }

            nextPageToken = response.data.next_page_token;
            
            if (nextPageToken) {
                // Google requires a short delay before using the next page token
                await delay(2000);
            }

        } while (nextPageToken);

        console.log(`\nScan complete for: ${query}`);
        console.log(`Total places processed: ${totalProcessed}`);
        console.log(`Real leads found (no website): ${leadsFound}`);
        
    } catch (error: any) {
        console.error("Scanner failed:", error.response?.data || error.message);
    }
}

async function main() {
    console.log("Starting MarketCompassZ Background Scanner Daemon...");
    
    const niches = [
        'plumbers', 
        'restaurants', 
        'gyms', 
        'dental clinics', 
        'electricians', 
        'spas', 
        'roofing contractors', 
        'interior designers'
    ];
    
    let currentNicheIndex = 0;
    
    // 5 minutes delay between niche scans (in milliseconds)
    const DELAY_BETWEEN_SCANS = 5 * 60 * 1000;

    // Infinite loop for continuous background scanning
    while (true) {
        const targetNiche = niches[currentNicheIndex];
        
        await searchDelhiNCRLeads(targetNiche);
        
        // Move to the next niche in the array (loop back to 0 if at the end)
        currentNicheIndex = (currentNicheIndex + 1) % niches.length;
        
        console.log(`\nWaiting 5 minutes before scanning the next niche (${niches[currentNicheIndex]})...`);
        await delay(DELAY_BETWEEN_SCANS);
    }
}

// Run the script
if (require.main === module) {
    main();
}
