'use client';

import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, Activity, Loader2 } from 'lucide-react';
import { 
    useGetOwnerReservationStatsQuery, 
    useGetReservationsQuery 
} from '@/redux/features/reservations/reservationApi';

type BookingTab = 'Upcoming' | 'Completed' | 'Cancelled';

const queueStatusStyle: Record<string, string> = {
    ARRIVED: 'bg-emerald-50 text-emerald-700',
    UPCOMING: 'bg-amber-50 text-amber-700',
    COMPLETED: 'bg-blue-50 text-blue-700',
    CANCELLED: 'bg-zinc-50 text-zinc-700',
    EXPIRED: 'bg-red-50 text-red-700',
};

const formatStatus = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState<BookingTab>('Upcoming');

    const { data: statsRes, isLoading: isStatsLoading } = useGetOwnerReservationStatsQuery({});
    // We fetch UPCOMING status for the Live Deal Queue
    const { data: liveRes, isLoading: isLiveLoading } = useGetReservationsQuery({ status: 'UPCOMING', limit: 50 });
    // We fetch the active tab's status for the Bookings list
    const { data: tabRes, isLoading: isTabLoading } = useGetReservationsQuery({ 
        status: activeTab.toUpperCase(), 
        limit: 100 // Temporarily fetching a large chunk to avoid manual pagination UI implementation
    });

    const statsData = statsRes?.data || {
        totalBookingsToday: 0,
        upcomingGuests: 0,
        completedBookings: 0
    };

    const liveQueue = liveRes?.data || [];
    const filteredBookings = tabRes?.data || [];

    const stats = [
        { label: 'Total Bookings Today', value: statsData.totalBookingsToday, icon: Calendar, iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
        { label: 'Upcoming Guests',      value: statsData.upcomingGuests,     icon: Users,    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { label: 'Completed Bookings',   value: statsData.completedBookings,  icon: CheckCircle, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    ];

    if (isStatsLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
            </div>
        );
    }

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
                        <p className="text-xs text-zinc-400">Upcoming customers arriving soon</p>
                    </div>
                </div>

                <div className="divide-y divide-zinc-50">
                    {isLiveLoading ? (
                        <div className="py-8 flex justify-center">
                            <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                        </div>
                    ) : liveQueue.length === 0 ? (
                        <div className="py-8 text-center text-zinc-400 text-sm">
                            No upcoming customers in the queue.
                        </div>
                    ) : (
                        liveQueue.map((item: any) => (
                            <div key={item._id} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                                        <Users className="w-4 h-4 text-zinc-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900">{item.userId?.name || 'Unknown Customer'}</p>
                                        <p className="text-xs text-zinc-400">{item.dealId?.title || 'No Deal'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end text-right">
                                        <span className="text-sm text-zinc-500 font-medium">{item.reservationTime}</span>
                                        {item.reservationDate && (
                                            <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                                                {new Date(item.reservationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${queueStatusStyle[item.status] || queueStatusStyle.ARRIVED}`}>
                                        {formatStatus(item.status)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
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
                    {isTabLoading ? (
                        <div className="py-16 flex justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="py-16 text-center text-zinc-400 text-sm">
                            No {activeTab.toLowerCase()} bookings found.
                        </div>
                    ) : (
                        filteredBookings.map((booking: any) => (
                            <div key={booking._id} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-[10px] bg-zinc-100 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-zinc-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900">{booking.userId?.name || 'Unknown'}</p>
                                        <p className="text-xs text-zinc-400">{booking.dealId?.title || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-zinc-500">
                                    <div className="flex flex-col items-end text-right">
                                        <span className="font-medium text-zinc-700">{booking.reservationTime}</span>
                                        {booking.reservationDate && (
                                            <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                                                {new Date(booking.reservationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-zinc-300">•</span>
                                    <span className="font-medium">{booking.partySize} guests</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
