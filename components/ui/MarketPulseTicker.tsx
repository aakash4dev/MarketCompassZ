'use client';

import React from 'react';
import { mockMarketTicker } from '@/lib/mockData';

export default function MarketPulseTicker() {
    // Double the array for seamless loop
    const tickerItems = [...mockMarketTicker, ...mockMarketTicker];

    return (
        <div className="w-full overflow-hidden glass rounded-lg py-3 border border-primary-500/20">
            <div className="flex gap-8 ticker whitespace-nowrap">
                {tickerItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="inline-flex items-center gap-2 px-4">
                        <span className={`w-2 h-2 rounded-full ${item.type === 'campaign' ? 'bg-primary-400 animate-pulse' :
                                item.type === 'sentiment' ? 'bg-accent-400 animate-pulse' :
                                    'bg-green-400 animate-pulse'
                            }`}></span>
                        <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
