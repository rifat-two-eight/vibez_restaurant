'use client';

import React from 'react';

const promoCodes = [
    { name: 'LAUNCH100', type: 'Free',         limit: 'First 100 Restaurants', expiry: '2026-12-31' },
    { name: 'SAVE50',    type: '50% Discount', limit: 'Unlimited',             expiry: '2026-06-30' },
    { name: 'WELCOME25', type: '25% Discount', limit: 'First Time Users',      expiry: '2026-08-15' },
    { name: 'EARLYBIRD', type: 'Free',         limit: 'First 50 Restaurants',  expiry: '2026-05-31' },
];

export default function PromoCodesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900">Promo Codes</h1>
                <button className="px-5 py-2.5 rounded-[10px] bg-[#CF0738] text-white text-sm font-semibold hover:bg-[#b00630] transition-all shadow-lg shadow-[#CF0738]/20">
                    Create Promo Code
                </button>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Code Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Discount Type</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Usage Limit</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Expiry Date</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {promoCodes.map((code) => (
                            <tr key={code.name} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-zinc-900 font-medium">{code.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                        code.type === 'Free' 
                                            ? 'bg-[#CF0738] text-white' 
                                            : 'bg-pink-50 text-[#CF0738]'
                                    }`}>
                                        {code.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">{code.limit}</td>
                                <td className="px-6 py-4 text-zinc-500">{code.expiry}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            Edit
                                        </button>
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            Disable
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
