import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Circle with Gradient */}
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
            </defs>

            {/* Outer Circle */}
            <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />

            {/* Compass Needle - North (Main) */}
            <path
                d="M50 20 L58 48 L50 45 L42 48 Z"
                fill="url(#compassGradient)"
                opacity="0.9"
            />

            {/* Compass Needle - South */}
            <path
                d="M50 80 L42 52 L50 55 L58 52 Z"
                fill="url(#compassGradient)"
                opacity="0.6"
            />

            {/* Compass Needle - East */}
            <path
                d="M80 50 L52 58 L55 50 L52 42 Z"
                fill="url(#compassGradient)"
                opacity="0.4"
            />

            {/* Compass Needle - West */}
            <path
                d="M20 50 L48 42 L45 50 L48 58 Z"
                fill="url(#compassGradient)"
                opacity="0.4"
            />

            {/* Center Circle */}
            <circle cx="50" cy="50" r="8" fill="#ffffff" />
            <circle cx="50" cy="50" r="4" fill="url(#logoGradient)" />

            {/* Letter M in center */}
            <text
                x="50"
                y="58"
                fontFamily="Inter, sans-serif"
                fontSize="24"
                fontWeight="900"
                fill="#ffffff"
                textAnchor="middle"
                opacity="0.95"
            >
                M
            </text>
        </svg>
    );
}
