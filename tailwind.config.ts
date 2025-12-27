import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Deep Space Theme with Electric Accents
                space: {
                    50: '#f0f3ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#1e1b4b',
                    950: '#0f0a1f',
                },
                electric: {
                    blue: '#00d9ff',
                    purple: '#a855f7',
                    pink: '#ec4899',
                    orange: '#f97316',
                    green: '#10b981',
                },
                neon: {
                    cyan: '#00ffff',
                    magenta: '#ff00ff',
                    yellow: '#ffff00',
                    lime: '#00ff00',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-space': 'linear-gradient(135deg, #0f0a1f 0%, #1e1b4b 50%, #312e81 100%)',
                'gradient-electric': 'linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)',
                'gradient-neon': 'linear-gradient(90deg, #00ffff 0%, #ff00ff 100%)',
                'mesh-gradient': 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.7s ease-out',
                'slide-right': 'slideRight 0.7s ease-out',
                'slide-left': 'slideLeft 0.7s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'float': 'float 8s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'rotate-slow': 'rotateSlow 20s linear infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-50px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(50px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '33%': { transform: 'translateY(-30px) rotate(5deg)' },
                    '66%': { transform: 'translateY(-15px) rotate(-5deg)' },
                },
                glowPulse: {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                        filter: 'brightness(1)',
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(0, 217, 255, 0.8), 0 0 80px rgba(168, 85, 247, 0.6)',
                        filter: 'brightness(1.2)',
                    },
                },
                rotateSlow: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            boxShadow: {
                'electric': '0 0 30px rgba(0, 217, 255, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                'neon-blue': '0 0 20px rgba(0, 217, 255, 0.8)',
                'neon-purple': '0 0 20px rgba(168, 85, 247, 0.8)',
                'neon-pink': '0 0 20px rgba(236, 72, 153, 0.8)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
