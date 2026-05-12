'use client';

import React, { useState } from 'react';
import { Eye, KeyRound, Pencil, XCircle, Plus, X } from 'lucide-react';

type StaffRole = 'Waiter' | 'Manager' | 'Cashier' | 'Chef' | 'Host';
type StaffStatus = 'active' | 'inactive';

type Staff = {
    id: number;
    staffId: string;
    name: string;
    role: StaffRole;
    phone: string;
    status: StaffStatus;
};

const roleColors: Record<StaffRole, string> = {
    Waiter: 'bg-blue-50 text-blue-700',
    Manager: 'bg-purple-50 text-purple-700',
    Cashier: 'bg-sky-50 text-sky-700',
    Chef: 'bg-orange-50 text-orange-700',
    Host: 'bg-teal-50 text-teal-700',
};

const initialStaff: Staff[] = [
    { id: 1, staffId: 'STF-1001', name: 'John Smith',    role: 'Waiter',   phone: '+1 (555) 123-4567', status: 'active' },
    { id: 2, staffId: 'STF-1002', name: 'Sarah Johnson', role: 'Manager',  phone: '+1 (555) 234-5678', status: 'active' },
    { id: 3, staffId: 'STF-1003', name: 'Mike Chen',     role: 'Cashier',  phone: '+1 (555) 345-6789', status: 'active' },
    { id: 4, staffId: 'STF-1004', name: 'John Doe',      role: 'Cashier',  phone: '+1 (555) 456-7890', status: 'active' },
];

export default function StaffPage() {
    const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', role: 'Waiter' as StaffRole, phone: '' });

    const handleDelete = (id: number) => setStaffList(staffList.filter(s => s.id !== id));

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const nextNum = staffList.length + 1001;
        const newStaff: Staff = {
            id: Date.now(),
            staffId: `STF-${nextNum}`,
            name: form.name,
            role: form.role,
            phone: form.phone,
            status: 'active',
        };
        setStaffList([...staffList, newStaff]);
        setForm({ name: '', role: 'Waiter', phone: '' });
        setShowModal(false);
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
            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
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
                    <tbody>
                        {staffList.map((staff, i) => (
                            <tr
                                key={staff.id}
                                className={`hover:bg-zinc-50 transition-colors ${i < staffList.length - 1 ? 'border-b border-zinc-50' : ''}`}
                            >
                                <td className="px-6 py-5 font-medium text-zinc-900">{staff.name}</td>

                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleColors[staff.role]}`}>
                                        {staff.role}
                                    </span>
                                </td>

                                <td className="px-6 py-5 text-zinc-600">{staff.phone}</td>

                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-mono font-semibold">
                                        {staff.staffId}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                        staff.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        {staff.status}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <button className="text-zinc-500 hover:text-[#013622] transition-colors" title="View">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-zinc-500 hover:text-amber-500 transition-colors" title="Reset Password">
                                            <KeyRound className="w-4 h-4" />
                                        </button>
                                        <button className="text-zinc-500 hover:text-[#013622] transition-colors" title="Edit">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(staff.id)}
                                            className="text-zinc-500 hover:text-red-500 transition-colors"
                                            title="Remove"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {staffList.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 text-sm">
                                    No staff added yet. Click <strong>Add Staff</strong> to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Role</label>
                                <select
                                    value={form.role}
                                    onChange={e => setForm({ ...form, role: e.target.value as StaffRole })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-white"
                                >
                                    {(['Waiter', 'Manager', 'Cashier', 'Chef', 'Host'] as StaffRole[]).map(r => (
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
                                    className="flex-1 py-3 rounded-[10px] bg-[#013622] text-white text-sm font-semibold hover:bg-[#012a1a] transition-colors"
                                >
                                    Add Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
