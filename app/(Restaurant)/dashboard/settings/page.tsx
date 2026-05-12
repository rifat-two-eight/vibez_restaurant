'use client';

import React, { useState } from 'react';
import { Building2, MapPin, Utensils, ShieldCheck, Save, Users } from 'lucide-react';

const PERMISSIONS = [
    'Verify customer bookings',
    'Handle walk-in customers',
    'View daily reports',
    'Modify deals',
];

export default function SettingsPage() {
    const [form, setForm] = useState({
        name: 'The Gourmet Bistro',
        address: '123 Main Street, Downtown',
        cuisine: '',
    });
    const [staffLogin, setStaffLogin] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <form onSubmit={handleSave} className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Restaurant Settings</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage your restaurant information and access controls</p>
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#013622] text-white px-5 py-3 rounded-[10px] font-semibold text-sm hover:bg-[#012a1a] transition-colors shadow-lg shadow-[#013622]/20"
                >
                    <Save className="w-4 h-4" />
                    Save Settings
                </button>
            </div>

            {saved && (
                <p className="text-sm text-emerald-600 font-semibold">✓ Settings saved successfully.</p>
            )}

            {/* Business Information */}
            <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-100 rounded-[8px]">
                        <Building2 className="w-4 h-4 text-zinc-500" />
                    </div>
                    <h2 className="text-base font-bold text-zinc-900">Business Information</h2>
                </div>

                <div className="space-y-5">
                    {/* Restaurant Name */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700">
                            <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="The Gourmet Bistro"
                            className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-zinc-50"
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            Address
                        </label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            placeholder="123 Main Street, Downtown"
                            className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-zinc-50"
                        />
                    </div>

                    {/* Cuisine Type */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700">
                            <Utensils className="w-3.5 h-3.5 text-zinc-400" />
                            Cuisine Type
                        </label>
                        <input
                            type="text"
                            value={form.cuisine}
                            onChange={e => setForm({ ...form, cuisine: e.target.value })}
                            placeholder="e.g. Italian, Fusion, Mediterranean"
                            className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] bg-zinc-50"
                        />
                    </div>
                </div>
            </div>

            {/* Access Control */}
            <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-100 rounded-[8px]">
                        <ShieldCheck className="w-4 h-4 text-zinc-500" />
                    </div>
                    <h2 className="text-base font-bold text-zinc-900">Access Control</h2>
                </div>

                {/* Toggle Row */}
                <div className="flex items-center justify-between p-4 rounded-[10px] border border-zinc-100 bg-zinc-50">
                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-zinc-900">Enable Staff Login</p>
                            <p className="text-xs text-zinc-400 mt-0.5">Allow staff members to log in and access their dashboard</p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                        type="button"
                        onClick={() => setStaffLogin(!staffLogin)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            staffLogin ? 'bg-[#013622]' : 'bg-zinc-300'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                                staffLogin ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* Permissions Panel */}
                {staffLogin && (
                    <div className="rounded-[10px] border border-blue-100 bg-blue-50 p-5 space-y-3">
                        <div>
                            <p className="text-sm font-bold text-blue-800">Manage Staff Permissions</p>
                            <p className="text-xs text-blue-600 mt-0.5">Control what staff members can do on their dashboard</p>
                        </div>
                        <ul className="space-y-2 pl-2">
                            {PERMISSIONS.map(p => (
                                <li key={p} className="flex items-center gap-2 text-sm text-blue-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
}
