"use client";

import React, { useState } from "react";
import { Tag, TrendingUp, Clock, Eye, ShieldAlert, Search, Filter, MoreHorizontal, ArrowUpRight, CheckCircle, XCircle, Loader2, Activity, Award, Edit3 } from "lucide-react";
import { useGetAllAdminDealsQuery, useGetAdminDealsStatsQuery, useToggleDealStatusMutation, useGetAdminDealByIdQuery } from "@/redux/features/deals/dealsApi";
import EditDealModal from "./EditDealModal";

const formatDaysString = (days: any) => {
    if (!days) return "";
    const arr = Array.isArray(days) ? days : [days];
    return arr.map((d: string) => d.charAt(0) + d.slice(1).toLowerCase()).join(", ");
};

export default function DealsManagement() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
    const [editingDeal, setEditingDeal] = useState<any | null>(null);

    const isActive = statusFilter === "ALL" ? undefined : statusFilter === "ACTIVE";
    const { data, isLoading, isFetching } = useGetAllAdminDealsQuery({ page, limit: 10, search, isActive });
    const { data: statsRes, isLoading: isStatsLoading } = useGetAdminDealsStatsQuery(undefined);
    const [toggleDealStatus] = useToggleDealStatusMutation();

    const liveDeals = data?.data || [];
    const meta = data?.meta;
    const stats = statsRes?.data;

    const totalPages = (meta?.totalPages ?? Math.ceil((meta?.total || 0) / (meta?.limit || 10))) || 1;
    const hasPrev = meta?.hasPrev ?? (meta?.page || 1) > 1;
    const hasNext = meta?.hasNext ?? (meta?.page || 1) < totalPages;

    const handleToggleStatus = async (id: string) => {
        try {
            await toggleDealStatus(id).unwrap();
        } catch (error) {
            console.error("Failed to toggle status:", error);
        }
    };
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Deals Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Monitor restaurant-generated deals across the platform</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Active Deals</p>
                    {isStatsLoading ? <div className="h-9 w-16 bg-white/5 animate-pulse rounded mb-2"></div> : <h3 className="text-3xl font-bold text-white mb-2">{stats?.activeDeals?.value || 0}</h3>}
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {stats?.activeDeals?.change || "+0"}
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-[#10B981]" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Most Claimed Deal</p>
                    {isStatsLoading ? <div className="h-9 w-16 bg-white/5 animate-pulse rounded mb-2"></div> : <h3 className="text-3xl font-bold text-white mb-2">{stats?.mostClaimed?.value || 0}</h3>}
                    <p className="text-[11px] text-zinc-500 font-medium line-clamp-1 max-w-[80%]">{stats?.mostClaimed?.change || "N/A"}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Inactive Deals</p>
                    {isStatsLoading ? <div className="h-9 w-16 bg-white/5 animate-pulse rounded mb-2"></div> : <h3 className="text-3xl font-bold text-white mb-2">{stats?.inactiveDeals?.value || 0}</h3>}
                    <p className="text-[11px] text-orange-500 font-bold">{stats?.inactiveDeals?.change || "Inactive"}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Live Deal Monitoring */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                    <div>
                        <h3 className="text-base font-bold text-white">Live Deal Monitoring</h3>
                        <p className="text-xs text-zinc-500 mt-1">Deals are created by restaurant owners - Admin view only</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search deals..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-64"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50"
                        >
                            <option value="ALL" className="bg-[#171717] text-white">
                                All Statuses
                            </option>
                            <option value="ACTIVE" className="bg-[#171717] text-white">
                                Active
                            </option>
                            <option value="INACTIVE" className="bg-[#171717] text-white">
                                Inactive
                            </option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/1">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Restaurant</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Deal Title</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Times Claimed</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Max Claims Per Day</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Claimable Time</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-10 text-center text-zinc-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading deals...
                                    </td>
                                </tr>
                            ) : liveDeals.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-10 text-center text-zinc-500">
                                        No deals found.
                                    </td>
                                </tr>
                            ) : (
                                liveDeals.map((deal: any) => (
                                    <tr key={deal._id} className="hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{deal.restaurantId?.restaurantName || "Unknown"}</p>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-zinc-300">{deal.title}</td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="text-sm font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-lg">{deal.savedCount || 0}</span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-zinc-400 text-center">{deal.maxClaimsPerDay || "N/A"}</td>
                                        <td className="px-8 py-5 text-sm text-zinc-500 text-center">{deal.day ? `${formatDaysString(deal.day)}` : "N/A"}</td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${deal.isActive ? "bg-[#10B981]/10 text-[#10B981]" : "bg-orange-500/10 text-orange-500"}`}>{deal.isActive ? "Active" : "Inactive"}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-3 text-zinc-500">
                                                <button
                                                    onClick={() => handleToggleStatus(deal._id)}
                                                    className={`p-2 hover:bg-white/5 rounded-lg transition-all ${deal.isActive ? "hover:text-red-500 text-zinc-400" : "hover:text-[#10B981] text-zinc-400"}`}
                                                    title={deal.isActive ? "Deactivate Deal" : "Activate Deal"}
                                                >
                                                    {deal.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => setEditingDeal(deal)}
                                                    className="p-2 hover:bg-white/5 rounded-lg hover:text-[#10B981] transition-all text-zinc-400"
                                                    title="Edit Deal"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setSelectedDealId(deal._id)} className="p-2 hover:bg-white/5 rounded-lg hover:text-white transition-all text-zinc-400" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta && (
                    <div className="p-8 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-zinc-500">
                            Showing {liveDeals.length} of {meta.total || 0} deals (Page {meta.page} of {totalPages})
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={!hasPrev}
                                className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={!hasNext}
                                className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Peak Booking Times */}
            {/* <div className="space-y-6">
                <h3 className="text-base font-bold text-white px-2">Peak Booking Times</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {peakTimes.map((item, idx) => (
                        <div key={idx} className="bg-[#171717] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 group hover:border-[#10B981]/30 transition-all">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.time}</p>
                            <h4 className="text-2xl font-bold text-white tracking-tight">{item.value}</h4>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                <div className="h-full bg-[#10B981]" style={{ width: `${(item.value / 300) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            {/* Modal */}
            {selectedDealId && <DealDetailsModal dealId={selectedDealId} onClose={() => setSelectedDealId(null)} />}
            {editingDeal && (
                <EditDealModal
                    deal={editingDeal}
                    onClose={() => setEditingDeal(null)}
                    onSuccess={() => setEditingDeal(null)}
                />
            )}
        </div>
    );
}

const DealDetailsModal = ({ dealId, onClose }: { dealId: string; onClose: () => void }) => {
    const { data, isLoading } = useGetAdminDealByIdQuery(dealId);
    const deal = data?.data;

    if (isLoading)
        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-[#171717] border border-white/5 p-8 rounded-2xl flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#10B981] mb-4" />
                    <p className="text-white">Loading details...</p>
                </div>
            </div>
        );

    if (!deal)
        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-[#171717] border border-white/5 p-8 rounded-2xl flex flex-col items-center">
                    <p className="text-white mb-4">Deal not found</p>
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 rounded-lg text-white">
                        Close
                    </button>
                </div>
            </div>
        );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-[#171717] border border-white/5 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#171717]">
                    <h2 className="text-xl font-bold text-white">Deal Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Restaurant</p>
                        <p className="text-white font-medium">{deal.restaurantId?.restaurantName || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Title</p>
                        <p className="text-white font-medium">{deal.title}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Description</p>
                        <p className="text-zinc-300">{deal.description || "No description provided"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Deal Type</p>
                            <p className="text-white">{deal.dealType}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Status</p>
                            <p className="text-white">{deal.isActive ? "Active" : "Inactive"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Day</p>
                            <p className="text-white">{formatDaysString(deal.day)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Meal Time</p>
                            <p className="text-white">{deal.mealTime}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Time</p>
                            <p className="text-white">
                                {deal.start} - {deal.end}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Max Claims Per Day</p>
                            <p className="text-white">{deal.maxClaimsPerDay}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Times Claimed</p>
                            <p className="text-[#10B981] font-bold">{deal.savedCount || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
