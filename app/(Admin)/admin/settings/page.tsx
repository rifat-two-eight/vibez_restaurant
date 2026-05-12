'use client';

import React from 'react';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900">System Settings</h1>
                <button className="px-8 py-3 rounded-[10px] bg-[#CF0738] text-white text-sm font-bold hover:bg-[#b00630] transition-all shadow-lg shadow-[#CF0738]/20">
                    Save Settings
                </button>
            </div>

            <div className="space-y-6">
                {/* Currency Settings */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-4">
                    <label className="text-sm font-bold text-zinc-900 ">Currency Settings</label>
                    <div className="max-w-full">
                        <select className="w-full bg-zinc-100 border-none rounded-[10px] px-5 py-4 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CF0738]">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>BDT (৳)</option>
                        </select>
                    </div>
                </div>

                {/* Commission Percentage */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-4">
                    <label className="text-sm font-bold text-zinc-900">Commission Percentage</label>
                    <input 
                        type="text" 
                        defaultValue="80"
                        className="w-full bg-zinc-100 border-none rounded-[10px] px-5 py-4 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CF0738]"
                    />
                    <p className="text-xs text-zinc-400 font-medium">Referrer earns this percentage of the subscription price</p>
                </div>

                {/* Referral Reward Duration */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-4">
                    <label className="text-sm font-bold text-zinc-900">Referral Reward Duration (months)</label>
                    <input 
                        type="text" 
                        defaultValue="12"
                        className="w-full bg-zinc-100 border-none rounded-[10px] px-5 py-4 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CF0738]"
                    />
                    <p className="text-xs text-zinc-400 font-medium">How long the referral reward remains valid</p>
                </div>

                {/* Qualification Period */}
                <div className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-4">
                    <label className="text-sm font-bold text-zinc-900">Qualification Period (months)</label>
                    <input 
                        type="text" 
                        defaultValue="2-3"
                        className="w-full bg-zinc-100 border-none rounded-[10px] px-5 py-4 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CF0738]"
                    />
                    <p className="text-xs text-zinc-400 font-medium">Time required before referral qualifies for commission</p>
                </div>
            </div>
        </div>
    );
}
