# reCAPTCHA Setup Guide

To enable reCAPTCHA on the authentication page, follow these steps:

## 1. Get reCAPTCHA Keys

1. Go to https://www.google.com/recaptcha/admin/create
2. Fill in the registration form:
   - **Label**: MarketCompassZ (or any name you prefer)
   - **reCAPTCHA type**: Choose **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
   - **Domains**: Add your domain(s)
     - For local development: `localhost` or `127.0.0.1`
     - For production: `yourwebsite.com`
3. Click **Submit**
4. You'll receive two keys:
   - **Site Key** (used in the frontend)
   - **Secret Key** (used in the backend - not currently used but keep for future)

## 2. Add to Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Google reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

> **Note**: The `NEXT_PUBLIC_` prefix is required for Next.js to expose this variable to the browser.

## 3. Restart Development Server

After adding the environment variable, restart your development server:

```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```

## 4. Test reCAPTCHA

1. Navigate to `http://localhost:3000/auth`
2. You should see the reCAPTCHA widget instead of the checkbox
3. Complete the reCAPTCHA challenge
4. Check the "I am at least 18 years old" checkbox
5. Try signing in - the button should only be enabled after both verifications

## Troubleshooting

### "reCAPTCHA site key not configured" warning
- Make sure you've added `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` to your `.env.local` file
- Restart the development server after adding the key

### reCAPTCHA not loading
- Check browser console for errors
- Verify your domain is allowed in the reCAPTCHA admin console
- For localhost, ensure you added `localhost` as an allowed domain

### reCAPTCHA fails validation
- Make sure you're using the correct Site Key (not the Secret Key)
- Check that the key hasn't expired or been deleted

## Production Deployment

When deploying to production:

1. Add your production domain to the reCAPTCHA allowed domains list
2. Add the environment variable to your hosting platform (Vercel, Netlify, etc.)
3. Verify the widget loads correctly in production

## Current Implementation

The reCAPTCHA integration:
- ✅ Replaces the manual "I am a human" checkbox
- ✅ Uses reCAPTCHA v2 with dark theme
- ✅ Validates on both email/password and Google Sign-In
- ✅ Shows a fallback warning if keys aren't configured
- ✅ Prevents form submission until verified

## Package Installed

The application uses `react-google-recaptcha` for the reCAPTCHA integration, which is already installed via:

```bash
npm install react-google-recaptcha @types/react-google-recaptcha
```
