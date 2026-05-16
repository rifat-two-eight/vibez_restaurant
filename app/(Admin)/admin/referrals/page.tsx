'use client';

import React, { useState } from 'react';
import { 
    Line, 
    LineChart, 
    Bar, 
    BarChart, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart,
    Dot
} from 'recharts';
import { 
    Users, 
    TrendingUp, 
    CreditCard, 
    DollarSign,
    ChevronRight,
    Search,
    Filter,
    ArrowUpRight,
    Settings2,
    CheckCircle2,
    UserPlus,
    ShoppingBag,
    Wallet,
    Award
} from 'lucide-react';

const growthData = [
    { month: 'Jan', newUsers: 150, conversions: 120 },
    { month: 'Feb', newUsers: 180, conversions: 140 },
    { month: 'Mar', newUsers: 160, conversions: 130 },
    { month: 'Apr', newUsers: 220, conversions: 180 },
    { month: 'May', newUsers: 260, conversions: 210 },
    { month: 'Jun', newUsers: 300, conversions: 240 },
];

const commissionData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5100 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 7500 },
    { month: 'Jun', revenue: 8900 },
];

const pendingPayouts = [
    { affiliate: 'Sarah Johnson', amount: '€320', source: 'Monthly Subscriptions', subId: '#SUB-1647', dueDate: '2026-05-20', status: 'Pending' },
    { affiliate: 'Michael Chen', amount: '€280', source: 'Annual Subscriptions', subId: '#SUB-1845', dueDate: '2026-05-22', status: 'Pending' },
    { affiliate: 'Emma Wilson', amount: '€185', source: 'Monthly Subscriptions', subId: '#SUB-1843', dueDate: '2026-05-25', status: 'Approved' },
];

export default function ReferralsPage() {
    const [commissionPercent, setCommissionPercent] = useState(10);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-[#10B981]" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">Referral & Affiliate System</h1>
                </div>
                <p className="text-zinc-500 text-sm">The heart of your business - manage referrals, affiliates, and commission payouts</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-[#10B981]/20 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Referral Revenue</p>
                    <h3 className="text-2xl font-bold text-white mb-4">€89,400</h3>
                    <p className="text-[10px] text-zinc-500">This month: <span className="text-zinc-300">€23,100</span></p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div className="mt-4 text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 18.7%
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Affiliates</p>
                    <h3 className="text-2xl font-bold text-white mb-4">347</h3>
                    <p className="text-[10px] text-zinc-500">Normal: 298 | Influencers: 49</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="mt-4 text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 12.3%
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Active Referral Subscriptions</p>
                    <h3 className="text-2xl font-bold text-white mb-4">1,847</h3>
                    <p className="text-[10px] text-zinc-500">Generating commissions</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="mt-4 text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 15.2%
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Commission Paid</p>
                    <h3 className="text-2xl font-bold text-white mb-4">€34,200</h3>
                    <p className="text-[10px] text-zinc-500">Pending: <span className="text-zinc-300">€5,280</span></p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <h3 className="text-base font-bold text-white mb-8">Monthly Referral Growth</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 12}} />
                                <Tooltip contentStyle={{backgroundColor: '#171717', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px'}} />
                                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} dot={{r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#171717'}} activeDot={{r: 6, strokeWidth: 0}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" /> newUsers
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#10B981]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> conversions
                        </div>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-base font-bold text-white">Commission Revenue Graph</h3>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded">KEY METRIC</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={commissionData}>
                                <defs>
                                    <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 12}} />
                                <Tooltip contentStyle={{backgroundColor: '#171717', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px'}} />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorComm)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Global Referral Settings */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-8">
                    <Settings2 className="w-5 h-5 text-zinc-400" />
                    <h3 className="text-base font-bold text-white">Global Referral Settings</h3>
                </div>
                
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-400">Default Commission Percentage</label>
                            <span className="text-sm font-bold text-white">{commissionPercent}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="50" 
                            value={commissionPercent}
                            onChange={(e) => setCommissionPercent(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#10B981]" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Default Commission Duration</label>
                            <input type="text" placeholder="e.g. 12 Months" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Maximum Total Commission</label>
                            <input type="text" placeholder="e.g. €1000" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center justify-between group">
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-white">Qualification Rule</p>
                                <p className="text-xs text-zinc-500">Commission starts only after first successful payment</p>
                            </div>
                            <button className="w-12 h-6 bg-[#10B981] rounded-full relative transition-all">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Commission Stop Rules</p>
                            {[
                                "Stop after payout limit reached",
                                "Stop after duration ends",
                                "Stop if subscription cancelled"
                            ].map((rule, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-zinc-400">{rule}</p>
                                    <button className="w-12 h-6 bg-[#10B981] rounded-full relative transition-all">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Payouts */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5">
                    <h3 className="text-base font-bold text-white">Pending Payouts</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Affiliate</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Payment Source</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Subscription ID</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pendingPayouts.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{p.affiliate}</p>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-white">{p.amount}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500">{p.source}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500 font-mono">{p.subId}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500">{p.dueDate}</td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                            p.status === 'Pending' 
                                            ? 'bg-orange-500/10 text-orange-500' 
                                            : 'bg-[#10B981]/10 text-[#10B981]'
                                        }`}>
                                            <div className={`w-1 h-1 rounded-full ${p.status === 'Pending' ? 'bg-orange-500' : 'bg-[#10B981]'}`} />
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <button className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                                                p.status === 'Approved'
                                                ? 'bg-[#10B981]/10 text-[#10B981] cursor-default'
                                                : 'bg-[#10B981] text-white hover:bg-[#0da673]'
                                            }`}>
                                                {p.status === 'Approved' ? 'Approved' : 'Approve'}
                                            </button>
                                            <button className="px-4 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-700 transition-all">Hold</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Referral User Journey */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl p-10 mt-12">
                <h3 className="text-base font-bold text-white mb-10">Referral User Journey</h3>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    {[
                        { step: "STEP 1", title: "Invite Friend", icon: UserPlus },
                        { step: "STEP 2", title: "User Registers", icon: CheckCircle2 },
                        { step: "STEP 3", title: "User Purchases Subscription", icon: ShoppingBag },
                        { step: "STEP 4", title: "First Payment Confirmed", icon: Wallet },
                        { step: "STEP 5", title: "Referral Activated", icon: Award },
                    ].map((item, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex-1 min-w-[180px] group">
                                <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-6 text-center group-hover:bg-[#10B981]/10 transition-all border-dashed">
                                    <p className="text-[9px] font-bold text-[#10B981] mb-2">{item.step}</p>
                                    <p className="text-sm font-bold text-white">{item.title}</p>
                                </div>
                            </div>
                            {idx < 4 && (
                                <ChevronRight className="w-5 h-5 text-zinc-700" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
