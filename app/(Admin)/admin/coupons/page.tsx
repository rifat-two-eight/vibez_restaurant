'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Ticket, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
    useGetCouponsQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation
} from '@/redux/features/coupon/couponApi';

export default function AdminCouponsPage() {
    const { data: couponsRes, isLoading: isCouponsLoading } = useGetCouponsQuery({});
    const coupons = couponsRes?.data || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<any>(null);
    const [deletingCoupon, setDeletingCoupon] = useState<any>(null);

    const openCreateModal = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const openEditModal = (coupon: any) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">Coupons Management</h1>
                    <p className="text-zinc-400 text-sm mt-1">Create and manage Stripe discount coupons</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-[#1447E6] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0c2f99] transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Coupon
                </button>
            </div>

            <div className="bg-[#171717] rounded-[10px] border border-white/5 overflow-hidden shadow-xl">
                {isCouponsLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-[#1447E6]" />
                    </div>
                ) : (
                    <table className="w-full text-left text-sm text-zinc-300">
                        <thead className="bg-white/5 text-xs uppercase font-semibold text-zinc-400 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Coupon ID / Name</th>
                                <th className="px-6 py-4">Discount</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Redeemed</th>
                                <th className="px-6 py-4">Status / Default</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-zinc-500">No coupons found.</td>
                                </tr>
                            ) : (
                                coupons.map((c: any) => (
                                    <tr key={c._id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white flex items-center gap-2">
                                                <Ticket className="w-4 h-4 text-[#1447E6]" />
                                                {c.couponId}
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-0.5">{c.name || 'No Name'}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {c.percentOff ? `${c.percentOff}% off` : `${(c.amountOff / 100).toFixed(2)} ${c.currency?.toUpperCase() || 'CHF'} off`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize">{c.duration}</span>
                                            {c.duration === 'repeating' && <span className="text-zinc-500 text-xs ml-1">({c.durationInMonths} mos)</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {c.timesRedeemed} {c.maxRedemptions ? `/ ${c.maxRedemptions}` : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {c.isActive ? (
                                                    <span className="w-fit bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Active</span>
                                                ) : (
                                                    <span className="w-fit bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Inactive</span>
                                                )}
                                                {c.isDefault && (
                                                    <span className="w-fit bg-[#1447E6]/10 text-[#1447E6] border border-[#1447E6]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Default Referral</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => openEditModal(c)} className="text-zinc-400 hover:text-white transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setDeletingCoupon(c)} className="text-zinc-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <CouponModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    editingCoupon={editingCoupon}
                />
            )}

            {deletingCoupon && (
                <DeleteCouponModal
                    coupon={deletingCoupon}
                    onClose={() => setDeletingCoupon(null)}
                />
            )}
        </div>
    );
}

function DeleteCouponModal({ coupon, onClose }: { coupon: any, onClose: () => void }) {
    const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

    const handleConfirm = async () => {
        try {
            await deleteCoupon(coupon._id).unwrap();
            toast.success("Coupon deleted successfully!");
            onClose();
        } catch (error: any) {
            console.error("Coupon deletion failed:", error);
            toast.error(error?.data?.message || "Failed to delete coupon.");
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Delete Coupon?</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Are you sure you want to delete <strong className="text-white font-semibold">"{coupon.couponId}"</strong>? This will permanently remove it from your database and Stripe.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="flex-1 py-3.5 px-4 bg-[#CF0738] hover:bg-[#b00630] text-white font-bold rounded-xl shadow-lg shadow-[#CF0738]/20 transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CouponModal({ isOpen, onClose, editingCoupon }: { isOpen: boolean, onClose: () => void, editingCoupon: any }) {
    const isEditing = !!editingCoupon;

    const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

    const [formData, setFormData] = useState({
        couponId: editingCoupon?.couponId || '',
        name: editingCoupon?.name || '',
        discountType: editingCoupon?.percentOff ? 'percent' : (editingCoupon?.amountOff ? 'amount' : 'percent'),
        discountValue: editingCoupon?.percentOff || (editingCoupon?.amountOff ? editingCoupon.amountOff / 100 : ''),
        currency: editingCoupon?.currency || 'chf',
        duration: editingCoupon?.duration || 'once',
        durationInMonths: editingCoupon?.durationInMonths || '',
        maxRedemptions: editingCoupon?.maxRedemptions || '',
        isDefault: editingCoupon?.isDefault || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing) {
                // Edit mode: Stripe only allows updating name & metadata, plus local isDefault.
                const updatePayload = {
                    name: formData.name,
                    isDefault: formData.isDefault
                };
                await updateCoupon({ id: editingCoupon._id, data: updatePayload }).unwrap();
                toast.success("Coupon updated successfully");
            } else {
                // Create mode
                const payload: any = {
                    couponId: formData.couponId,
                    name: formData.name,
                    duration: formData.duration,
                    isDefault: formData.isDefault,
                };

                if (formData.discountType === 'percent') {
                    payload.percentOff = Number(formData.discountValue);
                } else {
                    payload.amountOff = Number(formData.discountValue) * 100; // convert to cents
                    payload.currency = formData.currency;
                }

                if (formData.duration === 'repeating') {
                    payload.durationInMonths = Number(formData.durationInMonths);
                }

                if (formData.maxRedemptions) {
                    payload.maxRedemptions = Number(formData.maxRedemptions);
                }

                await createCoupon(payload).unwrap();
                toast.success("Coupon created successfully");
            }
            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} coupon`);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Coupon' : 'Create New Coupon'}</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Coupon ID / Code</label>
                            <input
                                required
                                name="couponId"
                                value={formData.couponId}
                                onChange={handleChange}
                                disabled={isEditing}
                                placeholder="e.g. SUMMER50"
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6] disabled:opacity-50"
                            />
                            {isEditing && <p className="text-[10px] text-zinc-500 mt-1">Core Stripe fields cannot be changed after creation.</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Descriptive Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. 50% Off Summer Sale"
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                            />
                        </div>

                        {!isEditing && (
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Discount Type</label>
                                    <select
                                        name="discountType"
                                        value={formData.discountType}
                                        onChange={handleChange}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    >
                                        <option value="percent">Percentage (%)</option>
                                        <option value="amount">Fixed Amount</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                        Value {formData.discountType === 'percent' ? '(%)' : '(CHF)'}
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        name="discountValue"
                                        value={formData.discountValue}
                                        onChange={handleChange}
                                        placeholder={formData.discountType === 'percent' ? 'e.g. 15' : 'e.g. 5.00'}
                                        min="0"
                                        step={formData.discountType === 'percent' ? '1' : '0.01'}
                                        max={formData.discountType === 'percent' ? '100' : undefined}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Duration</label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    >
                                        <option value="once">Once</option>
                                        <option value="repeating">Repeating</option>
                                        <option value="forever">Forever</option>
                                    </select>
                                </div>

                                {formData.duration === 'repeating' && (
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Duration in Months</label>
                                        <input
                                            type="number"
                                            required
                                            name="durationInMonths"
                                            value={formData.durationInMonths}
                                            onChange={handleChange}
                                            placeholder="e.g. 3"
                                            min="1"
                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Max Redemptions</label>
                                    <input
                                        type="number"
                                        name="maxRedemptions"
                                        value={formData.maxRedemptions}
                                        onChange={handleChange}
                                        placeholder="Optional limit"
                                        min="1"
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="border-t border-white/5 pt-4 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded bg-[#0A0A0A] border border-white/20 text-[#1447E6] focus:ring-[#1447E6] focus:ring-offset-[#171717]"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white group-hover:text-[#1447E6] transition-colors">Default Referral Coupon</div>
                                    <div className="text-xs text-zinc-500">Automatically apply this to users signing up via referrals.</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="bg-[#1447E6] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0c2f99] transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {isCreating || isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {isEditing ? 'Save Changes' : 'Create Coupon'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
