'use client';

import React from 'react';
import { 
    Users, 
    UserCheck, 
    Award, 
    Crown, 
    Search, 
    Filter,
    Edit3,
    Eye,
    Ban,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';

const userData = [
    { name: 'Sarah Johnson', email: 'sarah.j@email.com', type: 'Influencer', code: 'SARAH2024', referrals: 142, subs: 98, earnings: '€4,260', commission: '15%', plan: 'Annual' },
    { name: 'Michael Chen', email: 'm.chen@email.com', type: 'Influencer', code: 'MIKE15', referrals: 128, subs: 84, earnings: '€3,840', commission: '12%', plan: 'Monthly' },
    { name: 'Jennifer Davis', email: 'jdavis@email.com', type: 'Regular User', code: 'JENDAVIS', referrals: 12, subs: 8, earnings: '€240', commission: '10%', plan: 'Monthly' },
    { name: 'Robert Taylor', email: 'rtaylor@email.com', type: 'Regular User', code: 'ROBTAY', referrals: 8, subs: 5, earnings: '€150', commission: '10%', plan: 'Annual' },
    { name: 'Emma Wilson', email: 'ewilson@email.com', type: 'Influencer', code: 'EMMA18', referrals: 95, subs: 67, earnings: '€2,850', commission: '10%', plan: 'Monthly' },
    { name: 'Amanda White', email: 'awhite@email.com', type: 'Regular User', code: 'AMANDA24', referrals: 15, subs: 11, earnings: '€330', commission: '10%', plan: 'Monthly' },
    { name: 'David Martinez', email: 'dmartinez@email.com', type: 'Influencer', code: 'DAVID20', referrals: 87, subs: 61, earnings: '€2,610', commission: '20%', plan: 'Annual' },
    { name: 'Kevin Brown', email: 'kbrown@email.com', type: 'Regular User', code: 'KEVIN8', referrals: 6, subs: 4, earnings: '€120', commission: '10%', plan: 'Day Pass' },
    { name: 'Lisa Anderson', email: 'landerson@email.com', type: 'Influencer', code: 'LISA12', referrals: 73, subs: 52, earnings: '€2,190', commission: '12%', plan: 'Annual' },
    { name: 'Michelle Green', email: 'mgreen@email.com', type: 'Regular User', code: 'MICH10', referrals: 19, subs: 13, earnings: '€390', commission: '10%', plan: 'Monthly' },
];

export default function UserManagement() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage all users, customers, and influencers</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Users</p>
                    <h3 className="text-3xl font-bold text-white mb-2">10</h3>
                    <p className="text-[11px] text-[#10B981] font-bold uppercase tracking-wider">All registered users</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Regular Customers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">5</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Standard users</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Influencers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">5</h3>
                    <p className="text-[11px] text-[#10B981] font-bold">With custom commissions</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#10B981]" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Premium Users</p>
                    <h3 className="text-3xl font-bold text-white mb-2">4</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Annual subscribers</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                    <h3 className="text-base font-bold text-white">All Users</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input type="text" placeholder="Search users..." className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-64" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[12px] text-zinc-400 font-medium">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Referral Code</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Referrals</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Active Subs</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Earnings</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Commission</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Subscription</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {userData.map((user, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{user.name}</p>
                                            <p className="text-[11px] text-zinc-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                            user.type === 'Influencer' 
                                            ? 'bg-[#10B981]/10 text-[#10B981]' 
                                            : 'bg-[#1447E6]/10 text-[#1447E6]'
                                        }`}>
                                            {user.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                                            {user.code}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-white text-center">{user.referrals}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-400 text-center">{user.subs}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-white">{user.earnings}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-[#10B981]">{user.commission}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500 font-medium">{user.plan}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-3 text-zinc-500">
                                            <button className="p-2 hover:bg-white/5 rounded-lg hover:text-[#10B981] transition-all">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg hover:text-white transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg hover:text-red-500 transition-all">
                                                <Ban className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-zinc-500">Showing 10 of 10 users</p>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-zinc-500 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-zinc-300 hover:bg-white/10 transition-all">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
