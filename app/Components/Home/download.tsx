import React from 'react';
import Image from 'next/image';

export default function Download() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-10">
                <h2 className="text-4xl md:text-5xl font-semibold text-[#013622] mb-4 tracking-tight leading-tight">
                    Download The VIBEZ App
                </h2>
                <p className="text-[#36654D] text-lg md:text-xl">
                    Register and start ordering in less than 2 minutes.
                </p>
            </div>

            {/* App Screen Showcase */}
            <div className="relative w-full max-w-[850px] mx-auto mb-12 aspect-[4/3.2] flex justify-center items-center">
                <Image
                    src="/phone.png"
                    alt="VIBEZ App on phones"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
                {/* App Store */}
                <a href="/" className="flex items-center gap-3 bg-[#151C27] text-white px-6 py-3 rounded-xl shadow-lg">
                    <Image src="/apple.svg" alt="Apple Store" width={20} height={20} />
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-medium opacity-80 leading-none">Download on the</p>
                        <p className="text-md font-semibold leading-tight">App Store</p>
                    </div>
                </a>

                {/* Google Play */}
                <a href="/" className="flex items-center gap-3 bg-[#151C27] text-white px-6 py-3 rounded-xl shadow-lg">
                    <Image src="/playstore.svg" alt="Google Play" width={20} height={20} />
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-medium opacity-80 leading-none">Get it on</p>
                        <p className="text-md font-semibold leading-tight">Google Play</p>
                    </div>
                </a>
            </div>
        </div>
    );
}
