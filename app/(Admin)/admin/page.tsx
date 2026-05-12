'use client';

import React from 'react';

type Stat = {
    label: string;
    value: string;
    trend?: string;
    trendColor?: string;
};

const stats: Stat[] = [
    { label: 'Total Users',            value: '12,458', trend: '+12.5%', trendColor: 'text-emerald-500' },
    { label: 'Active Subscriptions',   value: '8,234',  trend: '+8.2%',  trendColor: 'text-emerald-500' },
    { label: 'Total Restaurants',      value: '456',    trend: '+15.3%', trendColor: 'text-emerald-500' },
    { label: 'Active Deals',           value: '1,234',  trend: '+5.7%',  trendColor: 'text-emerald-500' },
    { label: 'Total Bookings Today',   value: '347',    trend: '+23.1%', trendColor: 'text-emerald-500' },
    { label: 'Revenue This Month',     value: '$45,678',trend: '+18.9%', trendColor: 'text-emerald-500' },
    { label: 'Referral Earnings (Paid)', value: '$12,345', trend: '+10.2%', trendColor: 'text-emerald-500' },
    { label: 'Pending Commissions',    value: '$3,456' },
];

export default function AdminOverview() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Super Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-3">{s.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-zinc-900">{s.value}</span>
                            {s.trend && (
                                <span className={`text-xs font-semibold ${s.trendColor}`}>{s.trend}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
