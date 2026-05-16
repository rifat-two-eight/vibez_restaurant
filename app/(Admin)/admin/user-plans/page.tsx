'use client';

import React from 'react';
import { 
    Users, 
    CreditCard, 
    AlertCircle, 
    RefreshCw, 
    TrendingUp, 
    MoreHorizontal,
    ArrowUpRight,
    Edit3,
    Eye
} from 'lucide-react';

const plans = [
    { name: 'Day Pass', price: '€9.99', subscribers: 487, revenue: '€4,866', growth: '+12.3%', type: 'day' },
    { name: 'Monthly Plan', price: '€29.99', subscribers: 2340, revenue: '€70,177', growth: '+8.7%', type: 'monthly' },
    { name: 'Annual Plan', price: '€299.99', subscribers: 507, revenue: '€152,095', growth: '+15.2%', type: 'annual' },
];

const failedPayments = [
    { user: 'Alex Thompson', plan: 'Monthly Plan', amount: '€29.99', reason: 'Insufficient funds', attempts: '2/3', next: '2026-05-15' },
    { user: 'Maria Garcia', plan: 'Annual Plan', amount: '€299.99', reason: 'Card expired', attempts: '1/3', next: '2026-05-16' },
    { user: 'John Smith', plan: 'Monthly Plan', amount: '€29.99', reason: 'Payment declined', attempts: '3/3', next: '2026-05-14' },
];

const freeTrials = [
    { user: 'Emma Brown', plan: 'Monthly Plan', remaining: '5 days', status: 'mid' },
    { user: 'James Lee', plan: 'Monthly Plan', remaining: '12 days', status: 'high' },
    { user: 'Sophia Kim', plan: 'Annual Plan', remaining: '3 days', status: 'low' },
    { user: 'Daniel Park', plan: 'Monthly Plan', remaining: '8 days', status: 'high' },
];

export default function SubscriptionManagement() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage subscription plans and monitor revenue</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Subscribers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">2,847</h3>
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 8.2% this month
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Monthly Revenue</p>
                    <h3 className="text-3xl font-bold text-white mb-2">€227K</h3>
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 12.1% this month
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Failed Payments</p>
                    <h3 className="text-3xl font-bold text-white mb-2">23</h3>
                    <p className="text-[11px] text-orange-500 font-bold">Requires attention</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Upcoming Renewals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">342</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Next 7 days</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {plans.map((plan, i) => (
                    <div key={i} className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6 hover:border-[#10B981]/30 transition-all group">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                            <span className="text-2xl font-bold text-[#10B981]">{plan.price}</span>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-500">Subscribers</span>
                                <span className="text-sm font-bold text-white">{plan.subscribers}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-500">Revenue</span>
                                <span className="text-sm font-bold text-white">{plan.revenue}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-500">Growth</span>
                                <span className="text-sm font-bold text-[#10B981]">{plan.growth}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button className="flex-1 py-2.5 rounded-xl bg-white/5 text-zinc-400 text-[11px] font-bold hover:bg-white/10 hover:text-white transition-all">
                                Edit Pricing
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-[#10B981]/10 text-[#10B981] text-[11px] font-bold hover:bg-[#10B981]/20 transition-all">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Failed Payments Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden mt-12">
                <div className="p-8 flex justify-between items-center border-b border-white/5">
                    <h3 className="text-base font-bold text-white">Failed Payments</h3>
                    <button className="px-5 py-2 rounded-xl bg-[#10B981] text-white text-[11px] font-bold hover:bg-[#0da673] transition-all shadow-lg shadow-[#10B981]/10">
                        Retry All (3)
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Plan</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Failure Reason</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Retry Attempts</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Next Retry</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {failedPayments.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-white">{p.user}</p>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-zinc-400">{p.plan}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-white">{p.amount}</td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm text-red-500 font-medium">{p.reason}</span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-sm text-orange-400 font-bold">{p.attempts}</span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-zinc-500 text-center font-mono">{p.next}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-end">
                                            <button className="px-4 py-1.5 rounded-lg bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#0da673] transition-all">
                                                Retry Now
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Active Free Trials */}
            <div className="mt-12 space-y-6">
                <h3 className="text-base font-bold text-white px-2">Active Free Trials</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {freeTrials.map((trial, i) => (
                        <div key={i} className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-3 group hover:border-[#10B981]/30 transition-all">
                            <div>
                                <h4 className="font-bold text-white text-sm">{trial.user}</h4>
                                <p className="text-[11px] text-zinc-500">{trial.plan}</p>
                            </div>
                            <p className={`text-[11px] font-bold ${
                                trial.status === 'high' ? 'text-[#10B981]' : 'text-orange-500'
                            }`}>
                                {trial.remaining} remaining
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
