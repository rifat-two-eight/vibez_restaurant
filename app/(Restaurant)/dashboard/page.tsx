'use client';

import React from 'react';
import {
    Calendar,
    Tag,
    Users,
    UserCheck,
    Plus,
    UserPlus,
    Clock,
    ArrowUpRight
} from 'lucide-react';

export default function DashboardOverview() {
    const stats = [
        {
            label: 'Total Bookings Today',
            value: '23',
            trend: '+5 from yesterday',
            icon: Calendar,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600'
        },
        {
            label: 'Active Deals',
            value: '2',
            trend: 'Stable',
            icon: Tag,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            label: 'Total Customers Served',
            value: '1,847',
            trend: 'This month',
            icon: Users,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            label: 'Staff Active Today',
            value: '4',
            trend: 'Full capacity',
            icon: UserCheck,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600'
        },
    ];

    const quickActions = [
        { name: 'Create New Deal', icon: Plus, primary: true },
        { name: 'Add Staff', icon: UserPlus, primary: false },
        { name: 'Set Weekly Schedule', icon: Clock, primary: false },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-zinc-900">Restaurant Dashboard</h1>
                <p className="text-zinc-500">Manage your deals, staff, and daily operations from one place.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-zinc-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-zinc-900">{stat.value}</h3>
                                <p className="text-xs text-zinc-400 font-medium">{stat.trend}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-zinc-900">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.name}
                                className={`flex items-center justify-center gap-3 p-5 rounded-xl font-bold transition-all active:scale-[0.98] border ${action.primary
                                        ? "bg-[#013622] text-white shadow-lg shadow-[#013622]/20 border-transparent hover:bg-[#012a1a]"
                                        : "bg-white text-[#013622] border-zinc-200 hover:border-[#013622] hover:bg-[#013622]/5"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{action.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
