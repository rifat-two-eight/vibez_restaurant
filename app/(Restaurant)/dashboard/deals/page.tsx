'use client';

import React, { useState } from 'react';
import { Pencil, Pause, Trash2, Plus, X } from 'lucide-react';

type Deal = {
    id: number;
    name: string;
    type: string;
    status: 'active' | 'paused';
    claimsToday: number;
    totalBookings: number;
    maxPerDay: number;
};

const initialDeals: Deal[] = [
    { id: 1, name: '2-for-1 Dinner', type: 'Buy One Get One', status: 'active', claimsToday: 23, totalBookings: 432, maxPerDay: 50 },
    { id: 2, name: 'Free Drink Offer', type: 'Free Item', status: 'active', claimsToday: 18, totalBookings: 318, maxPerDay: 30 },
];

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>(initialDeals);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', type: '', maxPerDay: '' });

    const handleDelete = (id: number) => setDeals(deals.filter(d => d.id !== id));

    const handleToggle = (id: number) => {
        setDeals(deals.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'paused' : 'active' } : d));
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const newDeal: Deal = {
            id: Date.now(),
            name: form.name,
            type: form.type,
            status: 'active',
            claimsToday: 0,
            totalBookings: 0,
            maxPerDay: parseInt(form.maxPerDay) || 10,
        };
        setDeals([...deals, newDeal]);
        setForm({ name: '', type: '', maxPerDay: '' });
        setShowModal(false);
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
            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
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
                    <tbody>
                        {deals.map((deal, i) => (
                            <tr key={deal.id} className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${i === deals.length - 1 ? 'border-b-0' : ''}`}>
                                <td className="px-6 py-5">
                                    <div className="font-semibold text-zinc-900">{deal.name}</div>
                                    <div className="text-xs text-zinc-400 mt-0.5">{deal.type}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                        deal.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        {deal.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 font-medium text-zinc-800">{deal.claimsToday}</td>
                                <td className="px-6 py-5 font-medium text-zinc-800">{deal.totalBookings}</td>
                                <td className="px-6 py-5 text-zinc-400 font-medium">{deal.maxPerDay}</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <button className="text-zinc-500 hover:text-[#013622] transition-colors" title="Edit">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleToggle(deal.id)}
                                            className="text-zinc-500 hover:text-amber-500 transition-colors"
                                            title={deal.status === 'active' ? 'Pause' : 'Resume'}
                                        >
                                            <Pause className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(deal.id)}
                                            className="text-zinc-500 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {deals.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 text-sm">
                                    No deals yet. Click <strong>Create New Offer</strong> to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Deal Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md mx-4 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900">Create New Offer</h2>
                            <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Deal Name</label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. 2-for-1 Dinner"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Deal Type</label>
                                <input
                                    required
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value })}
                                    placeholder="e.g. Buy One Get One"
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Max Claims Per Day</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={form.maxPerDay}
                                    onChange={e => setForm({ ...form, maxPerDay: e.target.value })}
                                    placeholder="e.g. 50"
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
                                    Create Deal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
