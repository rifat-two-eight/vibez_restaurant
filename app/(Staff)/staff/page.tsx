'use client';

import React from 'react';
import Link from 'next/link';

export default function StaffPlaceholder() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-12 rounded-[40px] shadow-xl border border-zinc-100 max-w-md w-full">
                <div className="w-20 h-20 bg-[#151C27] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#151C27]/20">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 mb-4">Staff Portal</h1>
                <p className="text-zinc-500 mb-8">Your daily operation tools are coming soon. Contact your manager for immediate assistance.</p>
                <Link href="/login" className="text-[#151C27] font-bold hover:underline transition-all">
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
