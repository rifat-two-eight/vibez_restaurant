'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from '@/components/ui/chart';

const barData = [
    { day: 'Mon', bookings: 11 },
    { day: 'Tue', bookings: 19 },
    { day: 'Wed', bookings: 15 },
    { day: 'Thu', bookings: 22 },
    { day: 'Fri', bookings: 28 },
    { day: 'Sat', bookings: 32 },
    { day: 'Sun', bookings: 24 },
];

const pieData = [
    { name: 'Dinner', value: 58 },
    { name: 'Lunch',  value: 42 },
];

const barConfig: ChartConfig = {
    bookings: { label: 'Bookings', color: '#3B82F6' },
};

const pieConfig: ChartConfig = {
    Dinner: { label: 'Dinner', color: '#3B82F6' },
    Lunch:  { label: 'Lunch',  color: '#8B5CF6' },
};

const PIE_COLORS = ['#3B82F6', '#8B5CF6'];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Analytics</h1>
                <p className="text-zinc-500 text-sm mt-1">
                    Detailed insights into your restaurant's deal and booking performance
                </p>
            </div>

            {/* Deal Performance Stats */}
            <div>
                <h2 className="text-base font-bold text-zinc-900 mb-4">Deal Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Most Popular Deal</p>
                        <p className="text-lg font-bold text-zinc-900">2-for-1 Dinner</p>
                        <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3" /> +23% usage
                        </p>
                    </div>
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Peak Time</p>
                        <p className="text-lg font-bold text-zinc-900">Dinner</p>
                        <p className="text-xs text-zinc-400 mt-1">6:30 PM – 8:00 PM</p>
                    </div>
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Average Guests per Booking</p>
                        <p className="text-lg font-bold text-zinc-900">3.2</p>
                        <p className="text-xs text-zinc-400 mt-1">↑ 0.4 from last week</p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bar Chart */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6">
                    <h2 className="text-base font-bold text-zinc-900 mb-4">Bookings per Day</h2>
                    <ChartContainer config={barConfig} className="h-[240px] w-full">
                        <BarChart data={barData} barCategoryGap="30%">
                            <CartesianGrid vertical={false} stroke="#F4F4F5" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#A1A1AA' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#A1A1AA' }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="bookings" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6">
                    <h2 className="text-base font-bold text-zinc-900 mb-4">Lunch vs Dinner Usage</h2>
                    <ChartContainer config={pieConfig} className="h-[240px] w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                            >
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={PIE_COLORS[i]} />
                                ))}
                            </Pie>
                            <Legend
                                iconType="square"
                                iconSize={10}
                                formatter={(value) => (
                                    <span className="text-xs text-zinc-600 font-medium">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
