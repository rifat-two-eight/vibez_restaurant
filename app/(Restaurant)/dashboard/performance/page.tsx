'use client';

import React from 'react';
import { Award, TrendingUp, Clock, Tag } from 'lucide-react';
import { useGetRestaurantOverviewQuery, useGetRestaurantInsightsQuery } from '@/redux/features/dashboard/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';

export default function PerformancePage() {
    const { data: overviewRes, isLoading: isOverviewLoading } = useGetRestaurantOverviewQuery({});
    const { data: insightsRes, isLoading: isInsightsLoading } = useGetRestaurantInsightsQuery({});

    const overview = overviewRes?.data || {};
    const insightsData = insightsRes?.data || {};

    if (isOverviewLoading || isInsightsLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div><Skeleton className="h-8 w-48 mb-2" /><Skeleton className="h-4 w-96" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <Skeleton className="h-32 w-full rounded-[10px]" />
                    <Skeleton className="h-32 w-full rounded-[10px]" />
                    <Skeleton className="h-32 w-full rounded-[10px]" />
                    <Skeleton className="h-32 w-full rounded-[10px]" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-[300px] w-full rounded-[10px]" />
                    <Skeleton className="h-[300px] w-full rounded-[10px]" />
                </div>
            </div>
        );
    }
    const stats = [
        {
            label: 'Total Claims',
            value: overview.totalClaims?.value || 0,
            sub: overview.totalClaims?.growth || '0%',
            subColor: (overview.totalClaims?.growth?.startsWith('-')) ? 'text-red-500' : 'text-emerald-500',
            icon: Award,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Conversion Rate',
            value: overview.conversionRate?.value || '0%',
            sub: overview.conversionRate?.growth || '0%',
            subColor: (overview.conversionRate?.growth?.startsWith('-')) ? 'text-red-500' : 'text-emerald-500',
            icon: TrendingUp,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Peak Hours',
            value: overview.peakHours?.timeRange || 'N/A',
            sub: overview.peakHours?.mealTime || 'N/A',
            subColor: 'text-zinc-400',
            icon: Clock,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
        {
            label: 'Most Popular Deal',
            value: overview.mostPopularDeal?.title || 'N/A',
            sub: `${overview.mostPopularDeal?.claims || 0} claims`,
            subColor: 'text-zinc-400',
            icon: Tag,
            iconBg: 'bg-zinc-100',
            iconColor: 'text-zinc-500',
        },
    ];

    const topDealsRaw = insightsData.topPerformingDeals || [];
    const maxClaims = Math.max(...topDealsRaw.map((d: any) => d.claims), 1);
    const topDeals = topDealsRaw.map((d: any) => ({
        name: d.title || 'Unknown',
        claims: d.claims || 0,
        max: maxClaims,
    }));

    const insights = [
        {
            label: 'Best Day',
            value: `${insightsData.weeklyInsights?.bestDay?.day || 'N/A'} – ${insightsData.weeklyInsights?.bestDay?.mostCount || 0} customers`,
            icon: TrendingUp,
            bg: 'bg-emerald-50',
            labelColor: 'text-emerald-700',
            valueColor: 'text-emerald-800',
            iconColor: 'text-emerald-500',
        },
        {
            label: 'Customer Satisfaction',
            value: `${insightsData.customerSatisfaction || 0}/5.0 ⭐`,
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
                                {s.sub.startsWith('-') && <TrendingUp className="w-3 h-3 rotate-180" />}
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
                        {topDeals.length > 0 ? topDeals.map((deal: any) => {
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
                        }) : (
                            <p className="text-sm text-zinc-500 text-center py-4">No top performing deals found.</p>
                        )}
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
