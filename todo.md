# MarketCompassZ — Status

Autonomous AI lead-generation platform: describe a niche + city (or chat with
the AI) and it finds businesses without a website — ready-to-pitch leads for
freelancers/agencies. Built with Next.js 15, Firebase, Gemini AI, and Google
Maps Places API.

**Every integration works with zero external setup.** Auth, lead storage, AI
chat, business search, and the contact form all have local mock fallbacks
that activate automatically when the corresponding API key/credential is a
placeholder or missing — see `lib/env.ts` and the "Zero-Setup Mode" section
of `/docs` for details.

## Completed this session

Picked up from a prior session that had started (but not wired in) a local
mock-auth module. Everything below is now implemented and verified:

- **Auth**: `lib/firebase/auth.ts` now unifies real Firebase Auth and the
  localStorage-backed mock (`lib/mock/localAuth.ts`) behind one API
  (`AppUser` type). Navigation, the auth page, and the profile page were
  updated to use it — previously the mock module existed but nothing called
  it, so auth was silently broken without a real Firebase project.
- **reCAPTCHA fallback**: the auth page no longer permanently disables
  sign-in when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` isn't configured — it skips
  the requirement and shows a "demo mode" notice instead. Previously the
  buttons were disabled forever with no way to sign in.
- **Mock Firestore for leads**: `lib/mock/mockLeads.ts` (new) + unified
  `lib/firebase/firestore.ts` — `saveLead`/`subscribeToLeads` transparently
  use real Firestore or the localStorage mock, with real-time updates in
  both cases (CustomEvent-based for the mock, onSnapshot for real).
- **User profile fallback**: `lib/firebase/userProfile.ts` (new) does the
  same for the Profile Settings page (previously called Firestore directly
  with no fallback).
- **Dashboard rewired to real data**: was 100% hardcoded fake stats/leads
  with zero auth gating. Now: redirects to `/auth` if signed out, subscribes
  to the signed-in user's real leads, includes the lead-generation form
  (previously an orphan component nobody rendered), a searchable leads
  table, a 7-day discovery chart computed from real lead timestamps, a
  dynamic System Status panel (backed by new `/api/status`), and a working
  **CSV export** button.
- **Chat + lead-gen API fallbacks**:
  - `/api/generate-leads` previously hard-failed with a 500 if
    `GOOGLE_MAPS_API_KEY` was missing. Now runs unconditionally; the agent
    (`lib/adk/agent.ts`) and `lib/maps/search.ts` fall back to a seeded,
    realistic mock business generator (`lib/mock/mockPlaces.ts`).
  - `/api/chat` previously returned a dead-end error message whenever
    `GEMINI_API_KEY` was a placeholder (which it is by default). Now falls
    back to a local keyword/location-extraction heuristic and a canned
    summary, so the AI Lead Hunter chat and Discovery page work fully
    without any AI key.
  - Both routes are also resilient to a *configured-but-invalid* key (e.g.
    real-looking placeholder text) — failures fall through to mock data
    instead of erroring.
- **New pages**: `/about`, `/contact`, `/docs` — previously linked from the
  footer but returned 404. About covers the product/mission/stack/founder
  (DiceBear avatar). Contact has a working form → `/api/contact`, which
  sends real email via Resend when `RESEND_API_KEY` is set, or logs
  server-side in demo mode. Docs covers setup, zero-setup mode, env vars,
  architecture, and API reference.
- **Dead buttons fixed**:
  - Homepage "Watch Demo" → smooth-scrolls to the live AI chat demo section.
  - Toppers page: "View Details" / "Claim This Lead" / Honorable Mentions
    rows now open the business in Google Maps or route to sign-up.
- **Misc fixes found while wiring things up**:
  - `lib/firebase/config.ts` placeholder-detection had a subtle bug
    (`PLACEHOLDER_MARKERS` included `''`, matching every string); replaced
    with a shared, correct `isRealValue()` helper in `lib/env.ts`.
  - `app/dashboard/page.tsx` had an invalid Recharts prop
    (`stopColorOpacity` isn't a real SVG attribute) that failed `tsc`.
  - Added `next/image` remote patterns for `api.dicebear.com` /
    `picsum.photos` and swapped remaining `<img>` tags for `next/image`.
  - Fixed ~20 pre-existing `react/no-unescaped-entities` / `no-html-link-for-pages`
    ESLint errors across privacy/terms/features/how-it-works/discovery pages.

## Verification

- `tsc --noEmit` — clean, no errors.
- `next lint` — clean, no warnings or errors.
- `next build` (run in an isolated `/tmp` copy, per environment constraints)
  — succeeds; all 22 routes compile, including the 3 new pages and 4 API
  routes.

## Infra-only follow-ups (not code — require real credentials/accounts)

None of these block the app from working; they only unlock "live" data
instead of the local mocks:

- Create a real Firebase project (Auth + Firestore) and put its config in
  `.env.local` to replace the localStorage-based auth/leads mock with
  persistent, multi-device accounts and data.
- Get a `GEMINI_API_KEY` (Google AI Studio) for real AI-generated chat
  responses and smarter query understanding.
- Get a `GOOGLE_MAPS_API_KEY` with Places API enabled + billing for real
  business search results instead of the mock generator.
- Get a `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (reCAPTCHA v2) to re-enable bot
  protection on the auth page.
- Get a `RESEND_API_KEY` (resend.com) to send real emails from the contact
  form instead of logging them server-side.
- Buying a custom domain / production hosting — not attempted, out of scope.

See `/docs` in the running app (or `API_SETUP_GUIDE.md`, `SETUP_GUIDE.md`)
for step-by-step instructions on each.
