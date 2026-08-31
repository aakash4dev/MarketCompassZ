import { NextResponse } from 'next/server';
import { isResendConfigured, contactRecipientEmail } from '@/lib/env';

interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sends real email via the Resend API when RESEND_API_KEY is configured.
 * Otherwise gracefully "mock sends" — logs the message server-side and
 * returns success, so the contact form always works with zero external setup.
 */
async function sendViaResend(payload: ContactPayload): Promise<void> {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'MarketCompassZ <onboarding@resend.dev>',
            to: [contactRecipientEmail],
            reply_to: payload.email,
            subject: `[MarketCompassZ Contact] ${payload.subject}`,
            text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
        }),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Resend API error (${res.status}): ${body}`);
    }
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<ContactPayload>;
        const name = (body.name || '').trim();
        const email = (body.email || '').trim();
        const subject = (body.subject || 'New message from MarketCompassZ').trim();
        const message = (body.message || '').trim();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
        }
        if (!isValidEmail(email)) {
            return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
        }
        if (message.length > 5000) {
            return NextResponse.json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 });
        }

        const payload: ContactPayload = { name, email, subject, message };

        if (isResendConfigured) {
            await sendViaResend(payload);
            return NextResponse.json({ success: true, mode: 'live' });
        }

        // Mock mode: no email provider configured — log server-side instead.
        console.log('[Contact form — demo mode, no RESEND_API_KEY configured]', payload);
        return NextResponse.json({ success: true, mode: 'demo' });
    } catch (error) {
        console.error('[API] Error in /api/contact:', error);
        return NextResponse.json({ error: 'Failed to send your message. Please try again later.' }, { status: 500 });
    }
}
