'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, CheckCircle, Clock, LogOut } from 'lucide-react';

type BookingStatus = 'Upcoming' | 'Arrived' | 'Completed';

type Booking = {
    id: number;
    customer: string;
    deal: string;
    time: string;
    guests: number;
    status: BookingStatus;
};

const initialBookings: Booking[] = [
    { id: 1, customer: 'John Doe',    deal: '2-for-1 Dinner',     time: '5:00 PM',  guests: 4, status: 'Upcoming' },
    { id: 2, customer: 'Sarah Khan',  deal: '20% Lunch Discount', time: '6:30 PM',  guests: 2, status: 'Upcoming' },
    { id: 3, customer: 'Ahmed Ali',   deal: 'Free Dessert Offer',  time: '8:00 PM',  guests: 3, status: 'Upcoming' },
    { id: 4, customer: 'Maria Garcia',deal: '20% Lunch Deal',      time: '12:30 PM', guests: 2, status: 'Arrived' },
    { id: 5, customer: 'Li Wei',      deal: 'Free Drink Offer',    time: '7:30 PM',  guests: 3, status: 'Completed' },
];

const statusStyle: Record<BookingStatus, string> = {
    Upcoming:  'bg-amber-50 text-amber-700',
    Arrived:   'bg-blue-50 text-blue-700',
    Completed: 'bg-emerald-50 text-emerald-700',
};

export default function StaffPanel() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);

    const upcomingQueue = bookings.filter(b => b.status === 'Upcoming');
    const totalGuests   = bookings.reduce((s, b) => s + b.guests, 0);
    const servedToday   = bookings.filter(b => b.status === 'Completed').length;
    const pending       = bookings.filter(b => b.status === 'Upcoming').length;

    const confirmArrival  = (id: number) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'Arrived' } : b));
    const completeService = (id: number) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'Completed' } : b));

    const stats = [
        { label: 'Total Bookings Today',   value: bookings.length,  icon: Calendar },
        { label: 'Total Guests Expected',  value: totalGuests,       icon: Users },
        { label: 'Guests Served Today',    value: servedToday,       icon: CheckCircle },
        { label: 'Pending Arrivals',       value: pending,           icon: Clock },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Fixed Top Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-zinc-900">Restaurant Staff Panel</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Verify bookings, count guests, and serve deals</p>
                </div>
                <button
                    onClick={() => router.push('/login')}
                    className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-50 border border-zinc-200 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </header>

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-8 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="bg-white rounded-[10px] border border-zinc-100 p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-zinc-400 font-medium leading-tight">{s.label}</p>
                                    <Icon className="w-4 h-4 text-zinc-300 shrink-0" />
                                </div>
                                <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Live Deal Queue */}
                <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100">
                        <h2 className="text-base font-bold text-zinc-900">Live Deal Queue</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">See upcoming guests and prepare service</p>
                    </div>
                    <div className="divide-y divide-zinc-50 p-4 space-y-4">
                        {upcomingQueue.length === 0 && (
                            <p className="py-8 text-center text-zinc-400 text-sm">No upcoming bookings in queue.</p>
                        )}
                        {upcomingQueue.map(b => (
                            <div key={b.id} className="bg-amber-50/40 border border-amber-100 rounded-[10px] p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <p className="text-base font-bold text-zinc-900">{b.time}</p>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Upcoming</span>
                                </div>
                                <p className="text-xs text-zinc-500">Deal: <span className="font-semibold text-zinc-700">{b.deal}</span></p>
                                <p className="text-xs text-zinc-500">Booking Name: <span className="font-semibold text-zinc-700">{b.customer}</span></p>
                                <p className="text-xs text-zinc-500 mb-4">Guests Expected: <span className="font-semibold text-zinc-700">{b.guests}</span></p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => confirmArrival(b.id)}
                                        className="py-2.5 rounded-[10px] bg-[#2B7FFF] text-white text-xs font-bold hover:bg-[#1a6ee8] transition-colors"
                                    >
                                        Confirm Arrival
                                    </button>
                                    <button
                                        onClick={() => completeService(b.id)}
                                        className="py-2.5 rounded-[10px] bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
                                    >
                                        Complete Service
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today's Bookings Table */}
                <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100">
                        <h2 className="text-base font-bold text-zinc-900">Today's Bookings</h2>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-100 bg-zinc-50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Customer Name</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Deal</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Time</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Guests</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {bookings.map(b => (
                                <tr key={b.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-zinc-800">{b.customer}</td>
                                    <td className="px-6 py-3 text-zinc-500">{b.deal}</td>
                                    <td className="px-6 py-3 text-zinc-500">{b.time}</td>
                                    <td className="px-6 py-3 text-zinc-500">{b.guests} Guests</td>
                                    <td className="px-6 py-3">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[b.status]}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* How to Use */}
                <div className="bg-blue-50 border border-blue-100 rounded-[10px] p-6">
                    <h3 className="text-sm font-bold text-blue-800 mb-3">How to Use</h3>
                    <ol className="space-y-1.5 text-xs text-blue-700 list-decimal list-inside">
                        <li>Ask customer to show booking in app</li>
                        <li>Match name and deal</li>
                        <li>Confirm number of guests</li>
                        <li>Serve food</li>
                        <li>Mark booking as completed</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
