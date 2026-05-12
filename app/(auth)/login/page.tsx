'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'owner' | 'staff';

export default function LoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<Role>('owner');

    const roleConfigs = {
        admin: {
            title: 'Admin Portal',
            subtitle: 'Manage the entire Vibez ecosystem',
            color: '#CF0738',
            hoverColor: '#b00630',
            bgLight: 'bg-[#CF0738]/5'
        },
        owner: {
            title: 'Restaurant Owner',
            subtitle: 'Grow your business by joining our network',
            color: '#013622',
            hoverColor: '#012a1a',
            bgLight: 'bg-[#013622]/5'
        },
        staff: {
            title: 'Staff Portal',
            subtitle: 'Manage orders and daily operations',
            color: '#151C27',
            hoverColor: '#0a0e14',
            bgLight: 'bg-[#151C27]/5'
        }
    };

    const currentConfig = roleConfigs[selectedRole];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Redirect based on selected role
        if (selectedRole === 'owner') {
            router.push('/dashboard');
        } else if (selectedRole === 'admin') {
            router.push('/admin');
        } else if (selectedRole === 'staff') {
            router.push('/staff');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
            {/* Header / Brand */}
            <div className="text-center mb-12">
                <Link href="/">
                    <Image src="/logo.svg" alt="Vibez Logo" width={120} height={40} className="mx-auto mb-6" />
                </Link>
                <p className="text-zinc-500 max-w-md mx-auto">
                    A modern dining spot serving bold flavors and fusion dishes, perfect for casual hangouts and memorable meals.
                </p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-zinc-200 border border-zinc-100 overflow-hidden transition-all duration-500">
                <div className={`p-8 md:p-10 transition-colors duration-500 ${currentConfig.bgLight}`}>
                    
                    {/* Icon Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 shadow-inner"
                            style={{ backgroundColor: currentConfig.color }}
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {selectedRole === 'admin' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                ) : selectedRole === 'owner' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                )}
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Login</h2>
                        <p className="text-zinc-500 text-sm text-center px-6">
                            {currentConfig.subtitle}
                        </p>
                    </div>

                    {/* Role Selection Tabs */}
                    <div className="flex gap-2 mb-8 bg-white/50 p-1 rounded-2xl border border-zinc-100">
                        {(['admin', 'owner', 'staff'] as Role[]).map((role) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
                                    selectedRole === role
                                    ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                                    : "text-zinc-400 hover:text-zinc-600"
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': currentConfig.color } as any}
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': currentConfig.color } as any}
                            />
                        </div>
                        
                        <div className="flex justify-between items-center text-xs font-medium px-2">
                            <label className="flex items-center gap-2 cursor-pointer text-zinc-500">
                                <input type="checkbox" className="rounded-md border-zinc-200 text-[#013622]" />
                                Remember me
                            </label>
                            <a href="#" className="text-zinc-400 hover:text-zinc-600">Forgot Password?</a>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-[0.98] mt-6"
                            style={{ backgroundColor: currentConfig.color }}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-zinc-400">
                            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Back to Home Link */}
            <Link href="/" className="mt-8 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                Back to Home
            </Link>
        </div>
    );
}
