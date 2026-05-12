'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminPlaceholder() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-12 rounded-[40px] shadow-xl border border-zinc-100 max-w-md w-full">
                <div className="w-20 h-20 bg-[#CF0738] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#CF0738]/20">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 mb-4">Admin Dashboard</h1>
                <p className="text-zinc-500 mb-8">This portal is currently under construction. Please check back later for full management tools.</p>
                <Link href="/login" className="text-[#CF0738] font-bold hover:underline transition-all">
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
