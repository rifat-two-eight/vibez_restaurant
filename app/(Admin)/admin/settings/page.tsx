'use client';

import React, { useState } from 'react';
import { 
    DollarSign, 
    Calendar, 
    Settings, 
    Bell, 
    ShieldCheck, 
    Save,
    ChevronRight
} from 'lucide-react';

export default function PlatformSettings() {
    const [settings, setSettings] = useState({
        autoApproveRestaurants: false,
        autoApproveDeals: false,
        requireDealApproval: true,
        emailNotifications: true,
        smsNotifications: false,
        allowUserReferrals: true,
        requirePaymentVerification: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
                <p className="text-zinc-500 text-sm mt-1">Configure global platform settings and preferences</p>
            </div>

            <div className="space-y-6">
                {/* Financial Settings */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-[#10B981]" />
                        <h3 className="text-base font-bold text-white">Financial Settings</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Currency</label>
                            <input type="text" placeholder="EUR (€)" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tax Percentage (%)</label>
                            <input type="text" placeholder="21" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Default Commission Percentage (%)</label>
                            <input type="text" placeholder="10" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Maximum Commission Payout (€)</label>
                            <input type="text" placeholder="1000" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Booking Rules */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-[#1447E6]" />
                        <h3 className="text-base font-bold text-white">Booking Rules</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Minimum Booking Notice (hours)</label>
                            <input type="text" placeholder="2" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1447E6]/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Maximum Booking Advance (days)</label>
                            <input type="text" placeholder="30" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1447E6]/50 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Restaurant & Deal Management */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-5 h-5 text-purple-500" />
                        <h3 className="text-base font-bold text-white">Restaurant & Deal Management</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 'autoApproveRestaurants' as const, label: 'Auto-approve New Restaurants', desc: 'Automatically approve restaurant applications without manual review' },
                            { id: 'autoApproveDeals' as const, label: 'Auto-approve Restaurant Deals', desc: 'Allow restaurants to publish deals immediately without admin approval' },
                            { id: 'requireDealApproval' as const, label: 'Require Deal Approval', desc: 'All deals must be reviewed by admin before going live' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/[0.02] last:border-0">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting(item.id)}
                                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id] ? 'bg-[#10B981]' : 'bg-zinc-800'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id] ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-orange-500" />
                        <h3 className="text-base font-bold text-white">Notification Preferences</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive email alerts for important events' },
                            { id: 'smsNotifications' as const, label: 'SMS Notifications', desc: 'Receive SMS alerts for urgent issues' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/[0.02] last:border-0">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting(item.id)}
                                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id] ? 'bg-[#10B981]' : 'bg-zinc-800'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id] ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Referral & Payment Settings */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <h3 className="text-base font-bold text-white mb-2">Referral & Payment Settings</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'allowUserReferrals' as const, label: 'Allow User Referrals', desc: 'Enable regular users to generate referral codes' },
                            { id: 'requirePaymentVerification' as const, label: 'Require Payment Verification', desc: 'Verify payment methods before activating subscriptions' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/[0.02] last:border-0">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                                <button 
                                    onClick={() => toggleSetting(item.id)}
                                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id] ? 'bg-[#10B981]' : 'bg-zinc-800'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id] ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-12">
                <button className="flex items-center gap-2 px-10 py-4 rounded-xl bg-[#10B981] text-white text-sm font-bold hover:bg-[#0da673] transition-all shadow-xl shadow-[#10B981]/10">
                    <Save className="w-5 h-5" />
                    Save All Settings
                </button>
            </div>
        </div>
    );
}
