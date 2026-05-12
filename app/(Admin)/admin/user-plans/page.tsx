'use client';

import React from 'react';
import { Info } from 'lucide-react';

const plans = [
    {
        name: '1 Day Access',
        price: '$4.99',
        duration: '1 Day',
    },
    {
        name: 'Monthly Subscription',
        price: '$29.99',
        duration: '30 Days',
    },
    {
        name: 'Yearly Subscription',
        price: '$199.99',
        duration: '365 Days',
    }
];

export default function UserPlansPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">User Plans</h1>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-4 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-sm text-blue-700">Free users can browse but cannot use deals</p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-white border border-zinc-100 rounded-[10px] p-8 space-y-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-zinc-900">{plan.name}</h3>
                            <p className="text-4xl font-bold text-zinc-900">{plan.price}</p>
                            <p className="text-sm text-zinc-400 font-medium">{plan.duration}</p>
                        </div>

                        <div>
                            <span className="inline-flex px-3 py-1 rounded-full bg-pink-50 text-[#CF0738] text-xs font-bold">
                                All Deals
                            </span>
                        </div>

                        <div className="flex items-center gap-3 pt-4">
                            <button className="flex-1 px-4 py-2 rounded-[8px] border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all">
                                Edit Price
                            </button>
                            <button className="flex-1 px-4 py-2 rounded-[8px] border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all">
                                Activate
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
