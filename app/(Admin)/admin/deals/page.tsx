'use client';

import React from 'react';
import { 
    Tag, 
    TrendingUp, 
    Clock, 
    Eye, 
    ShieldAlert, 
    Search, 
    Filter,
    MoreHorizontal,
    ArrowUpRight
} from 'lucide-react';

const liveDeals = [
    { restaurant: 'The Golden Fork', title: '50% Off Lunch Special', claimed: 342, views: 1847, expiry: '2026-05-20', status: 'Active' },
    { restaurant: 'Ocean Blue Seafood', title: 'Buy 1 Get 1 Free Sushi', claimed: 287, views: 1523, expiry: '2026-05-18', status: 'Active' },
    { restaurant: 'Mountain View Steakhouse', title: 'Free Dessert with Dinner', claimed: 198, views: 892, expiry: '2026-05-15', status: 'Expiring Soon' },
    { restaurant: 'Spice Route Indian', title: '30% Off Weekend Dinner', claimed: 456, views: 2134, expiry: '2026-05-25', status: 'Active' },
    { restaurant: 'Garden Terrace Cafe', title: 'Free Coffee with Brunch', claimed: 123, views: 674, expiry: '2026-05-14', status: 'Expiring Soon' },
];

const peakTimes = [
    { time: '12:00 PM', value: 145 },
    { time: '1:00 PM', value: 178 },
    { time: '2:00 PM', value: 92 },
    { time: '6:00 PM', value: 203 },
    { time: '7:00 PM', value: 267 },
    { time: '8:00 PM', value: 189 },
    { time: '9:00 PM', value: 134 },
];

export default function DealsManagement() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Deals Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Monitor restaurant-generated deals across the platform</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Live Deals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">1,243</h3>
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 23 today
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Most Claimed</p>
                    <h3 className="text-3xl font-bold text-white mb-2">456</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Spice Route Indian</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Expiring Today</p>
                    <h3 className="text-3xl font-bold text-white mb-2">12</h3>
                    <p className="text-[11px] text-orange-500 font-bold">Requires attention</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Draft Deals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">34</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Pending review</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Live Deal Monitoring */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                    <div>
                        <h3 className="text-base font-bold text-white">Live Deal Monitoring</h3>
                        <p className="text-xs text-zinc-500 mt-1">Deals are created by restaurant owners - Admin view only</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input type="text" placeholder="Search deals..." className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-64" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[12px] text-zinc-400 font-medium">
                            <Filter className="w-4 h-4" />
                            Filter by Restaurant
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Restaurant</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Deal Title</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Times Claimed</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Views</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Expiry Date</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {liveDeals.map((deal, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{deal.restaurant}</p>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-zinc-300">{deal.title}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-sm font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-lg">
                                            {deal.claimed}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-zinc-400 text-center">{deal.views}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500 text-center">{deal.expiry}</td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                            deal.status === 'Active' 
                                            ? 'bg-[#10B981]/10 text-[#10B981]' 
                                            : 'bg-orange-500/10 text-orange-500'
                                        }`}>
                                            {deal.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-3 text-zinc-500">
                                            <button className="p-2 hover:bg-white/5 rounded-lg hover:text-white transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg hover:text-red-500 transition-all">
                                                <ShieldAlert className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Peak Booking Times */}
            <div className="space-y-6">
                <h3 className="text-base font-bold text-white px-2">Peak Booking Times</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {peakTimes.map((item, idx) => (
                        <div key={idx} className="bg-[#171717] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 group hover:border-[#10B981]/30 transition-all">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.time}</p>
                            <h4 className="text-2xl font-bold text-white tracking-tight">{item.value}</h4>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                <div className="h-full bg-[#10B981]" style={{ width: `${(item.value / 300) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
