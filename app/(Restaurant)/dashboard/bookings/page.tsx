'use client';

import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, Activity } from 'lucide-react';

type QueueStatus = 'Seated' | 'Waiting' | 'Confirmed';
type BookingTab = 'Upcoming' | 'Completed' | 'Cancelled';

type QueueItem = {
    id: number;
    name: string;
    deal: string;
    time: string;
    status: QueueStatus;
};

type Booking = {
    id: number;
    name: string;
    deal: string;
    time: string;
    guests: number;
    tab: BookingTab;
};

const queueStatusStyle: Record<QueueStatus, string> = {
    Seated:    'bg-emerald-50 text-emerald-700',
    Waiting:   'bg-amber-50 text-amber-700',
    Confirmed: 'bg-blue-50 text-blue-700',
};

const liveQueue: QueueItem[] = [
    { id: 1, name: 'Sarah Johnson', deal: '2-for-1 Dinner',   time: '6:45 PM', status: 'Seated' },
    { id: 2, name: 'Mike Chen',     deal: 'Free Drink Offer', time: '7:00 PM', status: 'Waiting' },
    { id: 3, name: 'Emily Davis',   deal: '2-for-1 Dinner',   time: '7:15 PM', status: 'Confirmed' },
    { id: 4, name: 'David Wilson',  deal: 'Weekend Special',  time: '7:30 PM', status: 'Confirmed' },
];

const allBookings: Booking[] = [
    { id: 1, name: 'Alex Thompson', deal: '2-for-1 Dinner',   time: '8:00 PM', guests: 2, tab: 'Upcoming' },
    { id: 2, name: 'Lisa Martinez', deal: 'Free Drink Offer', time: '8:30 PM', guests: 4, tab: 'Upcoming' },
    { id: 3, name: 'James Brown',   deal: '2-for-1 Dinner',   time: '9:00 PM', guests: 2, tab: 'Upcoming' },
    { id: 4, name: 'Anna Lee',      deal: 'Weekend Special',  time: '5:00 PM', guests: 3, tab: 'Completed' },
    { id: 5, name: 'Tom Harris',    deal: '2-for-1 Dinner',   time: '5:30 PM', guests: 2, tab: 'Completed' },
    { id: 6, name: 'Sara White',    deal: 'Free Drink Offer', time: '6:00 PM', guests: 1, tab: 'Cancelled' },
];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState<BookingTab>('Upcoming');

    const filtered = allBookings.filter(b => b.tab === activeTab);

    const stats = [
        { label: 'Total Bookings Today', value: '23', icon: Calendar, iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
        { label: 'Upcoming Guests',      value: '8',  icon: Users,    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { label: 'Completed Bookings',   value: '14', icon: CheckCircle, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Bookings</h1>
                <p className="text-zinc-500 text-sm mt-1">Track reservations, live queue, and booking history.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-[10px] border border-zinc-100 p-5 flex items-center gap-4">
                            <div className={`p-3 rounded-[10px] ${s.iconBg} ${s.iconColor}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Live Deal Queue */}
            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-100 bg-zinc-50">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-zinc-900">Live Deal Queue</h2>
                        <p className="text-xs text-zinc-400">Customers currently at your restaurant</p>
                    </div>
                </div>

                <div className="divide-y divide-zinc-50">
                    {liveQueue.map((item) => (
                        <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                                    <p className="text-xs text-zinc-400">{item.deal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-500">{item.time}</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${queueStatusStyle[item.status]}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs + Booking List */}
            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                {/* Tab Bar */}
                <div className="px-6 py-4 border-b border-zinc-100">
                    <div className="inline-flex gap-1 bg-zinc-100 p-1 rounded-[10px]">
                        {(['Upcoming', 'Completed', 'Cancelled'] as BookingTab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 text-sm font-semibold rounded-[8px] transition-all ${
                                    activeTab === tab
                                        ? 'bg-[#013622] text-white shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Booking List */}
                <div className="divide-y divide-zinc-50">
                    {filtered.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-[10px] bg-zinc-100 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900">{booking.name}</p>
                                    <p className="text-xs text-zinc-400">{booking.deal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-zinc-500">
                                <span>{booking.time}</span>
                                <span className="text-zinc-300">•</span>
                                <span>{booking.guests} guests</span>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="py-16 text-center text-zinc-400 text-sm">
                            No {activeTab.toLowerCase()} bookings found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
