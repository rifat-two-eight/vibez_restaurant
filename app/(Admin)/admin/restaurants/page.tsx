'use client';

import React from 'react';
import { 
    Store, 
    Calendar, 
    DollarSign, 
    TrendingUp, 
    MapPin, 
    CheckCircle2, 
    Clock,
    MoreHorizontal,
    Search,
    Filter
} from 'lucide-react';

const approvalQueue = [
    { id: 1, name: 'Bella Italia Trattoria', owner: 'Marco Rossi', city: 'Milan', submitted: '2026-05-10', documents: 'Complete' },
    { id: 2, name: 'Le Petit Bistro', owner: 'Sophie Laurent', city: 'Paris', submitted: '2026-05-11', documents: 'Pending' },
    { id: 3, name: 'Sushi Zen Garden', owner: 'Kenji Tanaka', city: 'Tokyo', submitted: '2026-05-12', documents: 'Complete' },
];

const performanceData = [
    { name: 'The Golden Fork', deals: 12, bookings: 487, rate: '78.3%', revenue: '€14,610', subscribers: 156, status: 'high' },
    { name: 'Ocean Blue Seafood', deals: 8, bookings: 342, rate: '65.7%', revenue: '€10,260', subscribers: 98, status: 'high' },
    { name: 'Mountain View Steakhouse', deals: 15, bookings: 598, rate: '82.1%', revenue: '€17,940', subscribers: 203, status: 'high' },
    { name: 'Garden Terrace Cafe', deals: 6, bookings: 234, rate: '54.2%', revenue: '€7,020', subscribers: 67, status: 'mid' },
    { name: 'Spice Route Indian', deals: 10, bookings: 412, rate: '71.8%', revenue: '€12,360', subscribers: 134, status: 'high' },
];

export default function RestaurantManagement() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Restaurant Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Approve new restaurants and monitor performance</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Restaurants</p>
                    <h3 className="text-3xl font-bold text-white mb-2">387</h3>
                    <p className="text-[11px] text-[#10B981] font-bold">↑ 12 this month</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Store className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Pending Approvals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">23</h3>
                    <p className="text-[11px] text-orange-500 font-bold">Requires attention</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-white mb-2">€62,190</h3>
                    <p className="text-[11px] text-[#10B981] font-bold">↑ 8.4% this month</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Avg Performance</p>
                    <h3 className="text-3xl font-bold text-white mb-2">70.4%</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Redemption rate</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Approval Queue */}
            <div className="space-y-6">
                <h3 className="text-base font-bold text-white px-2">Restaurant Approval Queue</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {approvalQueue.map((item) => (
                        <div key={item.id} className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-6 group hover:border-[#10B981]/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                                    <Store className="w-6 h-6 text-[#10B981]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                    <p className="text-xs text-zinc-500">{item.owner}</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-zinc-500 font-medium">City</span>
                                    <span className="text-white font-bold">{item.city}</span>
                                </div>
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-zinc-500 font-medium">Submitted</span>
                                    <span className="text-zinc-400">{item.submitted}</span>
                                </div>
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-zinc-500 font-medium">Documents</span>
                                    <span className={`font-bold ${item.documents === 'Complete' ? 'text-[#10B981]' : 'text-orange-500'}`}>
                                        {item.documents}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button className="flex-1 py-2.5 rounded-xl bg-[#10B981] text-white text-[11px] font-bold hover:bg-[#0da673] transition-all shadow-lg shadow-[#10B981]/10">
                                    Approve
                                </button>
                                <button className="flex-1 py-2.5 rounded-xl bg-white/5 text-red-500 text-[11px] font-bold hover:bg-red-500/10 transition-all">
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden mt-8">
                <div className="p-8 flex justify-between items-center border-b border-white/5">
                    <h3 className="text-base font-bold text-white">Restaurant Performance</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input type="text" placeholder="Search..." className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-64" />
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4 text-zinc-400" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Restaurant</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Active Deals</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Total Bookings</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Redemption Rate</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Revenue Generated</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Subscribers Attracted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {performanceData.map((res, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#10B981]/5 flex items-center justify-center text-[#10B981] font-bold text-xs uppercase">
                                                {res.name.charAt(0)}
                                            </div>
                                            <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{res.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-white font-medium text-center">{res.deals}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-400 text-center">{res.bookings}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`text-sm font-bold ${res.status === 'high' ? 'text-[#10B981]' : 'text-orange-500'}`}>
                                            {res.rate}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-white font-bold">{res.revenue}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-300 font-medium">{res.subscribers}</span>
                                            <div className="h-1 flex-1 bg-white/5 rounded-full max-w-[60px] overflow-hidden">
                                                <div className="h-full bg-[#10B981]" style={{ width: `${(res.subscribers / 250) * 100}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
