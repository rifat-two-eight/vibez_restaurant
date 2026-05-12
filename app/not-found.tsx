'use client';

import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../public/error.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center bg-white">
      <div className="w-full max-w-md">
        <Lottie 
          animationData={errorAnimation} 
          loop={true} 
          className="mx-auto w-64 h-64 sm:w-80 sm:h-80"
        />
      </div>
      
      <h2 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 text-lg text-zinc-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.back()}
          className="rounded-full border-2 border-zinc-200 px-8 py-3 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95"
        >
          Go Back
        </button>
        <Link
          href="/"
          className="rounded-full bg-[#CF0738] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg active:scale-95"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
