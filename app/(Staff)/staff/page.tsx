"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, CheckCircle, Clock, LogOut, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logOut, currentUser } from "@/redux/features/auth/authSlice";
import { useGetReservationStatsQuery, useGetReservationsQuery, useUpdateReservationStatusMutation } from "@/redux/features/reservations/reservationApi";

const statusStyle: Record<string, string> = {
    Upcoming: "bg-amber-50 text-amber-700",
    Arrived: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Expired: "bg-red-50 text-red-700",
    Cancelled: "bg-zinc-50 text-zinc-700",
};

const formatStatus = (status: string) => {
    if (!status) return "Upcoming";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default function StaffPanel() {
    const router = useRouter();
    const dispatch = useDispatch();
    // const user = useSelector(currentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [liveQueuePage, setLiveQueuePage] = useState(1);
    const limit = 10;
    const liveQueueLimit = 5;

    const { data: statsRes, isLoading: isStatsLoading } = useGetReservationStatsQuery({});
    // Fetch live queue directly from API with status=UPCOMING and pagination
    const { data: liveRes, isLoading: isLiveLoading } = useGetReservationsQuery({ 
        status: 'UPCOMING', 
        page: liveQueuePage, 
        limit: liveQueueLimit 
    });
    // Fetch all bookings for table with pagination
    const { data: reservationsRes, isLoading: isReservationsLoading } = useGetReservationsQuery({
        page: currentPage,
        limit,
    });
    const [updateStatus, { isLoading: isUpdating }] = useUpdateReservationStatusMutation();

    const statsData = statsRes?.data || {
        totalBookingsToday: 0,
        totalGuestsExpected: 0,
        guestsServedToday: 0,
        pendingArrivals: 0,
    };

    const liveQueue = liveRes?.data || [];
    const liveMeta = liveRes?.meta || { total: liveQueue.length, page: liveQueuePage, limit: liveQueueLimit };
    const totalLiveQueuePages = liveMeta.total ? Math.ceil(liveMeta.total / liveQueueLimit) : 1;
    const hasLiveNext = liveMeta.hasNextPage ?? (liveQueuePage < totalLiveQueuePages);
    const hasLivePrev = liveMeta.hasPrevPage ?? (liveQueuePage > 1);
    const bookings = reservationsRes?.data || [];
    const meta = reservationsRes?.meta || { total: bookings.length, page: currentPage, limit };
    const totalPages = meta.total ? Math.ceil(meta.total / limit) : 1;
    const hasNext = meta.hasNextPage ?? currentPage < totalPages;
    const hasPrev = meta.hasPrevPage ?? currentPage > 1;

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            toast.success(`Reservation marked as ${formatStatus(newStatus)}`);
        } catch (error: any) {
            console.error("Failed to update status:", error);
            toast.error(error?.data?.message || "Failed to update reservation status");
        }
    };

    const handleLogout = () => {
        dispatch(logOut());
        router.push("/login");
    };

    const stats = [
        { label: "Total Bookings Today", value: statsData.totalBookingsToday, icon: Calendar },
        { label: "Total Guests Expected", value: statsData.totalGuestsExpected, icon: Users },
        { label: "Guests Served Today", value: statsData.guestsServedToday, icon: CheckCircle },
        { label: "Pending Arrivals", value: statsData.pendingArrivals, icon: Clock },
    ];

    if (isStatsLoading || isReservationsLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Fixed Top Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-zinc-900">Restaurant Staff Panel</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Verify bookings, count guests, and serve deals</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-50 border border-zinc-200 transition-all">
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
                        {isLiveLoading ? (
                            <div className="py-8 flex justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                            </div>
                        ) : liveQueue.length === 0 ? (
                            <p className="py-8 text-center text-zinc-400 text-sm">No live bookings in queue.</p>
                        ) : (
                            liveQueue.map((b: any) => (
                                <div key={b._id} className="bg-amber-50/40 border border-amber-100 rounded-[10px] p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="text-base font-bold text-zinc-900">{b.reservationTime}</p>
                                            {b.reservationDate && <p className="text-xs text-zinc-500 font-medium mt-0.5">{new Date(b.reservationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>}
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${b.status === "ARRIVED" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{formatStatus(b.status)}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        Deal: <span className="font-semibold text-zinc-700">{b.dealId?.title || "N/A"}</span>
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        Booking Name: <span className="font-semibold text-zinc-700">{b.userId?.name || "Unknown"}</span>
                                    </p>
                                    <p className="text-xs text-zinc-500 mb-4">
                                        Guests Expected: <span className="font-semibold text-zinc-700">{b.partySize}</span>
                                    </p>

                                    {b.specialRequests && (
                                        <p className="text-xs text-amber-700 bg-amber-100/50 p-2 rounded mb-4">
                                            <span className="font-semibold">Note:</span> {b.specialRequests}
                                        </p>
                                    )}

                                    <div className={b.status === "UPCOMING" ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-3"}>
                                        {b.status === "UPCOMING" && (
                                            <button onClick={() => handleUpdateStatus(b._id, "ARRIVED")} disabled={isUpdating} className="py-2.5 rounded-[10px] bg-[#2B7FFF] text-white text-xs font-bold hover:bg-[#1a6ee8] transition-colors disabled:opacity-50">
                                                Confirm Arrival
                                            </button>
                                        )}
                                        {(b.status === "UPCOMING" || b.status === "ARRIVED") && (
                                            <button onClick={() => handleUpdateStatus(b._id, "COMPLETED")} disabled={isUpdating} className="py-2.5 rounded-[10px] bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50">
                                                Complete Service
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Live Queue Pagination */}
                    {liveMeta && liveMeta.total > 0 && (
                        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
                            <p className="text-xs text-zinc-500 font-medium">
                                Showing {(liveQueuePage - 1) * liveQueueLimit + 1} - {Math.min(liveQueuePage * liveQueueLimit, liveMeta.total)} of {liveMeta.total} upcoming items
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setLiveQueuePage((p) => Math.max(1, p - 1))}
                                    disabled={!hasLivePrev || isLiveLoading}
                                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    title="Previous Page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-semibold text-zinc-700 px-2">
                                    Page {liveQueuePage} of {totalLiveQueuePages}
                                </span>
                                <button
                                    onClick={() => setLiveQueuePage((p) => Math.min(totalLiveQueuePages, p + 1))}
                                    disabled={!hasLiveNext || isLiveLoading}
                                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    title="Next Page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
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
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Date & Time</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Guests</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {bookings.map((b: any) => {
                                const statusStr = formatStatus(b.status);
                                return (
                                    <tr key={b._id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-zinc-800">{b.userId?.name || "Unknown"}</td>
                                        <td className="px-6 py-3 text-zinc-500">{b.dealId?.title || "N/A"}</td>
                                        <td className="px-6 py-3 text-zinc-500">
                                            <div>{b.reservationTime}</div>
                                            {b.reservationDate && <div className="text-[11px] text-zinc-400">{new Date(b.reservationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>}
                                        </td>
                                        <td className="px-6 py-3 text-zinc-500">{b.partySize} Guests</td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[statusStr] || statusStyle.Upcoming}`}>{statusStr}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {meta && meta.total > 0 && (
                        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
                            <p className="text-xs text-zinc-500 font-medium">
                                Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, meta.total)} of {meta.total} bookings
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={!hasPrev || isReservationsLoading}
                                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    title="Previous Page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-semibold text-zinc-700 px-2">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={!hasNext || isReservationsLoading}
                                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    title="Next Page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
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
