'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, ArrowUpRight, ArrowDownRight, UserCheck } from 'lucide-react';
import { useGetUserActivityQuery } from '../../../../../redux/features/dashboard/dashboardApi';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default function UserActivityPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const { data: activityRes, isLoading } = useGetUserActivityQuery(id);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <p className="text-zinc-400 animate-pulse">Loading user activity...</p>
            </div>
        );
    }

    const { user, referrals, commissions, withdrawals, subscriptions } = activityRes?.data || {};

    if (!user) {
        return (
            <div className="flex flex-col h-[400px] items-center justify-center gap-4">
                <p className="text-zinc-400">User not found.</p>
                <button onClick={() => router.back()} className="text-[#10B981] hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-5 h-5 text-zinc-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">User Profile & Activity</h1>
                    <p className="text-zinc-500 text-sm mt-1">Detailed overview of user activity and transactions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="space-y-6">
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                {user.profileImage ? (
                                    <Image src={getImageUrl(user.profileImage)} alt={user.name} width={64} height={64} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-zinc-500">{user.name?.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <span className={`inline-flex px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider ${user.isInfluencer ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#1447E6]/10 text-[#1447E6]'
                                    }`}>
                                    {user.isInfluencer ? 'Influencer' : 'User'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">{user.phone || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm border-t border-white/5 pt-4 mt-2">
                                <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-2">Location</span>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                                    <span className="text-zinc-300 text-xs">
                                        {user.address ? `${user.address.street || ''}, ${user.address.city || ''}, ${user.address.country || ''}` : 'No address provided'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm border-t border-white/5 pt-4">
                                <Calendar className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Referral Settings</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Referral Code</span>
                                <span className="text-xs font-mono font-bold bg-white/5 px-2 py-1 rounded text-zinc-300">{user.referralCode || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Commission Rate</span>
                                <span className="text-sm font-bold text-[#10B981]">{user.commissionPercentage}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Max Payout limit</span>
                                <span className="text-sm font-bold text-white">CHF {user.maxPayout}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Current Balance</span>
                                <span className="text-sm font-bold text-white">CHF {user.balance}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Referrals</p>
                            <h3 className="text-xl font-bold text-white">{user.referralsTotalCount || 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Active Subs from Referrals</p>
                            <h3 className="text-xl font-bold text-[#10B981]">{user.activeSubscriptionFromHimTotal || 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Subscriptions</p>
                            <h3 className="text-xl font-bold text-white">{subscriptions?.length || 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Withdrawals</p>
                            <h3 className="text-xl font-bold text-white">{withdrawals?.length || 0}</h3>
                        </div>
                    </div>

                    {/* Subscriptions */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2"><CreditCard className="w-4 h-4 text-purple-500" /> Subscription History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/2">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Plan Name</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">End Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {subscriptions?.length > 0 ? subscriptions.map((sub: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/2">
                                            <td className="px-6 py-4 text-sm font-bold text-white">{sub.subscriptionPlanId?.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'ACTIVE' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-red-500/10 text-red-500'}`}>{sub.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-300">CHF {sub.subscriptionPlanId?.price}</td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{new Date(sub.startDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{new Date(sub.endDate).toLocaleDateString()}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-sm">No subscriptions found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Referrals */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex gap-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2"><UserCheck className="w-4 h-4 text-[#10B981]" /> Recent Referrals</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/2">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Plan</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {referrals?.length > 0 ? referrals.map((ref: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/2">
                                            <td className="px-6 py-4 text-sm font-bold text-white">{ref.name}</td>
                                            <td className="px-6 py-4 text-sm text-zinc-300">{ref.planName || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-zinc-300">{ref.status || 'Active'}</td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{new Date(ref.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">No referrals found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Commissions */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex gap-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2"><ArrowDownRight className="w-4 h-4 text-[#10B981]" /> Commission History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/2">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Source User</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {commissions?.length > 0 ? commissions.map((c: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/2">
                                            <td className="px-6 py-4 text-sm font-bold text-[#10B981]">CHF {c.amount}</td>
                                            <td className="px-6 py-4 text-sm text-zinc-300">{c.sourceUser?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${c.status === 'COMPLETED' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-orange-500/10 text-orange-500'}`}>{c.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">No commissions found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Withdrawals */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-orange-500" /> Withdrawal History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/2">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {withdrawals?.length > 0 ? withdrawals.map((w: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/2">
                                            <td className="px-6 py-4 text-sm font-bold text-white">CHF {w.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${w.status === 'APPROVED' ? 'bg-[#10B981]/10 text-[#10B981]' : w.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'}`}>{w.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-300">{w.paymentMethod}</td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{new Date(w.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">No withdrawals found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
