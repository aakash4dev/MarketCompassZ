import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "MarketCompassZ 🧭 | Autonomous Lead Generation for Developers",
    description: "AI-powered lead generation platform that autonomously finds businesses without websites. Built with Google ADK, Gemini AI, and Firebase. Stop manual searching, let AI find your perfect leads.",
    keywords: [
        "lead generation",
        "AI agents",
        "Google ADK",
        "Gemini AI",
        "freelance developers",
        "business leads",
        "website development leads",
        "autonomous AI",
        "Firebase",
        "Next.js",
    ],
    authors: [
        { name: "Aakash Singh Rajput", url: "https://github.com/aakash4dev" }
    ],
    creator: "Aakash Singh Rajput",
    publisher: "MarketCompassZ",
    robots: "index, follow",
    applicationName: "MarketCompassZ",
    category: "Business Tools",
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-touch-icon.svg",
    },
    manifest: "/site.webmanifest",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://marketcompassz.vercel.app",
        siteName: "MarketCompassZ",
        title: "MarketCompassZ 🧭 | AI Lead Generation",
        description: "Autonomous AI-powered lead generation for developers. Find businesses without websites instantly.",
        images: [
            {
                url: "/og-image.svg",
                width: 1200,
                height: 630,
                alt: "MarketCompassZ - AI-Powered Lead Generation",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "MarketCompassZ 🧭 | AI Lead Generation",
        description: "Autonomous AI-powered lead generation for developers. Find businesses without websites instantly.",
        images: ["/og-image.svg"],
        creator: "@aakash4dev",
    },
    other: {
        "theme-color": "#0ea5e9",
        "color-scheme": "dark",
    },
    metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <meta name="theme-color" content="#0ea5e9" />
            </head>
            <body className="antialiased">
                <Navigation />
                <main className="pt-16">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
