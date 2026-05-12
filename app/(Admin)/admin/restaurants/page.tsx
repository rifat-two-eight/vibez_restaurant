'use client';

import React, { useState } from 'react';

type SubStatus = 'Active' | 'Pending' | 'Expired';
type ScheduleStatus = 'Valid' | 'Invalid';

type Restaurant = {
    id: number;
    name: string;
    owner: string;
    activeDeals: number;
    subStatus: SubStatus;
    schedule: ScheduleStatus;
    totalBookings: number;
};

const subStyle: Record<SubStatus, string> = {
    Active:  'bg-[#CF0738] text-white',
    Pending: 'bg-zinc-100 text-zinc-500',
    Expired: 'bg-orange-100 text-orange-600',
};

const scheduleStyle: Record<ScheduleStatus, string> = {
    Valid:   'bg-[#CF0738] text-white',
    Invalid: 'bg-[#CF0738]/80 text-white',
};

const initialRestaurants: Restaurant[] = [
    { id: 1, name: 'The Golden Fork', owner: 'Maria Garcia',  activeDeals: 5, subStatus: 'Active',  schedule: 'Valid',   totalBookings: 234 },
    { id: 2, name: 'Ocean Breeze',    owner: 'Tom Chen',      activeDeals: 3, subStatus: 'Active',  schedule: 'Valid',   totalBookings: 189 },
    { id: 3, name: 'Spice Garden',    owner: 'Raj Patel',     activeDeals: 1, subStatus: 'Pending', schedule: 'Invalid', totalBookings: 45  },
    { id: 4, name: 'La Bella Vista',  owner: 'Sofia Rossi',   activeDeals: 7, subStatus: 'Active',  schedule: 'Valid',   totalBookings: 412 },
    { id: 5, name: 'Urban Grill',     owner: 'Mike Johnson',  activeDeals: 4, subStatus: 'Active',  schedule: 'Valid',   totalBookings: 278 },
];

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);

    const handleApprove = (id: number) => {
        setRestaurants(rs => rs.map(r => r.id === id ? { ...r, subStatus: 'Active', schedule: 'Valid' } : r));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Restaurants</h1>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Restaurant Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Owner Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Active Deals</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Subscription Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Weekly Schedule</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Total Bookings</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {restaurants.map(r => (
                            <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{r.name}</td>
                                <td className="px-6 py-4 text-zinc-500">{r.owner}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#CF0738] text-white text-xs font-bold">
                                        {r.activeDeals}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${subStyle[r.subStatus]}`}>
                                        {r.subStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${scheduleStyle[r.schedule]}`}>
                                        {r.schedule}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-600 font-medium">{r.totalBookings}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleApprove(r.id)}
                                            className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            View Details
                                        </button>
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            Edit
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
