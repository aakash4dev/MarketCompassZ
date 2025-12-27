# MarketCompassZ 🧭
**Autonomous Lead Generation for Developers via Google AI Agents.**

Built for the [GenAI Hackathon Delhi](https://www.commudle.com/communities/tensorflow-delhi/events/genai-hackathon-delhi) organized by TFUG Delhi.

---

## 📖 Overview
MarketCompassZ solves the "Manual Search" problem for freelancers and agencies. Instead of developers manually browsing Google Maps to find clients, an **AI Agent built on Google ADK** autonomously scans regions, detects businesses without a digital presence (websites or apps), and populates a dashboard with "ready-to-pitch" leads.

## 🏗️ Architecture
The system utilizes a Next.js frontend hosted on Vercel, communicating with a backend powered by the Google Agent Development Kit (ADK). All lead data and user authentication are handled securely through Firebase.

## 🛠️ Tech Stack
* **AI Orchestration:** [Google Agent Development Kit (ADK)](https://github.com/google/adk)
* **LLM:** Gemini 1.5 Pro (via Vertex AI)
* **Database & Auth:** Firebase (Firestore & Firebase Auth)
* **Frontend:** Next.js (App Router)
* **Hosting:** Vercel (Frontend & Serverless Functions)
* **APIs:** Google Maps Platform (Places API)

## ✨ Hackathon Features
* **ADK-Powered Agent:** An autonomous agent that takes a "Niche" and "City" as input and performs multi-step reasoning to find the best leads.
* **Firebase Sync:** Real-time lead updates. Once the agent finds a business without a website, it’s instantly visible on the developer's dashboard.
* **Social Enrichment:** Cross-references Google Maps data with social media to verify business activity.
* **Google Auth:** Seamless login for developers using their existing Google accounts.

## 🚀 Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/aakash4dev/MarketCompassZ.git
    cd MarketCompassZ
    ```

2.  **Environment Variables:**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
    GOOGLE_CLOUD_PROJECT=your_project_id
    GOOGLE_MAPS_API_KEY=your_maps_key
    VERTEX_AI_LOCATION=us-central1
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # If using Python for the ADK agent logic:
    pip install google-adk
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## ⚖️ License & Copyright
Copyright (c) 2025 **Aakash Singh Rajput (@aakash4dev)**.

Licensed under the **MIT License**.
*Permission is hereby granted, free of charge, to any person obtaining a copy of this software for the purpose of the GenAI Hackathon Delhi and subsequent development.*

---
**Note:** This project utilizes Google Cloud and Firebase. All data usage complies with the Google Cloud Terms of Service.