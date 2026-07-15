'use client';

import React from 'react';
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
    AreaChart
} from 'recharts';
import {
    Users,
    DollarSign,
    TrendingUp,
    Store,
    Tag,
    CalendarCheck,
    ArrowUpRight
} from 'lucide-react';
import { useGetAdminDashboardStatsQuery, useGetRevenueBreakdownQuery } from '../../../redux/features/dashboard/dashboardApi';
import { useGetAllUserSubscriptionsQuery } from '@/redux/features/admin/subscriptionApi';
import { useGetWeeklyBookingsQuery } from '../../../redux/features/reservations/reservationApi';

const revenueData = [
    { month: 'Jan', revenue: 45000, referrals: 32000 },
    { month: 'Feb', revenue: 52000, referrals: 38000 },
    { month: 'Mar', revenue: 48000, referrals: 35000 },
    { month: 'Apr', revenue: 61000, referrals: 42000 },
    { month: 'May', revenue: 65000, referrals: 48000 },
    { month: 'Jun', revenue: 58000, referrals: 40000 },
];

const bookingData = [
    { day: 'Mon', bookings: 45 },
    { day: 'Tue', bookings: 52 },
    { day: 'Wed', bookings: 48 },
    { day: 'Thu', bookings: 62 },
    { day: 'Fri', bookings: 78 },
    { day: 'Sat', bookings: 95 },
    { day: 'Sun', bookings: 88 },
];

const recentSubscriptions = [
    { user: 'Emma Rodriguez', plan: 'Monthly', referral: 'Referred', amount: 'CHF 29.99', status: 'Active' },
    { user: 'Lucas Chen', plan: 'Annual', referral: 'Direct', amount: 'CHF 299.99', status: 'Active' },
    { user: 'Sofia Martinez', plan: 'Monthly', referral: 'Referred', amount: 'CHF 29.99', status: 'Trial' },
    { user: 'James Wilson', plan: 'Day Pass', referral: 'Referred', amount: 'CHF 9.99', status: 'Active' },
    { user: 'Olivia Brown', plan: 'Annual', referral: 'Direct', amount: 'CHF 299.99', status: 'Active' },
];

export default function AdminOverview() {
    const { data: statsData, isLoading: isStatsLoading } = useGetAdminDashboardStatsQuery(undefined);
    const { data: weeklyBookingsData, isLoading: isWeeklyBookingsLoading } = useGetWeeklyBookingsQuery(undefined);
    const { data: revenueBreakdownData, isLoading: isRevenueBreakdownLoading } = useGetRevenueBreakdownQuery(undefined);
    const { data: allSubscriptionsData, isLoading: isSubscriptionsLoading } = useGetAllUserSubscriptionsQuery();

    if (isStatsLoading || isWeeklyBookingsLoading || isRevenueBreakdownLoading || isSubscriptionsLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <p className="text-zinc-400 animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    const stats = statsData?.data;
    const formattedBookingData = weeklyBookingsData?.data?.currentWeek?.map((item: any) => ({
        day: item.day,
        bookings: item.count
    })) || bookingData;

    const formattedRevenueData = revenueBreakdownData?.data || revenueData;

    const formattedSubscriptions = allSubscriptionsData?.data?.map((sub: any) => ({
        user: sub.userId?.name || 'Unknown',
        plan: sub.subscriptionPlanId?.name || 'Unknown',
        referral: sub.commissionUser ? 'Referred' : 'Direct',
        amount: `CHF${sub.subscriptionPlanId?.price || 0}`,
        status: sub.status === 'ACTIVE' ? 'Active' : sub.status === 'TRIAL' ? 'Trial' : sub.status,
    })) || recentSubscriptions;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-zinc-500 text-sm mt-1">Monitor your restaurant marketplace performance</p>
            </div>

            {/* Stats Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">CHF {stats?.revenue?.totalRevenue || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Monthly: <span className="text-zinc-300">CHF {stats?.revenue?.monthlyRevenue || '0'}</span></span>
                        <span className="text-zinc-500">Annual: <span className="text-zinc-300">CHF {stats?.revenue?.annualRevenue || '0'}</span></span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.revenue?.growthPercentage || '0'}%
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Subscribers</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.subscribers?.totalActiveSubscribers || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Users className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Monthly: <span className="text-zinc-300">{stats?.subscribers?.activeMonthlySubscribers || '0'}</span></span>
                        <span className="text-zinc-500">Trial: <span className="text-zinc-300">{stats?.subscribers?.activeTrialSubscribers || '0'}</span></span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.subscribers?.growthPercentage || '0'}%
                    </div>
                </div>

                <div className="bg-[#171717] border border-[#10B981]/20 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Referral Revenue</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">CHF {stats?.referralRevenue?.totalReferralRevenue || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-[#10B981]" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Commission: <span className="text-zinc-300">CHF {stats?.referralRevenue?.totalCommissionPaid || '0'}</span></span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.referralRevenue?.growthPercentage || '0'}%
                    </div>
                </div>
            </div>

            {/* Stats Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Restaurants</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.restaurants?.activeRestaurants || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Store className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Pending: <span className="text-zinc-300">{stats?.restaurants?.pendingRestaurants || '0'}</span></span>
                        <span className="text-zinc-500">Suspended: <span className="text-zinc-300">{stats?.restaurants?.suspendedRestaurants || '0'}</span></span>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Deals</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.deals?.activeDeals || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Tag className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Expiring today: <span className="text-zinc-300">{stats?.deals?.expiringToday || '0'}</span></span>
                        <span className="text-zinc-500">Drafts: <span className="text-zinc-300">{stats?.deals?.draftDeals || '0'}</span></span>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Total Bookings</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.bookings?.totalBookings || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <CalendarCheck className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">Today: <span className="text-zinc-300">{stats?.bookings?.todayBookings || '0'}</span></span>
                        <span className="text-zinc-500">Weekly: <span className="text-zinc-300">{stats?.bookings?.weeklyBookings || '0'}</span></span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.bookings?.growthPercentage || '0'}%
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <h3 className="text-base font-bold text-white mb-8">Revenue Breakdown</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={formattedRevenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <h3 className="text-base font-bold text-white mb-8">Weekly Bookings</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedBookingData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                />
                                <Bar dataKey="bookings" fill="#10B981" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h3 className="text-base font-bold text-white">Recent Subscriptions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Plan</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Referral</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {formattedSubscriptions.map((sub: any, i: number) => (
                                <tr key={i} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-4 text-sm font-medium text-white">{sub.user}</td>
                                    <td className="px-8 py-4 text-sm text-zinc-400">{sub.plan}</td>
                                    <td className="px-8 py-4 text-sm text-zinc-400">
                                        <span className="flex items-center gap-1.5">
                                            {sub.referral === 'Referred' && <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />}
                                            {sub.referral}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 text-sm text-white font-medium">{sub.amount}</td>
                                    <td className="px-8 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sub.status === 'Active'
                                            ? 'bg-[#10B981]/10 text-[#10B981]'
                                            : 'bg-orange-500/10 text-orange-500'
                                            }`}>
                                            {sub.status}
                                        </span>
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
