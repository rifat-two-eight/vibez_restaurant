'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
} from 'lucide-react';

const menuItems = [
    { name: 'Overview',           icon: LayoutDashboard, href: '/admin' },
    { name: 'Users',              icon: Users,           href: '/admin/users' },
    { name: 'Restaurants',        icon: UtensilsCrossed, href: '/admin/restaurants' },
    { name: 'Deals',              icon: Tag,             href: '/admin/deals' },
    { name: 'Bookings',           icon: CalendarCheck,   href: '/admin/bookings' },
    { name: 'User Plans',         icon: CreditCard,      href: '/admin/user-plans' },
    { name: 'Restaurant Pricing', icon: DollarSign,      href: '/admin/pricing' },
    { name: 'Promo Codes',        icon: Ticket,          href: '/admin/promo-codes' },
    { name: 'Referrals',          icon: GitBranch,       href: '/admin/referrals' },
    { name: 'Reports',            icon: BarChart3,       href: '/admin/reports' },
    { name: 'Platform Rules',     icon: ShieldAlert,     href: '/admin/platform-rules' },
    { name: 'Settings',           icon: Settings,        href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router   = useRouter();

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Fixed Sidebar — same size/design as owner, red color scheme */}
            <aside className="fixed top-0 left-0 h-screen bg-white border-r border-zinc-100 z-50 flex flex-col w-80">
                {/* Brand */}
                <div className="h-20 flex items-center px-8 border-b border-zinc-200">
                    <span className="font-bold text-xl text-[#CF0738]">
                        Admin Panel
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon     = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all group ${
                                    isActive
                                        ? 'bg-[#CF0738] text-white shadow-lg shadow-[#CF0738]/20'
                                        : 'text-zinc-500 hover:bg-zinc-50 hover:text-[#CF0738]'
                                }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-[#CF0738]'}`} />
                                <span className="font-semibold text-base">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-zinc-200">
                    <button
                        onClick={() => router.push('/login')}
                        className="flex items-center gap-3 w-full px-6 py-4 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all group"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="font-semibold text-base">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 min-h-screen">
                <div className="p-8 md:p-12 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
