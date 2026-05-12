'use client';

import React from 'react';

type BookingStatus = 'Upcoming' | 'Arrived' | 'Completed';

type Booking = {
    id: number;
    timeSlot: string;
    restaurant: string;
    deal: string;
    guests: number;
    status: BookingStatus;
};

type QueueSlot = {
    time: string;
    bookings: number;
    guests: number;
};

const statusStyle: Record<BookingStatus, string> = {
    Upcoming:  'bg-zinc-100 text-zinc-500',
    Arrived:   'bg-[#CF0738] text-white',
    Completed: 'bg-pink-100 text-pink-600',
};

const bookings: Booking[] = [
    { id: 1, timeSlot: '12:00 PM', restaurant: 'The Golden Fork', deal: 'Happy Hour 50% Off',  guests: 4, status: 'Upcoming'  },
    { id: 2, timeSlot: '1:30 PM',  restaurant: 'Ocean Breeze',    deal: 'Buy 1 Get 1 Sushi',   guests: 2, status: 'Arrived'   },
    { id: 3, timeSlot: '6:00 PM',  restaurant: 'La Bella Vista',  deal: 'Free Dessert',         guests: 6, status: 'Upcoming'  },
    { id: 4, timeSlot: '7:30 PM',  restaurant: 'Urban Grill',     deal: '30% Off All Meals',    guests: 3, status: 'Upcoming'  },
    { id: 5, timeSlot: '8:00 PM',  restaurant: 'Spice Garden',    deal: '$10 Off Entrees',      guests: 2, status: 'Completed' },
];

const queue: QueueSlot[] = [
    { time: '5:00 PM',  bookings: 1, guests: 4 },
    { time: '6:30 PM',  bookings: 2, guests: 5 },
    { time: '8:00 PM',  bookings: 1, guests: 3 },
];

export default function AdminBookingsPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Bookings</h1>
            </div>

            {/* Booking Activity Table */}
            <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-900">Booking Activity</h2>
                <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-100 bg-zinc-50">
                                <th className="text-left px-6 py-4 font-semibold text-zinc-700">Time Slot</th>
                                <th className="text-left px-6 py-4 font-semibold text-zinc-700">Restaurant Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-zinc-700">Deal Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-zinc-700">Number of Guests</th>
                                <th className="text-left px-6 py-4 font-semibold text-zinc-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {bookings.map(b => (
                                <tr key={b.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-600 font-medium">{b.timeSlot}</td>
                                    <td className="px-6 py-4 text-zinc-900 font-medium">{b.restaurant}</td>
                                    <td className="px-6 py-4 text-zinc-500">{b.deal}</td>
                                    <td className="px-6 py-4 text-zinc-500">{b.guests}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[b.status]}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Live Deal Queue */}
            <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-900">Live Deal Queue</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {queue.map(q => (
                        <div key={q.time} className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-3">
                            <p className="text-xs text-zinc-400 font-medium">{q.time}</p>
                            <p className="text-2xl font-bold text-zinc-900">
                                {q.bookings} {q.bookings === 1 ? 'Booking' : 'Bookings'}
                            </p>
                            <p className="text-sm text-zinc-400">{q.guests} Guests</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
