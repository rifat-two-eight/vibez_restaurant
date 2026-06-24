'use client';

import React, { useState } from 'react';
import { Eye, KeyRound, Pencil, XCircle, Play, Plus, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { useCreateStaffMutation, useGetStaffQuery, useToggleStaffStatusMutation, useUpdateStaffMutation, useUpdateStaffPasswordMutation } from '@/redux/features/staff/staffApi';

export type StaffRole = "MANAGER" | "CASHIER" | "WAITER";

const roleColors: Record<StaffRole, string> = {
    WAITER: 'bg-blue-50 text-blue-700',
    MANAGER: 'bg-purple-50 text-purple-700',
    CASHIER: 'bg-sky-50 text-sky-700',
};

export default function StaffPage() {
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', staffRole: 'WAITER' as StaffRole });

    const { data: response, isLoading, isFetching } = useGetStaffQuery({ page, limit: 10 });
    const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
    const [toggleStaffStatus] = useToggleStaffStatusMutation();
    const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();
    const [updateStaffPassword, { isLoading: isUpdatingPassword }] = useUpdateStaffPasswordMutation();

    const [editingStaff, setEditingStaff] = useState<any>(null);
    const [viewingStaff, setViewingStaff] = useState<any>(null);
    const [resettingPasswordStaff, setResettingPasswordStaff] = useState<any>(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', staffRole: 'WAITER' as StaffRole });
    const [passwordForm, setPasswordForm] = useState({ password: '' });

    const staffList = response?.data || [];
    const meta = response?.meta;

    const handleDelete = (id: string) => {
        // TODO: add delete mutation later
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            await toggleStaffStatus({ id, isActive: !currentStatus }).unwrap();
            toast.success(`Staff member ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
        } catch (error) {
            console.error("Toggle failed:", error);
            toast.error("Failed to toggle staff status.");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createStaff(form).unwrap();
            toast.success("Staff member added successfully!");
            setForm({ name: '', email: '', password: '', phone: '', staffRole: 'WAITER' });
            setShowModal(false);
        } catch (error) {
            console.error("Staff creation failed:", error);
            toast.error("Failed to add staff member.");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateStaff({ id: editingStaff._id, ...editForm }).unwrap();
            toast.success("Staff member updated successfully!");
            setEditingStaff(null);
        } catch (error) {
            console.error("Staff update failed:", error);
            toast.error("Failed to update staff member.");
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateStaffPassword({ id: resettingPasswordStaff._id, password: passwordForm.password }).unwrap();
            toast.success("Password updated successfully!");
            setResettingPasswordStaff(null);
            setPasswordForm({ password: '' });
        } catch (error) {
            console.error("Password update failed:", error);
            toast.error("Failed to update password.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Manage Staff</h1>
                    <p className="text-zinc-500 text-sm mt-1">Add, control, and monitor your restaurant staff.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#013622] text-white px-5 py-3 rounded-[10px] font-semibold text-sm hover:bg-[#012a1a] transition-colors shadow-lg shadow-[#013622]/20"
                >
                    <Plus className="w-4 h-4" />
                    Add Staff
                </button>
            </div>

            {/* Table */}
            <div className={`bg-white rounded-[10px] border border-zinc-100 overflow-hidden transition-opacity duration-300 ${isFetching ? 'opacity-70' : 'opacity-100'}`}>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-100">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Staff Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Role</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Phone Number</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Staff ID</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Status</th>
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
                        ) : staffList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 text-sm">
                                    No staff added yet. Click <strong>Add Staff</strong> to get started.
                                </td>
                            </tr>
                        ) : (
                            staffList.map((staff: any, i: number) => (
                                <tr
                                    key={staff._id}
                                    className={`hover:bg-zinc-50 transition-colors ${i < staffList.length - 1 ? 'border-b border-zinc-50' : ''}`}
                                >
                                    <td className="px-6 py-5 font-medium text-zinc-900">
                                        <div>{staff.name}</div>
                                        <div className="text-xs text-zinc-400 font-normal">{staff.email}</div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleColors[staff.staffRole as StaffRole] || 'bg-zinc-100 text-zinc-700'}`}>
                                            {staff.staffRole}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5 text-zinc-600">{staff.phone || 'N/A'}</td>

                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-mono font-semibold uppercase">
                                            STF-{staff._id.slice(-6)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${staff.enableStaffLogin
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-red-50 text-red-700'
                                            }`}>
                                            {staff.enableStaffLogin ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => setViewingStaff(staff)}
                                                className="text-zinc-500 hover:text-[#013622] transition-colors" 
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setResettingPasswordStaff(staff);
                                                    setPasswordForm({ password: '' });
                                                }}
                                                className="text-zinc-500 hover:text-amber-500 transition-colors" 
                                                title="Reset Password"
                                            >
                                                <KeyRound className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setEditingStaff(staff);
                                                    setEditForm({ name: staff.name, email: staff.email, phone: staff.phone, staffRole: staff.staffRole });
                                                }}
                                                className="text-zinc-500 hover:text-[#013622] transition-colors" 
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleToggle(staff._id, staff.enableStaffLogin)}
                                                className={`transition-colors ${staff.enableStaffLogin ? 'text-zinc-500 hover:text-red-500' : 'text-zinc-500 hover:text-emerald-500'}`}
                                                title={staff.enableStaffLogin ? "Deactivate" : "Activate"}
                                            >
                                                {staff.enableStaffLogin ? <XCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

            {/* Add Staff Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md mx-4 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900">Add New Staff</h2>
                            <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Full Name</label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. John Smith"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    placeholder="e.g. staff@example.com"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Password</label>
                                <input
                                    required
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    placeholder="Password123"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Role</label>
                                <select
                                    value={form.staffRole}
                                    onChange={e => setForm({ ...form, staffRole: e.target.value as StaffRole })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-white"
                                >
                                    {(['MANAGER', 'CASHIER', 'WAITER'] as StaffRole[]).map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Phone Number</label>
                                <input
                                    required
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    placeholder="e.g. +1 (555) 000-0000"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-[10px] border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="flex-1 py-3 rounded-[10px] bg-[#013622] text-white text-sm font-semibold hover:bg-[#012a1a] transition-colors disabled:opacity-50"
                                >
                                    {isCreating ? "Adding..." : "Add Staff"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Staff Modal */}
            {editingStaff && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md mx-4 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900">Edit Staff</h2>
                            <button onClick={() => setEditingStaff(null)} className="text-zinc-400 hover:text-zinc-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Full Name</label>
                                <input
                                    required
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={editForm.email}
                                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Role</label>
                                <select
                                    value={editForm.staffRole}
                                    onChange={e => setEditForm({ ...editForm, staffRole: e.target.value as StaffRole })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-white"
                                >
                                    {(['MANAGER', 'CASHIER', 'WAITER'] as StaffRole[]).map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Phone Number</label>
                                <input
                                    required
                                    value={editForm.phone}
                                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingStaff(null)}
                                    className="flex-1 py-3 rounded-[10px] border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 py-3 rounded-[10px] bg-[#013622] text-white text-sm font-semibold hover:bg-[#012a1a] transition-colors disabled:opacity-50"
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Staff Modal */}
            {viewingStaff && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md mx-4 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900">Staff Details</h2>
                            <button onClick={() => setViewingStaff(null)} className="text-zinc-400 hover:text-zinc-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-y-4 text-sm items-center">
                                <div className="text-zinc-500">Name</div>
                                <div className="font-semibold text-zinc-900">{viewingStaff.name}</div>
                                
                                <div className="text-zinc-500">Email</div>
                                <div className="font-medium text-zinc-900 truncate">{viewingStaff.email}</div>
                                
                                <div className="text-zinc-500">Phone</div>
                                <div className="font-medium text-zinc-900">{viewingStaff.phone || 'N/A'}</div>
                                
                                <div className="text-zinc-500">Role</div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleColors[viewingStaff.staffRole as StaffRole] || 'bg-zinc-100 text-zinc-700'}`}>
                                        {viewingStaff.staffRole}
                                    </span>
                                </div>
                                
                                <div className="text-zinc-500">Status</div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${viewingStaff.enableStaffLogin ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                        {viewingStaff.enableStaffLogin ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                
                                <div className="text-zinc-500">Staff ID</div>
                                <div className="font-mono font-semibold uppercase text-xs">STF-{viewingStaff._id.slice(-6)}</div>
                            </div>
                            <div className="pt-6">
                                <button
                                    onClick={() => setViewingStaff(null)}
                                    className="w-full py-3 rounded-[10px] bg-zinc-100 text-zinc-700 text-sm font-semibold hover:bg-zinc-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resettingPasswordStaff && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md mx-4 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900">Reset Password</h2>
                            <button onClick={() => setResettingPasswordStaff(null)} className="text-zinc-400 hover:text-zinc-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-500 mb-4">
                                    Set a new password for <span className="font-semibold text-zinc-900">{resettingPasswordStaff.name}</span>.
                                </p>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">New Password</label>
                                <input
                                    required
                                    type="password"
                                    value={passwordForm.password}
                                    onChange={e => setPasswordForm({ password: e.target.value })}
                                    placeholder="Enter new password"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setResettingPasswordStaff(null)}
                                    className="flex-1 py-3 rounded-[10px] border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdatingPassword}
                                    className="flex-1 py-3 rounded-[10px] bg-[#013622] text-white text-sm font-semibold hover:bg-[#012a1a] transition-colors disabled:opacity-50"
                                >
                                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
