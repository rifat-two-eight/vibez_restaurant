'use client';

import React, { useState } from 'react';

const faqItems = [
    {
        question: "How much does it cost to join Logo?",
        answer: "There are absolutely no costs for partner restaurants. We don't charge listing fees, commissions, or subscription costs. Our revenue comes from user memberships."
    },
    {
        question: "How do the deals work?",
        answer: "Deals are typically 2-for-1 or significant discounts on meals. You decide which deals to offer and when they are available."
    },
    {
        question: "How long does the setup take?",
        answer: "The setup is very quick. Once you provide your restaurant details and images, we can have your profile live within 24-48 hours."
    },
    {
        question: "Can I cancel at any time?",
        answer: "Yes, you can pause or end your partnership at any time. There are no long-term contracts or hidden cancellation fees."
    }
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-6xl mx-auto px-4 pb-20">
            <h2 className="text-4xl font-bold text-center text-[#013622] mb-16">Common Questions</h2>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="border-b border-zinc-200 pb-6"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex justify-between items-center text-left group"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-[#151C27] group-hover:text-[#CF0738] transition-colors">
                                {item.question}
                            </h3>
                            <div className={`shrink-0 w-10 h-10 rounded-full border-2 border-[#013622]/20 flex items-center justify-center transition-all ${openIndex === index ? 'bg-[#CF0738] border-[#CF0738] text-white' : 'text-[#013622]'}`}>
                                {openIndex === index ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v12m6-6H6" />
                                    </svg>
                                )}
                            </div>
                        </button>

                        {openIndex === index && (
                            <div className="mt-4 text-zinc-500 text-lg leading-relaxed max-w-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
