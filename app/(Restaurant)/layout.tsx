'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Tag,
    Users,
    CalendarCheck,
    CalendarDays,
    TrendingUp,
    BarChart3,
    Settings,
    ChevronLeft,
    LogOut
} from 'lucide-react';

export default function RestaurantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Deals', icon: Tag, href: '/dashboard/deals' },
        { name: 'Staff', icon: Users, href: '/dashboard/staff' },
        { name: 'Bookings', icon: CalendarCheck, href: '/dashboard/bookings' },
        { name: 'Schedule', icon: CalendarDays, href: '/dashboard/schedule' },
        { name: 'Performance', icon: TrendingUp, href: '/dashboard/performance' },
        { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Fixed Sidebar */}
            <aside
                className="fixed top-0 left-0 h-screen bg-white border-r border-zinc-100 z-50 flex flex-col w-80"
            >
                {/* Brand Logo */}
                <div className="h-20 flex items-center px-8 border-b border-zinc-50">
                    <span className="font-bold text-xl text-[#013622]">
                        Restaurant Dashboard
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all group ${isActive
                                        ? "bg-[#013622] text-white shadow-lg shadow-[#013622]/20"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-[#013622]"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-[#013622]'}`} />
                                <span className="font-semibold text-base">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-zinc-50">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-6 py-4 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all group">
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="font-semibold text-base">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content - Full Width */}
            <main className="flex-1 ml-80 min-h-screen">
                <div className="p-8 md:p-12 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
