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
                sunrise: {
                    50: '#fff8f1',
                    100: '#ffeedb',
                    200: '#ffd9b5',
                    300: '#ffbe85',
                    400: '#ff9a4d',
                    500: '#ff771a',
                    600: '#ef5b07',
                    700: '#c64307',
                    800: '#9d350f',
                    900: '#7e2d10',
                    950: '#441406',
                },
                sand: {
                    50: '#faf9f8',
                    100: '#f4f2f0',
                    200: '#e8e4e0',
                    300: '#d5cfc9',
                    400: '#bcaead',
                    500: '#a79594',
                    600: '#8e7978',
                    700: '#766261',
                    800: '#615151',
                    900: '#514545',
                    950: '#2b2424',
                },
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-sunrise': 'linear-gradient(135deg, #fff8f1 0%, #ffe4e6 50%, #ffeedb 100%)',
                'gradient-warm': 'linear-gradient(135deg, #ffeedb 0%, #ffd9b5 50%, #ffbe85 100%)',
                'mesh-gradient-light': 'radial-gradient(at 27% 37%, hsla(28, 100%, 94%, 1) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(11, 100%, 95%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(330, 100%, 96%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(43, 100%, 92%, 1) 0px, transparent 50%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.7s ease-out',
                'slide-right': 'slideRight 0.7s ease-out',
                'slide-left': 'slideLeft 0.7s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'float-light': 'floatLight 8s ease-in-out infinite',
                'rotate-slow': 'rotateSlow 20s linear infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                floatLight: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '33%': { transform: 'translateY(-15px) rotate(2deg)' },
                    '66%': { transform: 'translateY(-5px) rotate(-2deg)' },
                },
                rotateSlow: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'warm': '0 10px 30px -5px rgba(255, 119, 26, 0.15)',
                'card': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px -2px rgba(0, 0, 0, 0.05)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
