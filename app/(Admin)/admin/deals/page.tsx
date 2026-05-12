'use client';

import React, { useState } from 'react';

type DealType = 'Percentage' | '2-for-1' | 'Fixed Discount' | 'Free Item';
type DealStatus = 'Active' | 'Inactive';

type Deal = {
    id: number;
    restaurant: string;
    title: string;
    type: DealType;
    activeDays: string;
    timeSlot: 'Lunch' | 'Dinner';
    status: DealStatus;
};

const typeStyle: Record<DealType, string> = {
    'Percentage':     'bg-pink-50 text-pink-600',
    '2-for-1':        'bg-orange-50 text-orange-500',
    'Fixed Discount': 'bg-pink-50 text-pink-600',
    'Free Item':      'bg-pink-50 text-pink-500',
};

const deals: Deal[] = [
    { id: 1, restaurant: 'The Golden Fork', title: 'Happy Hour 50% Off',  type: 'Percentage',     activeDays: 'Mon-Fri', timeSlot: 'Lunch',  status: 'Active'   },
    { id: 2, restaurant: 'Ocean Breeze',    title: 'Buy 1 Get 1 Sushi',   type: '2-for-1',        activeDays: 'Tue-Sun', timeSlot: 'Dinner', status: 'Active'   },
    { id: 3, restaurant: 'Spice Garden',    title: '$10 Off Entrees',      type: 'Fixed Discount', activeDays: 'Mon-Wed', timeSlot: 'Lunch',  status: 'Inactive' },
    { id: 4, restaurant: 'La Bella Vista',  title: 'Free Dessert',         type: 'Free Item',      activeDays: 'Wed-Sun', timeSlot: 'Dinner', status: 'Active'   },
    { id: 5, restaurant: 'Urban Grill',     title: '30% Off All Meals',    type: 'Percentage',     activeDays: 'Mon-Sat', timeSlot: 'Lunch',  status: 'Active'   },
];

const ALL_TYPES = ['All', 'Percentage', '2-for-1', 'Fixed Discount', 'Free Item'] as const;
type FilterType = typeof ALL_TYPES[number];

export default function AdminDealsPage() {
    const [filter, setFilter] = useState<FilterType>('All');

    const filtered = filter === 'All' ? deals : deals.filter(d => d.type === filter);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Deals</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-500 font-medium">Filter by Deal Type</span>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value as FilterType)}
                        className="border border-zinc-200 rounded-[10px] px-4 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#CF0738]/20 focus:border-[#CF0738]"
                    >
                        {ALL_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Validation Rules */}
            <div className="border border-orange-200 bg-orange-50 rounded-[10px] p-5">
                <p className="text-sm font-bold text-orange-600 mb-2">Validation Rules</p>
                <ul className="space-y-1 text-sm text-orange-500">
                    <li>• Minimum 2 active deals required per restaurant</li>
                    <li>• Weekly schedule must have at least 5 days</li>
                </ul>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Restaurant Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Deal Title</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Deal Type</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Active Days</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Time Slot</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {filtered.map(d => (
                            <tr key={d.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{d.restaurant}</td>
                                <td className="px-6 py-4 text-zinc-600">{d.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${typeStyle[d.type]}`}>
                                        {d.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">{d.activeDays}</td>
                                <td className="px-6 py-4 text-zinc-500">{d.timeSlot}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                        d.status === 'Active'
                                            ? 'bg-[#CF0738] text-white'
                                            : 'bg-zinc-100 text-zinc-400'
                                    }`}>
                                        {d.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 text-sm">
                                    No deals found for this type.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
