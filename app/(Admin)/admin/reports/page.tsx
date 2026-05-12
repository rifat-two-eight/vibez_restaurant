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
    Legend
} from 'recharts';
import { 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
} from '@/components/ui/chart';

const revenueData = [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 46000 },
];

const usageData = [
    { day: 'Mon', lunch: 40, dinner: 45 },
    { day: 'Tue', lunch: 50, dinner: 55 },
    { day: 'Wed', lunch: 45, dinner: 48 },
    { day: 'Thu', lunch: 60, dinner: 65 },
    { day: 'Fri', lunch: 70, dinner: 75 },
    { day: 'Sat', lunch: 65, dinner: 70 },
    { day: 'Sun', lunch: 55, dinner: 60 },
];

const topRestaurants = [
    { rank: '#1', name: 'La Bella Vista',  bookings: '412 bookings', revenue: '$8,240' },
    { rank: '#2', name: 'Urban Grill',     bookings: '278 bookings', revenue: '$5,560' },
    { rank: '#3', name: 'The Golden Fork', bookings: '234 bookings', revenue: '$4,680' },
    { rank: '#4', name: 'Ocean Breeze',    bookings: '189 bookings', revenue: '$3,780' },
    { rank: '#5', name: 'Spice Garden',    bookings: '45 bookings',  revenue: '$900' },
];

const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: '#CF0738',
    },
    lunch: {
        label: 'Lunch',
        color: '#71717A',
    },
    dinner: {
        label: 'Dinner',
        color: '#CF0738',
    },
};

export default function AdminReportsPage() {
    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Reports & Analytics</h1>
            </div>

            {/* Graphs Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Revenue Growth */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-8">
                    <h3 className="text-base font-bold text-zinc-900 font-secondary">Revenue Growth</h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                                    dx={-10}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    align="center" 
                                    iconType="circle" 
                                    iconSize={8}
                                    wrapperStyle={{ paddingTop: '30px', fontSize: '12px', color: '#CF0738' }}
                                    formatter={(value) => <span className="text-[#CF0738] lowercase font-medium">{value}</span>}
                                />
                                <Line 
                                    name="revenue"
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#CF0738" 
                                    strokeWidth={2} 
                                    dot={{ r: 4, fill: '#CF0738', strokeWidth: 2, stroke: '#fff' }} 
                                    activeDot={{ r: 6, strokeWidth: 0 }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Deal Usage */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-8">
                    <h3 className="text-base font-bold text-zinc-900 font-secondary">Deal Usage (Lunch vs Dinner)</h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={usageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                                    dx={-10}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    align="center" 
                                    iconType="square" 
                                    iconSize={12}
                                    wrapperStyle={{ paddingTop: '30px', fontSize: '12px' }}
                                    formatter={(value) => <span className="text-zinc-600 lowercase font-medium">{value}</span>}
                                />
                                <Bar 
                                    name="lunch"
                                    dataKey="lunch" 
                                    fill="#71717A" 
                                    radius={[2, 2, 0, 0]} 
                                    barSize={24}
                                />
                                <Bar 
                                    name="dinner"
                                    dataKey="dinner" 
                                    fill="#CF0738" 
                                    radius={[2, 2, 0, 0]} 
                                    barSize={24}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Restaurants List */}
            <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-6">
                <h3 className="text-base font-bold text-zinc-900">Top Performing Restaurants</h3>
                <div className="space-y-4">
                    {topRestaurants.map((res) => (
                        <div 
                            key={res.name} 
                            className="flex items-center justify-between p-4 bg-zinc-50 rounded-[10px] border border-zinc-100 hover:border-[#CF0738]/20 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-xl font-bold text-zinc-400 w-8">{res.rank}</span>
                                <div>
                                    <p className="font-bold text-zinc-900">{res.name}</p>
                                    <p className="text-xs text-zinc-400 font-medium">{res.bookings}</p>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-zinc-900">
                                {res.revenue}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
