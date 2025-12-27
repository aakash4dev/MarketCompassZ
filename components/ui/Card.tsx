'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'neon';
    hover?: boolean;
}

export default function Card({
    children,
    className = '',
    variant = 'default',
    hover = true
}: CardProps) {
    const baseStyles = 'rounded-2xl p-6 transition-all duration-300';

    const variantStyles = {
        default: 'card',
        glass: 'glass-card',
        neon: 'glass-card neon-border',
    };

    const hoverStyles = hover ? 'cursor-pointer' : '';

    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}
