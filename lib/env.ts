/**
 * Centralized "is this real or a placeholder?" detection for every external
 * service this app can optionally talk to. Every integration in the codebase
 * is expected to check the relevant flag below and gracefully fall back to a
 * local mock/heuristic implementation when it's `false`, so the whole app
 * works end-to-end with zero external setup.
 *
 * To go live with any given service, just replace the placeholder value in
 * .env.local with a real credential — no code changes required.
 */

const GENERIC_PLACEHOLDER_MARKERS = ['your_', 'your-', 'xxxxx', 'changeme', 'placeholder'];

export function isRealValue(value: string | undefined | null, extraMarkers: string[] = []): boolean {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    const lower = trimmed.toLowerCase();
    return ![...GENERIC_PLACEHOLDER_MARKERS, ...extraMarkers].some((marker) => lower.includes(marker));
}

export const isGeminiConfigured = isRealValue(process.env.GEMINI_API_KEY);
export const isMapsConfigured = isRealValue(process.env.GOOGLE_MAPS_API_KEY);
export const isRecaptchaConfigured = isRealValue(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
export const isResendConfigured = isRealValue(process.env.RESEND_API_KEY);
export const contactRecipientEmail = process.env.CONTACT_EMAIL_TO || 'aakash4dev.crypto@gmail.com';
