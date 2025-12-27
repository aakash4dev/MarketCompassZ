'use client';

import React from 'react';

interface BentoGridProps {
    children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {children}
        </div>
    );
}

interface BentoCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

export function BentoCard({
    title,
    description,
    icon,
    className = '',
    size = 'medium'
}: BentoCardProps) {
    const sizeStyles = {
        small: 'md:col-span-1',
        medium: 'md:col-span-1',
        large: 'md:col-span-2 lg:col-span-2',
    };

    return (
        <div className={`glass-card group ${sizeStyles[size]} ${className}`}>
            {icon && (
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
