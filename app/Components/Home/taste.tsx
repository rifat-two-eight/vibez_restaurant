import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
    {
        id: 1,
        category: "Food Trends",
        title: "Why 2024 is the year of fermented ingredients",
        readTime: "5 min read",
        date: "May 12, 2024",
        image: "/taste1.png"
    },
    {
        id: 2,
        category: "City Guide",
        title: "The 10 best ramen spots in Düsseldorf you must try",
        readTime: "8 min read",
        date: "April 28, 2024",
        image: "/taste2.png"
    },
    {
        id: 3,
        category: "NeoTaste Tips",
        title: "How to maximize your savings with NeoTaste Gold",
        readTime: "4 min read",
        date: "April 15, 2024",
        image: "/taste3.png"
    }
];

export default function Taste() {
    return (
        <div className="container mx-auto px-4 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-[#151C27] mb-2">Tasting Notes</h2>
                    <p className="text-[#151C27] font-medium">Stories from the culinary world</p>
                </div>
                <Link
                    href="/blogs"
                    className="flex items-center gap-2 text-[#19E68C] font-bold"
                >
                    Read all articles
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <div key={article.id} className="group cursor-pointer">
                        {/* Image Container */}
                        <div className="relative aspect-16/10 rounded-[24px] overflow-hidden mb-6">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[12px] font-bold text-[#151C27] shadow-sm">
                                {article.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-[#151C27] leading-tight group-hover:text-[#CF0738] transition-colors">
                                {article.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                                <span>{article.readTime}</span>
                                <span>•</span>
                                <span>{article.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}