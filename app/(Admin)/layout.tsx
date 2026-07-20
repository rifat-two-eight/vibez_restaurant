'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { logOut } from '@/redux/features/auth/authSlice';
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    Tag,
    CalendarCheck,
    CreditCard,
    DollarSign,
    Ticket,
    GitBranch,
    BarChart3,
    ShieldAlert,
    Settings,
    LogOut,
    Wallet,
} from 'lucide-react';

const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/admin' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Restaurants', icon: UtensilsCrossed, href: '/admin/restaurants' },
    { name: 'Deals', icon: Tag, href: '/admin/deals' },
    { name: 'User Plans', icon: CreditCard, href: '/admin/user-plans' },
    { name: 'Referrals', icon: GitBranch, href: '/admin/referrals' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            {/* Fixed Sidebar — premium dark design */}
            <aside className="fixed top-0 left-0 h-screen bg-[#171717] border-r border-white/5 z-50 flex flex-col w-72">
                {/* Brand */}
                <div className="py-8 px-8 mb-4">
                    <h1 className="font-bold text-xl text-white tracking-wider">
                        ADMIN PANEL
                    </h1>
                </div>

                
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {[
                        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
                        { name: 'Referral & Affiliate System', icon: GitBranch, href: '/admin/referrals' },
                        { name: 'Withdraw Requests', icon: Wallet, href: '/admin/withdrawals' },
                        { name: 'Restaurants', icon: UtensilsCrossed, href: '/admin/restaurants' },
                        { name: 'Deals Management', icon: Tag, href: '/admin/deals' },
                        { name: 'Coupons Management', icon: Ticket, href: '/admin/coupons' },
                        { name: 'Subscription Management', icon: CreditCard, href: '/admin/user-plans' },
                        { name: 'Users', icon: Users, href: '/admin/users' },
                        { name: 'Settings', icon: Settings, href: '/admin/settings' },
                    ].map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? 'bg-[#1447E6] text-white shadow-lg shadow-[#1447E6]/20'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                                    <span className="font-medium text-[13px]">
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4">
                    <button
                        onClick={() => {
                            dispatch(logOut());
                            router.push('/login');
                        }}
                        className="flex items-center justify-center w-full py-3.5 rounded-xl bg-[#CF0738] text-white font-bold text-sm hover:bg-[#b00630] transition-all shadow-lg shadow-[#CF0738]/20"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 min-h-screen">
                <div className="p-8 md:p-12 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
