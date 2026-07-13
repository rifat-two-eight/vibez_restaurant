'use client';

import React, { useState } from 'react';
import { Pencil, Pause, Play, Trash2, Plus, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import CreateDealModal from './CreateDealModal';
import EditDealModal from './EditDealModal';
import DeleteDealModal from './DeleteDealModal';
import { useGetMyDealsQuery, useToggleDealStatusMutation } from '@/redux/features/deals/dealsApi';
import { toast } from "sonner";

export default function DealsPage() {
    const [showModal, setShowModal] = useState(false);
    const [editingDeal, setEditingDeal] = useState<any>(null);
    const [deletingDeal, setDeletingDeal] = useState<{ id: string, title: string } | null>(null);
    const [page, setPage] = useState(1);

    const { data: response, isLoading, isFetching } = useGetMyDealsQuery({ page, limit: 10 });
    const [toggleDealStatus] = useToggleDealStatusMutation();
    const deals = response?.data || [];
    const meta = response?.meta;

    const handleDelete = (id: string, title: string) => {
        setDeletingDeal({ id, title });
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            await toggleDealStatus(id).unwrap();
            toast.success(`Deal ${currentStatus ? 'paused' : 'activated'} successfully!`);
        } catch (error) {
            console.error("Toggle status failed:", error);
            toast.error("Failed to toggle deal status.");
        }
    };

    const formatDayLabels = (days: any) => {
        if (!days) return '';
        const dayArr = Array.isArray(days) ? days : [days];
        return dayArr.map((d: string) => d.charAt(0) + d.slice(1).toLowerCase()).join(', ');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Manage Deals</h1>
                    <p className="text-zinc-500 text-sm mt-1">Create, edit, and monitor your restaurant offers</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#013622] text-white px-5 py-3 rounded-[10px] font-semibold text-sm hover:bg-[#012a1a] transition-colors shadow-lg shadow-[#013622]/20"
                >
                    <Plus className="w-4 h-4" />
                    Create New Offer
                </button>
            </div>

            {/* Table */}
            <div className={`bg-white rounded-[10px] border border-zinc-100 overflow-hidden transition-opacity duration-300 ${isFetching ? 'opacity-70' : 'opacity-100'}`}>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-100">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Deal Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Claims Today</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Total Bookings</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Max/Day</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#013622] mx-auto" />
                                </td>
                            </tr>
                        ) : deals.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 text-sm">
                                    No deals yet. Click <strong>Create New Offer</strong> to get started.
                                </td>
                            </tr>
                        ) : (
                            deals.map((deal: any, i: number) => (
                                <tr key={deal._id} className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${i === deals.length - 1 ? 'border-b-0' : ''}`}>
                                    <td className="px-6 py-5">
                                        <div className="font-semibold text-zinc-900">{deal.title}</div>
                                        <div className="text-xs mt-1.5 flex flex-wrap items-center gap-1.5 text-zinc-500">
                                            <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{deal.dealType?.replace(/_/g, ' ')}</span>
                                            <span className="text-zinc-300">•</span>
                                            <span className="font-medium text-zinc-700">{formatDayLabels(deal.day)}</span>
                                            {deal.mealTime && (
                                                <>
                                                    <span className="text-zinc-300">•</span>
                                                    <span className="font-medium  uppercase text-[10px] bg-[#013622]/5 text-[#013622] px-1.5 py-0.5 rounded">{deal.mealTime}</span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${deal.isActive
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-red-50 text-red-700'
                                            }`}>
                                            {deal.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 font-medium text-zinc-800">0</td>
                                    <td className="px-6 py-5 font-medium text-zinc-800">0</td>
                                    <td className="px-6 py-5 text-zinc-400 font-medium">{deal.maxClaimsPerDay}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setEditingDeal(deal)}
                                                className="text-zinc-500 hover:text-[#013622] transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleToggle(deal._id, deal.isActive)}
                                                className="text-zinc-500 hover:text-amber-500 transition-colors"
                                                title={deal.isActive ? 'Pause' : 'Resume'}
                                            >
                                                {deal.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(deal._id, deal.title)}
                                                className="text-zinc-500 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                    <div className="border-t border-zinc-100 px-6 py-4 flex items-center justify-between">
                        <span className="text-sm text-zinc-500">
                            Page {meta.page} of {meta.totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={!meta.hasPrev}
                                onClick={() => setPage(p => p - 1)}
                                className="p-2 rounded-lg border border-zinc-200 text-zinc-500 disabled:opacity-50 hover:bg-zinc-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                disabled={!meta.hasNext}
                                onClick={() => setPage(p => p + 1)}
                                className="p-2 rounded-lg border border-zinc-200 text-zinc-500 disabled:opacity-50 hover:bg-zinc-50 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Deal Modal */}
            {showModal && (
                <CreateDealModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => setShowModal(false)}
                />
            )}

            {/* Edit Deal Modal */}
            {editingDeal && (
                <EditDealModal
                    deal={editingDeal}
                    onClose={() => setEditingDeal(null)}
                    onSuccess={() => setEditingDeal(null)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deletingDeal && (
                <DeleteDealModal
                    deal={deletingDeal}
                    onClose={() => setDeletingDeal(null)}
                    onSuccess={() => setDeletingDeal(null)}
                />
            )}
        </div>
    );
}
