'use client';

import React from 'react';

const restaurants = [
    { name: 'The Golden Fork', price: '$99/month', originalPrice: '$99/month' },
    { name: 'Ocean Breeze',    price: '$99/month', originalPrice: '$99/month' },
    { name: 'Spice Garden',    price: '$0 (Promo)', originalPrice: '$0 (Promo)' },
    { name: 'La Bella Vista',  price: '$99/month', originalPrice: '$99/month' },
    { name: 'Urban Grill',     price: '$49/month (50% off)', originalPrice: '$49/month (50% off)' },
];

export default function RestaurantPricingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Restaurant Pricing</h1>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Restaurant Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Current Plan Price</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {restaurants.map((r) => (
                            <tr key={r.name} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{r.name}</td>
                                <td className="px-6 py-4">
                                    <div className="max-w-[200px]">
                                        <input
                                            type="text"
                                            defaultValue={r.price}
                                            className="w-full bg-zinc-100 border-none rounded-[6px] px-3 py-2 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CF0738]"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-1.5 rounded-[6px] border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-all">
                                            Set to $0
                                        </button>
                                        <button className="px-4 py-1.5 rounded-[6px] border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-all">
                                            Apply Promo
                                        </button>
                                        <button className="px-4 py-1.5 rounded-[6px] bg-[#CF0738] text-white text-xs font-semibold hover:bg-[#b00630] transition-all">
                                            Update
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
