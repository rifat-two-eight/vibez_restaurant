'use client';

import React from 'react';

const referrals = [
    { referrer: 'John Doe',     referred: 'Mike Smith', plan: 'Monthly', status: 'Qualified',     earned: '$19.20' },
    { referrer: 'Jane Smith',   referred: 'Sarah Lee',  plan: 'Yearly',  status: 'Pending',       earned: '$0.00' },
    { referrer: 'Bob Wilson',   referred: 'Tom Brown',  plan: 'Monthly', status: 'Qualified',     earned: '$19.20' },
    { referrer: 'Alice Brown',  referred: 'Emma Davis', plan: '1 Day',   status: 'Not Qualified', earned: '$0.00' },
    { referrer: 'Charlie Davis',referred: 'Ryan Clark', plan: 'Yearly',  status: 'Qualified',     earned: '$128.00' },
];

const planStyle: Record<string, string> = {
    'Monthly': 'bg-pink-50 text-pink-600',
    'Yearly':  'bg-pink-50 text-pink-600',
    '1 Day':   'bg-pink-50 text-pink-600',
};

const statusStyle: Record<string, string> = {
    'Qualified':     'bg-[#CF0738] text-white',
    'Pending':       'bg-zinc-100 text-zinc-500',
    'Not Qualified': 'bg-[#CF0738] text-white',
};

export default function ReferralsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Referral System</h1>
            </div>

            {/* Referral Rules */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-[10px] p-6 space-y-4">
                <p className="text-sm font-bold text-emerald-800">Referral Program Rules</p>
                <ul className="space-y-1.5 text-xs text-emerald-700">
                    <li>• New user gets 50% discount on first subscription</li>
                    <li>• Qualification after 2-3 months of active subscription</li>
                    <li>• Referrer earns 80% commission on qualified referrals</li>
                    <li>• Reward valid for 12 months</li>
                </ul>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Referrer Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Referred User</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Subscription Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Qualification Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Commission Earned</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {referrals.map((ref, idx) => (
                            <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{ref.referrer}</td>
                                <td className="px-6 py-4 text-zinc-500">{ref.referred}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${planStyle[ref.plan]}`}>
                                        {ref.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[ref.status]}`}>
                                        {ref.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-zinc-900">{ref.earned}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            disabled={ref.status !== 'Qualified'}
                                            className={`text-xs font-semibold transition-colors ${
                                                ref.status === 'Qualified' ? 'text-zinc-900 hover:text-[#CF0738]' : 'text-zinc-300'
                                            }`}
                                        >
                                            Approve
                                        </button>
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
