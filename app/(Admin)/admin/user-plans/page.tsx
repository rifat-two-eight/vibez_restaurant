'use client';

import React, { useState } from 'react';
import {
    Users,
    CreditCard,
    AlertCircle,
    RefreshCw,
    ArrowUpRight,
    Plus,
    X,
    Trash2,
    Edit3,
    ChevronLeft,
    ChevronRight,
    Search,
    User
} from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import {
    useGetSubscriptionPlansQuery,
    useGetAdminSubscriptionStatsQuery,
    useGetAllUserSubscriptionsQuery,
    useCreateSubscriptionPlanMutation,
    useUpdateSubscriptionPlanMutation,
    useDeleteSubscriptionPlanMutation
} from '@/redux/features/admin/subscriptionApi';
import { getImageUrl } from '@/lib/utils';

export default function SubscriptionManagement() {
    const { data: plansRes, isLoading } = useGetSubscriptionPlansQuery();
    const plans = plansRes?.data || [];

    const { data: statsRes } = useGetAdminSubscriptionStatsQuery();
    const stats = statsRes?.data;

    const [currentPage, setCurrentPage] = useState(1);
    const { data: subsRes, isLoading: isLoadingSubs } = useGetAllUserSubscriptionsQuery({ page: currentPage, limit: 10 });
    const subscriptions = subsRes?.data || [];
    const meta = subsRes?.meta;

    const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();
    const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();
    const [deletePlan, { isLoading: isDeleting }] = useDeleteSubscriptionPlanMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: 'MONTHLY',
        isFreeTrial: false,
        freeTrialDays: 0
    });

    const openCreateModal = () => {
        setEditingPlan(null);
        setFormData({
            name: '',
            price: '',
            duration: 'MONTHLY',
            isFreeTrial: false,
            freeTrialDays: 0
        });
        setIsModalOpen(true);
    };

    const openEditModal = (plan: any) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            price: plan.price.toString(),
            duration: plan.duration,
            isFreeTrial: plan.isFreeTrial,
            freeTrialDays: plan.freeTrialDays || 0
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price as string),
                freeTrialDays: formData.isFreeTrial ? parseInt(formData.freeTrialDays as any) : 0
            };

            if (editingPlan) {
                await updatePlan({ id: editingPlan._id, data: payload }).unwrap();
                toast.success('Plan updated successfully');
            } else {
                await createPlan(payload).unwrap();
                toast.success('Plan created successfully');
            }
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Delete Subscription Plan?',
            text: "This action cannot be undone. This will permanently delete the subscription plan and it will no longer be available.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3f3f46',
            confirmButtonText: 'Yes, delete plan',
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
                await deletePlan(id).unwrap();
                toast.success('Plan deleted successfully');
            } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to delete plan');
            }
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Management</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage subscription plans and monitor revenue</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#10B981] hover:bg-[#0da673] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#10B981]/10"
                >
                    <Plus className="w-4 h-4" />
                    Create Plan
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Subscribers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.totalSubscribers?.value || 0}</h3>
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {stats?.totalSubscribers?.change || '0.0%'}
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Monthly Revenue</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.monthlyRevenue?.formattedValue?.replace('€', 'CHF ') || 'CHF 0'}</h3>
                    <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {stats?.monthlyRevenue?.change || '0.0%'}
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Failed Payments</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.failedPayments?.value || 0}</h3>
                    <p className="text-[11px] text-orange-500 font-bold">{stats?.failedPayments?.change || '0.0%'}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Upcoming Renewals</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats?.upcomingRenewals?.value || 0}</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">{stats?.upcomingRenewals?.period || 'Next 7 days'}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {isLoading ? (
                    <p className="text-zinc-500">Loading plans...</p>
                ) : plans.length === 0 ? (
                    <p className="text-zinc-500">No subscription plans found.</p>
                ) : (
                    plans.map((plan: any) => (
                        <div key={plan._id} className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6 hover:border-[#10B981]/30 transition-all group relative">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                <span className="text-2xl font-bold text-[#10B981]">CHF {plan.price}</span>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-zinc-500">Duration</span>
                                    <span className="text-sm font-bold text-white">{plan.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-zinc-500">Free Trial</span>
                                    <span className="text-sm font-bold text-white">
                                        {plan.isFreeTrial ? `${plan.freeTrialDays} Days` : 'No'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => openEditModal(plan)}
                                    className="flex-1 py-2.5 rounded-xl bg-white/5 text-zinc-400 text-[11px] font-bold hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit3 className="w-3 h-3" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(plan._id)}
                                    disabled={isDeleting}
                                    className="flex-1 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-[11px] font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Trash2 className="w-3 h-3" /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* User Subscriptions Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden mt-12">
                <div className="p-8 flex justify-between items-center border-b border-white/5">
                    <h3 className="text-base font-bold text-white">Active Subscriptions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Plan</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">End Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoadingSubs ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-8 text-center text-sm text-zinc-500">Loading subscriptions...</td>
                                </tr>
                            ) : subscriptions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-8 text-center text-sm text-zinc-500">No active subscriptions found.</td>
                                </tr>
                            ) : (
                                subscriptions.map((sub: any, i: number) => (
                                    <tr key={sub._id || i} className="hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                {sub.userId?.profileImage ? (
                                                    <img src={getImageUrl(sub.userId.profileImage)} alt={sub.userId.name} className="w-8 h-8 rounded-full object-cover bg-white/5" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-zinc-500" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-bold text-white">{sub.userId?.name || 'Unknown User'}</p>
                                                    <p className="text-[11px] text-zinc-500">{sub.userId?.email || 'No email'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-white">{sub.subscriptionPlanId?.name || 'Unknown Plan'}</p>
                                            <p className="text-[11px] text-zinc-500">CHF {sub.subscriptionPlanId?.price || '0'} / {sub.subscriptionPlanId?.duration}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sub.status === 'ACTIVE' ? 'bg-[#10B981]/10 text-[#10B981]' :
                                                sub.status === 'CANCELED' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-zinc-500/10 text-zinc-400'
                                                }`}>
                                                {sub.status || 'UNKNOWN'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-zinc-400">
                                            {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-white text-right">
                                            {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'N/A'}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <h2 className="text-lg font-bold text-white">
                                {editingPlan ? 'Edit Plan' : 'Create New Plan'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                                    placeholder="e.g. Premium Plan"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Price (CHF)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                                    placeholder="29.99"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Duration</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                                >
                                    <option value="MONTHLY" className="bg-[#171717]">MONTHLY</option>
                                    <option value="HALF_YEARLY" className="bg-[#171717]">HALF_YEARLY</option>
                                    <option value="YEARLY" className="bg-[#171717]">YEARLY</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="isFreeTrial"
                                    checked={formData.isFreeTrial}
                                    onChange={(e) => setFormData({ ...formData, isFreeTrial: e.target.checked })}
                                    className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0"
                                />
                                <label htmlFor="isFreeTrial" className="text-sm text-zinc-300">Offer Free Trial</label>
                            </div>
                            {formData.isFreeTrial && (
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Free Trial Days</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.freeTrialDays}
                                        onChange={(e) => setFormData({ ...formData, freeTrialDays: e.target.value as any })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                                        placeholder="7"
                                    />
                                </div>
                            )}
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="flex-1 px-4 py-3 rounded-xl bg-[#10B981] hover:bg-[#0da673] text-white text-sm font-bold transition-all shadow-lg shadow-[#10B981]/10 disabled:opacity-50"
                                >
                                    {isCreating || isUpdating ? 'Saving...' : 'Save Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
