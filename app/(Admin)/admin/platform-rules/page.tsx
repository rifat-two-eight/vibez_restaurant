'use client';

import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const rules = [
    {
        id: 1,
        title: 'Minimum 2 active deals per restaurant',
        severity: 'high',
        icon: AlertTriangle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        subTextColor: 'text-red-400',
    },
    {
        id: 2,
        title: 'Minimum 5 active days per week',
        severity: 'high',
        icon: AlertTriangle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        subTextColor: 'text-red-400',
    },
    {
        id: 3,
        title: 'At least one time slot (Lunch/Dinner)',
        severity: 'medium',
        icon: AlertCircle,
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        subTextColor: 'text-orange-400',
    },
    {
        id: 4,
        title: 'Subscription required to use deals',
        severity: 'medium',
        icon: AlertCircle,
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        subTextColor: 'text-orange-400',
    }
];

export default function PlatformRulesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Platform Rules</h1>
            </div>

            <div className="space-y-4">
                {rules.map((rule) => {
                    const Icon = rule.icon;
                    return (
                        <div 
                            key={rule.id} 
                            className={`p-6 rounded-[10px] border ${rule.bgColor} ${rule.borderColor} flex flex-col gap-2 transition-all hover:shadow-sm`}
                        >
                            <Icon className={`w-5 h-5 ${rule.textColor}`} />
                            <h3 className={`font-bold text-sm ${rule.textColor}`}>
                                {rule.title}
                            </h3>
                            <p className={`text-xs font-medium ${rule.subTextColor}`}>
                                Severity: {rule.severity}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
