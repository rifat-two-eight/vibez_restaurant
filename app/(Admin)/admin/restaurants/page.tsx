'use client';

import React, { useState, useEffect } from 'react';
import {
    Store,
    Calendar,
    TrendingUp,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    User
} from 'lucide-react';
import {
    useGetAdminRestaurantStatsQuery,
    useGetPendingRestaurantsQuery,
    useGetAllRestaurantsQuery,
    useApproveRestaurantMutation,
    useRejectRestaurantMutation,
} from '@/redux/features/admin/adminRestaurantApi';
import Swal from 'sweetalert2';
import { getImageUrl } from '@/lib/utils';
import { toast } from 'sonner';

export default function RestaurantManagement() {
    const { data: statsRes } = useGetAdminRestaurantStatsQuery();
    const stats = statsRes?.data;

    const { data: pendingRes, isLoading: isLoadingPending } = useGetPendingRestaurantsQuery({ page: 1, limit: 10 });
    const pendingRestaurants = pendingRes?.data || [];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data: allRes, isLoading: isLoadingAll } = useGetAllRestaurantsQuery({
        search: debouncedSearch,
        page: currentPage,
        limit: 10
    });
    const allRestaurants = allRes?.data || [];
    const meta = allRes?.meta;

    const [approveRestaurant] = useApproveRestaurantMutation();
    const [rejectRestaurant] = useRejectRestaurantMutation();

    const handleApprove = async (id: string) => {
        const result = await Swal.fire({
            title: 'Approve Restaurant?',
            text: "Are you sure you want to approve this restaurant?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#3f3f46',
            confirmButtonText: 'Yes, approve',
            background: '#171717',
            color: '#fff',
            customClass: {
                popup: 'border border-white/10 rounded-2xl',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl bg-white/5 hover:bg-white/10'
            }
        });
        if (result.isConfirmed) {
            try {
                await approveRestaurant(id).unwrap();
                toast.success('Restaurant approved successfully');
            } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to approve');
            }
        }
    };

    const handleReject = async (id: string) => {
        const result = await Swal.fire({
            title: 'Reject Restaurant?',
            text: "Are you sure you want to reject this restaurant?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3f3f46',
            confirmButtonText: 'Yes, reject',
            background: '#171717',
            color: '#fff',
            customClass: {
                popup: 'border border-white/10 rounded-2xl',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl bg-white/5 hover:bg-white/10'
            }
        });
        if (result.isConfirmed) {
            try {
                await rejectRestaurant(id).unwrap();
                toast.success('Restaurant rejected successfully');
            } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to reject');
            }
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Restaurant Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Approve new restaurants and monitor performance</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Restaurants</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.totalRestaurants?.value || 0}</h3>
                    {(() => {
                        const changeStr = String(stats?.totalRestaurants?.change || '0');
                        if (changeStr.includes('-')) {
                            return <p className="text-[11px] text-red-500 font-bold">↓ {changeStr.replace('-', '')} this month</p>;
                        } else if (changeStr !== '0') {
                            return <p className="text-[11px] text-[#10B981] font-bold">↑ {changeStr.replace('+', '')} this month</p>;
                        }
                        return <p className="text-[11px] text-zinc-500 font-bold">{changeStr}</p>;
                    })()}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Store className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Pending Approvals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.pendingApprovals?.value || 0}</h3>
                    <p className="text-[11px] text-orange-500 font-bold">{stats?.pendingApprovals?.change || 'Requires attention'}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Avg Performance</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.avgPerformance?.value || '0%'}</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">{stats?.avgPerformance?.change || 'Redemption rate'}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Approval Queue */}
            <div className="space-y-6">
                <h3 className="text-base font-bold text-white px-2">Restaurant Approval Queue</h3>
                {isLoadingPending ? (
                    <p className="text-zinc-500 px-2">Loading pending restaurants...</p>
                ) : pendingRestaurants.length === 0 ? (
                    <p className="text-zinc-500 px-2">No pending restaurants at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pendingRestaurants.map((item: any) => (
                            <div key={item._id} className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-6 group hover:border-[#10B981]/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {item.restaurantImage ? (
                                            <img src={getImageUrl(item.restaurantImage)} alt={item.restaurantName} className="w-full h-full object-cover" />
                                        ) : (
                                            <Store className="w-6 h-6 text-[#10B981]" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-white text-sm truncate">{item.restaurantName}</h4>
                                        <p className="text-xs text-zinc-500 truncate">{item.restaurantOwner?.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-zinc-500 font-medium">Type</span>
                                        <span className="text-white font-bold">{item.restaurantType?.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-zinc-500 font-medium">Cuisine</span>
                                        <span className="text-white font-bold">
                                            {Array.isArray(item.cuisineType)
                                                ? item.cuisineType.map((c: string) => c.charAt(0) + c.slice(1).toLowerCase().replace('_', ' ')).join(', ')
                                                : (item.cuisineType ? item.cuisineType.charAt(0) + item.cuisineType.slice(1).toLowerCase().replace('_', ' ') : 'N/A')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-zinc-500 font-medium">Submitted</span>
                                        <span className="text-zinc-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => handleApprove(item._id)}
                                        className="flex-1 py-2.5 rounded-xl bg-[#10B981] text-white text-[11px] font-bold hover:bg-[#0da673] transition-all shadow-lg shadow-[#10B981]/10"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(item._id)}
                                        className="flex-1 py-2.5 rounded-xl bg-white/5 text-red-500 text-[11px] font-bold hover:bg-red-500/10 transition-all"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Performance Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden mt-8">
                <div className="p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-white/5">
                    <h3 className="text-base font-bold text-white">All Restaurants</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-full md:w-64"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/1">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Restaurant</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Active Deals</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Total Bookings</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Redemption Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoadingAll ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-8 text-center text-sm text-zinc-500">Loading restaurants...</td>
                                </tr>
                            ) : allRestaurants.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-8 text-center text-sm text-zinc-500">No restaurants found.</td>
                                </tr>
                            ) : (
                                allRestaurants.map((res: any) => (
                                    <tr key={res._id} className="hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                {res.restaurantImage ? (
                                                    <img src={getImageUrl(res.restaurantImage)} alt={res.restaurantName} className="w-8 h-8 rounded-lg object-cover bg-white/5" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-[#10B981]/5 flex items-center justify-center text-[#10B981] font-bold text-xs uppercase">
                                                        {res.restaurantName?.charAt(0) || <Store className="w-4 h-4" />}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors">{res.restaurantName}</p>
                                                    <p className="text-[11px] text-zinc-500">{res.restaurantOwner?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${res.approved ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-orange-500/10 text-orange-500'
                                                }`}>
                                                {res.approved ? 'APPROVED' : 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-white font-medium text-center">{res.activeDeals || 0}</td>
                                        <td className="px-8 py-5 text-sm text-zinc-400 text-center">{res.totalBookings || 0}</td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="text-sm font-bold text-[#10B981]">
                                                {res.redemptionRate || '0%'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                    <div className="p-4 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-zinc-500 font-medium px-4">
                            Showing page {meta.page} of {meta.totalPages} ({meta.total} total)
                        </p>
                        <div className="flex gap-2 pr-4">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={!meta.hasPrev}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(meta.totalPages, p + 1))}
                                disabled={!meta.hasNext}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
