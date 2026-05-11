'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
    center: [number, number];
    zoom: number;
    markers: Array<{ name: string; coords: [number, number]; count: string }>;
}

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapDisplay = dynamic<LeafletMapProps>(() => import('@/app/Components/Home/LeafletMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-zinc-100 animate-pulse flex items-center justify-center text-zinc-400">Loading Map...</div>
});

const mapData = {
    Germany: {
        deals: 53,
        center: [51.1657, 10.4515] as [number, number],
        cities: [
            { name: "Berlin", count: "452 Deals", coords: [52.52, 13.405] as [number, number] },
            { name: "Hamburg", count: "398 Deals", coords: [53.5511, 9.9937] as [number, number] },
            { name: "München", count: "421 Deals", coords: [48.1351, 11.5820] as [number, number] },
            { name: "Köln", count: "312 Deals", coords: [50.9375, 6.9603] as [number, number] },
            { name: "Frankfurt am Main", count: "287 Deals", coords: [50.1109, 8.6821] as [number, number] },
            { name: "Düsseldorf", count: "210 Deals", coords: [51.2277, 6.7735] as [number, number] },
            { name: "Stuttgart", count: "185 Deals", coords: [48.7758, 9.1829] as [number, number] },
            { name: "Dortmund", count: "156 Deals", coords: [51.5136, 7.4653] as [number, number] },
            { name: "Essen", count: "143 Deals", coords: [51.4556, 7.0116] as [number, number] },
            { name: "Leipzig", count: "145 Deals", coords: [51.3397, 12.3731] as [number, number] },
            { name: "Bremen", count: "132 Deals", coords: [53.0793, 8.8017] as [number, number] },
            { name: "Dresden", count: "89 Deals", coords: [51.0504, 13.7373] as [number, number] },
            { name: "Hannover", count: "176 Deals", coords: [52.3759, 9.7320] as [number, number] },
            { name: "Nürnberg", count: "134 Deals", coords: [49.4521, 11.0767] as [number, number] },
            { name: "Duisburg", count: "92 Deals", coords: [51.4344, 6.7623] as [number, number] }
        ]
    },
    "United Kingdom": {
        deals: 24,
        center: [55.3781, -3.4360] as [number, number],
        cities: [
            { name: "London", count: "250 Deals", coords: [51.5074, -0.1278] as [number, number] },
            { name: "Birmingham", count: "85 Deals", coords: [52.4862, -1.8904] as [number, number] },
            { name: "Manchester", count: "120 Deals", coords: [53.4808, -2.2426] as [number, number] },
            { name: "Glasgow", count: "45 Deals", coords: [55.8642, -4.2518] as [number, number] },
            { name: "Liverpool", count: "60 Deals", coords: [53.4084, -2.9916] as [number, number] },
            { name: "Edinburgh", count: "52 Deals", coords: [55.9533, -3.1883] as [number, number] },
            { name: "Bristol", count: "48 Deals", coords: [51.4545, -2.5879] as [number, number] },
            { name: "Leeds", count: "74 Deals", coords: [53.8008, -1.5491] as [number, number] }
        ]
    }
};

export default function Map() {
    const [selectedCountry, setSelectedCountry] = useState<'Germany' | 'United Kingdom'>('Germany');
    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter] = useState<[number, number]>(mapData.Germany.center);
    const [zoom, setZoom] = useState(6);
    const [activeCity, setActiveCity] = useState<string | null>(null);

    const currentData = mapData[selectedCountry];

    const filteredCities = useMemo(() =>
        currentData.cities.filter(city =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
        ), [currentData, searchQuery]
    );

    const handleCityClick = (name: string, coords: [number, number]) => {
        setMapCenter(coords);
        setZoom(13);
        setActiveCity(name);
    };

    const handleCountrySwitch = (country: 'Germany' | 'United Kingdom') => {
        setSelectedCountry(country);
        setMapCenter(mapData[country].center);
        setZoom(6);
        setSearchQuery('');
        setActiveCity(null);
    };

    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Left Sidebar */}
                <div className="w-full lg:w-5/12 flex flex-col h-full max-h-[600px]">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder='e. g. b. "Osnabrück" or "Berlin"'
                            className="w-full rounded-full border border-zinc-200 py-3 pl-12 pr-4 text-sm focus:border-[#CF0738] focus:outline-none focus:ring-1 focus:ring-[#CF0738]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Country Tabs */}
                    <div className="flex items-center gap-2 mb-8 p-1 bg-zinc-100 rounded-full self-start">
                        {Object.keys(mapData).map((country) => (
                            <button
                                key={country}
                                onClick={() => handleCountrySwitch(country as any)}
                                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${selectedCountry === country
                                    ? "bg-[#CF0738] text-white shadow-md"
                                    : "text-zinc-500 hover:text-zinc-700"
                                    }`}
                            >
                                {country}
                                <span className={`text-[10px] opacity-70 ${selectedCountry === country ? "text-white" : "text-zinc-400"}`}>
                                    {mapData[country as keyof typeof mapData].deals}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Scrollable City List */}
                    <div className="overflow-y-auto pr-4 custom-scrollbar">
                        <div className="space-y-2">
                            {filteredCities.map((city) => (
                                <div
                                    key={city.name}
                                    onClick={() => handleCityClick(city.name, city.coords)}
                                    className={`flex justify-between items-center py-3 px-4 rounded-xl border-b border-zinc-50 transition-all cursor-pointer group ${activeCity === city.name
                                        ? "bg-[#CF0738]/10 border-[#CF0738]/20 shadow-sm"
                                        : "hover:bg-zinc-50"
                                        }`}
                                >
                                    <span className={`font-medium transition-colors ${activeCity === city.name ? "text-[#CF0738]" : "text-[#151C27] group-hover:text-[#CF0738]"
                                        }`}>
                                        {city.name}
                                    </span>
                                    <span className={`text-sm ${activeCity === city.name ? "text-[#CF0738]/60" : "text-zinc-400"
                                        }`}>
                                        {city.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-7/12 flex flex-col">
                    <div className="text-center mb-10 max-w-lg mx-auto">
                        <h2 className="text-3xl font-bold text-[#151C27] mb-4">You can already find us here</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            New cities are constantly being added. You can currently find us in 53 cities and 4 countries.
                        </p>
                    </div>

                    {/* Real-Time Map Display - Reduced Size & Fixed Z-Index */}
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-[24px] overflow-hidden bg-zinc-100 shadow-xl border border-zinc-200 z-10 max-w-2xl mx-auto">
                        <MapDisplay
                            center={mapCenter}
                            zoom={zoom}
                            markers={currentData.cities}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CF0738;
                }
            `}</style>
        </div>
    );
}