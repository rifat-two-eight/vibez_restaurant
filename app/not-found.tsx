'use client';

import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../public/error.json';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
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
      
      <div className="mt-10">
        <Link
          href="/"
          className="rounded-full bg-[#CF0738] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg active:scale-95"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
