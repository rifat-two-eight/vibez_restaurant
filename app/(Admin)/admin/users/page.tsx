'use client';

import React, { useState } from 'react';

type Plan = 'Monthly' | 'Yearly' | '1 Day' | 'Free';
type UserStatus = 'Active' | 'Suspended';

type User = {
    id: number;
    name: string;
    email: string;
    plan: Plan;
    status: UserStatus;
    referralCode: string;
    joinedDate: string;
};

const planStyle: Record<Plan, string> = {
    Monthly: 'bg-pink-50 text-pink-600',
    Yearly:  'bg-amber-50 text-amber-600',
    '1 Day': 'bg-blue-50 text-blue-600',
    Free:    'bg-zinc-100 text-zinc-500',
};

const initialUsers: User[] = [
    { id: 1, name: 'John Doe',     email: 'john@example.com',    plan: 'Monthly', status: 'Active',    referralCode: 'J0123', joinedDate: '2026-01-15' },
    { id: 2, name: 'Jane Smith',   email: 'jane@example.com',    plan: 'Yearly',  status: 'Active',    referralCode: 'JS456', joinedDate: '2026-02-20' },
    { id: 3, name: 'Bob Wilson',   email: 'bob@example.com',     plan: '1 Day',   status: 'Active',    referralCode: 'BW789', joinedDate: '2026-03-10' },
    { id: 4, name: 'Alice Brown',  email: 'alice@example.com',   plan: 'Free',    status: 'Suspended', referralCode: 'AB812', joinedDate: '2026-01-05' },
    { id: 5, name: 'Charlie Davis',email: 'charlie@example.com', plan: 'Monthly', status: 'Active',    referralCode: 'CD345', joinedDate: '2026-04-01' },
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const toggleSuspend = (id: number) => {
        setUsers(us => us.map(u => u.id === id
            ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
            : u
        ));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Users</h1>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">User Name</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Email</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Subscription Plan</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Status</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Referral Code</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Joined Date</th>
                            <th className="text-left px-6 py-4 font-semibold text-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{u.name}</td>
                                <td className="px-6 py-4 text-zinc-500">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${planStyle[u.plan]}`}>
                                        {u.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                        u.status === 'Active'
                                            ? 'bg-[#CF0738] text-white'
                                            : 'bg-zinc-200 text-zinc-500'
                                    }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-zinc-500">{u.referralCode}</td>
                                <td className="px-6 py-4 text-zinc-500">{u.joinedDate}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => toggleSuspend(u.id)}
                                            className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors"
                                        >
                                            {u.status === 'Active' ? 'Suspend' : 'Unsuspend'}
                                        </button>
                                        <button className="text-xs font-semibold text-zinc-600 hover:text-[#CF0738] transition-colors">
                                            Reset
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
