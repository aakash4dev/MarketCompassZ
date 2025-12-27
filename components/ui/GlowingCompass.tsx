'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GlowingCompass() {
    const compassRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!compassRef.current) return;

            const rect = compassRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const degrees = (angle * 180 / Math.PI) + 90;

            setRotation(degrees);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={compassRef}
            className="relative w-64 h-64 mx-auto transform-3d animate-float"
        >
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full neon-border animate-pulse-glow">
                <div className="absolute inset-4 rounded-full glass-strong">
                    {/* Cardinal Points */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-primary-400 font-bold text-sm">N</div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-primary-400 font-bold text-sm">S</div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-primary-400 font-bold text-sm">W</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-400 font-bold text-sm">E</div>

                    {/* Compass Needle */}
                    <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        <div className="relative w-1 h-32">
                            {/* North (Red) */}
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full blur-sm"></div>
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full"></div>

                            {/* South (White) */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-glow"></div>
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-8 opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-400 to-transparent"></div>
            </div>
        </div>
    );
}
