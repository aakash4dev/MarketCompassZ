import { NextResponse } from 'next/server';
import { isGeminiConfigured, isMapsConfigured, isResendConfigured } from '@/lib/env';
import { isFirebaseConfigured } from '@/lib/firebase/config';

/**
 * Reports which external integrations are actually configured with real
 * credentials vs. running on their local mock fallback. Used by the
 * dashboard's "System Status" panel so it reflects reality instead of
 * hardcoded copy.
 */
export async function GET() {
    return NextResponse.json({
        firebase: isFirebaseConfigured,
        gemini: isGeminiConfigured,
        maps: isMapsConfigured,
        email: isResendConfigured,
    });
}
