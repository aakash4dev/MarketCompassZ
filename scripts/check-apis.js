
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Client } = require('@googlemaps/google-maps-services-js');
const path = require('path');


async function checkApis() {
    console.log('\n🔍 MarketCompassZ API Health Check\n');
    console.log('-----------------------------------');

    // 1. Check Environmental Variables
    const geminiKey = process.env.GEMINI_API_KEY;
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;

    console.log(`🔑 GEMINI_API_KEY:      ${geminiKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`🔑 GOOGLE_MAPS_API_KEY: ${mapsKey ? '✅ Present' : '❌ Missing'}`);
    console.log('-----------------------------------\n');

    // 2. Test Gemini API
    if (geminiKey) {
        // Try multiple models to see which one works
        const modelsToTry = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];
        let connected = false;

        for (const modelName of modelsToTry) {
            process.stdout.write(`🤖 Testing Gemini AI (${modelName})... `);
            try {
                const genAI = new GoogleGenerativeAI(geminiKey);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Say "OK"');
                const response = await result.response;
                const text = response.text();

                if (text) {
                    console.log('✅ Connected!');
                    console.log(`   Response: "${text.trim()}"`);
                    connected = true;
                    if (modelName !== 'gemini-1.5-flash') {
                        console.log(`   (NOTE: You should update your code to use '${modelName}')`);
                    }
                    break;
                }
            } catch (error) {
                console.log('❌ Failed');
                console.error(`   Detailed Error: ${error.message}`);
            }
        }

        if (!connected) {
            console.log('\n❌ All common Gemini models failed. \n   - Check your API key permissions.\n   - Ensure "Generative Language API" is enabled in Google Cloud Console.');
        }

    } else {
        console.log('🤖 Testing Gemini AI... ⏭️  Skipped (No Key)');
    }

    console.log('');

    // 3. Test Google Maps API
    if (mapsKey) {
        process.stdout.write('🗺️  Testing Google Maps... ');
        try {
            const client = new Client({});
            const res = await client.geocode({
                params: {
                    address: 'New York, NY',
                    key: mapsKey
                }
            });

            if (res.data.results.length > 0) {
                console.log('✅ Connected!');
                console.log(`   Geocoded: ${res.data.results[0].formatted_address}`);
            } else {
                console.log('⚠️  Connected but no results found.');
            }
        } catch (error) {
            console.log('❌ Failed');
            console.error(`   Error: ${error.response?.data?.error_message || error.message}`);
            if (error.response?.data?.status === 'REQUEST_DENIED') {
                console.log('   (Likely a billing or API enablement issue)');
            }
        }
    } else {
        console.log('🗺️  Testing Google Maps... ⏭️  Skipped (No Key)');
    }

    console.log('\n-----------------------------------');
    console.log('Health check complete.\n');
}

checkApis();
