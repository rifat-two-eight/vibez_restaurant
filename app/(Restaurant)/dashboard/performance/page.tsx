'use client';

import React from 'react';
import { Award, TrendingUp, Clock, Tag } from 'lucide-react';

export default function PerformancePage() {
    const stats = [
        {
            label: 'Total Claims',
            value: '1,847',
            sub: '+12.5%',
            subColor: 'text-emerald-500',
            icon: Award,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Conversion Rate',
            value: '68.3%',
            sub: '+5.2%',
            subColor: 'text-emerald-500',
            icon: TrendingUp,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Peak Hours',
            value: '6-8 PM',
            sub: 'Dinner',
            subColor: 'text-zinc-400',
            icon: Clock,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Most Popular Deal',
            value: '2-for-1 Dinner',
            sub: '432 claims',
            subColor: 'text-zinc-400',
            icon: Tag,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
    ];

    const topDeals = [
        { name: '2-for-1 Dinner',  claims: 432, max: 432 },
        { name: 'Free Drink Offer', claims: 318, max: 432 },
        { name: 'Weekend Special',  claims: 245, max: 432 },
    ];

    const insights = [
        {
            label: 'Best Day',
            value: 'Friday – 287 customers',
            icon: TrendingUp,
            bg: 'bg-emerald-50',
            labelColor: 'text-emerald-700',
            valueColor: 'text-emerald-800',
            iconColor: 'text-emerald-500',
        },
        {
            label: 'Average Wait Time',
            value: '12 minutes',
            icon: Clock,
            bg: 'bg-blue-50',
            labelColor: 'text-blue-700',
            valueColor: 'text-blue-800',
            iconColor: 'text-blue-500',
        },
        {
            label: 'Customer Satisfaction',
            value: '4.7/5.0 ⭐',
            icon: Award,
            bg: 'bg-purple-50',
            labelColor: 'text-purple-700',
            valueColor: 'text-purple-800',
            iconColor: 'text-purple-500',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Performance</h1>
                <p className="text-zinc-500 text-sm mt-1">Track your restaurant's key metrics and performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-[10px] border border-zinc-100 p-5">
                            <div className="flex items-start justify-between mb-4">
                                <p className="text-xs text-zinc-400 font-medium">{s.label}</p>
                                <div className={`p-2 rounded-[8px] ${s.iconBg}`}>
                                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-zinc-900 mb-1">{s.value}</p>
                            <p className={`text-xs font-semibold flex items-center gap-1 ${s.subColor}`}>
                                {s.sub.startsWith('+') && <TrendingUp className="w-3 h-3" />}
                                {s.sub}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Deals */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-6">
                    <h2 className="text-base font-bold text-zinc-900">Top Performing Deals</h2>
                    <div className="space-y-5">
                        {topDeals.map((deal) => {
                            const pct = Math.round((deal.claims / deal.max) * 100);
                            return (
                                <div key={deal.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-zinc-800">{deal.name}</span>
                                        <span className="text-zinc-400 text-xs">{deal.claims} claims</span>
                                    </div>
                                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#013622] rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Weekly Insights */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-6">
                    <h2 className="text-base font-bold text-zinc-900">Weekly Insights</h2>
                    <div className="space-y-4">
                        {insights.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className={`flex items-center justify-between p-4 rounded-[10px] ${item.bg}`}>
                                    <div>
                                        <p className={`text-xs font-semibold ${item.labelColor}`}>{item.label}</p>
                                        <p className={`text-sm font-bold mt-0.5 ${item.valueColor}`}>{item.value}</p>
                                    </div>
                                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
