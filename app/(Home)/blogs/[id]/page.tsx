import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogDetail() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Centered and max-width 6xl, height 400px */}
            <div className="container mx-auto px-4 mt-20">
                <div className="relative w-full h-[400px] flex items-end max-w-6xl mx-auto rounded-none overflow-hidden">
                    <Image
                        src="/food.png"
                        alt="Blog Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#151C27]/90 via-[#151C27]/40 to-transparent" />

                    <div className="relative z-10 p-8 md:p-12 w-full">
                        <div className="max-w-4xl">
                            <span className="bg-white text-[#151C27] font-bold text-[10px] md:text-xs px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg">
                                Burgers
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                                The 5 best burger spots in Birmingham that you absolutely must try
                            </h1>
                            <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                                <span>10 min read</span>
                                <span>Nov 24, 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section - Max width 6xl, expanding full width */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    {/* Highlight Quote */}
                    <div className="border-l-4 border-[#CF0738] pl-8 mb-16 py-2">
                        <p className="text-zinc-500 text-xl md:text-2xl italic leading-relaxed">
                            Here are the 5 best restaurants in Stuttgart – with great deals on food, drinks, and much more. Read the blog now.
                        </p>
                    </div>

                    {/* Article Body - No internal max-w wrap */}
                    <div className="space-y-16">
                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">
                                1. Delhi-cious Indian Restaurant (halal)
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                Authentic Delhi street food meets a stylish, modern ambiance. At Delhi-cious, you can expect dishes like Butter Chicken Naan, Aloo Tikki Burger, and much more. Ideal for a relaxed evening with friends – also available for outdoor seating. Order two main courses, and the cheaper one is completely free with NeoTaste.
                            </p>
                        </article>

                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">
                                2. Yuícery Hospitalstraße
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                If your chain jumps between cogs while you’re pedaling, it’s often a sign of cable stretch. Most new bikes go through a “break-in” period where the shift cables settle into their housing.
                            </p>
                        </article>

                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">
                                3. Wilma Wunder Stuttgart
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                Rhythmic clicking can be hard to track down. It might be a loose pedal, a dry bottom bracket, or even just a cable end hitting your crank arm. Focus on when the sound happens—is it only when you’re pedaling hard?
                            </p>
                        </article>

                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">
                                4. BURREATOS
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                A tire that goes flat overnight but feels okay for a short ride has a “slow leak.” This is often a tiny piece of glass or wire embedded in the rubber that you can’t see at first glance.
                            </p>
                        </article>

                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">
                                5. The Whiskey Jar
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                A noisy, crunchy-sounding drivetrain is screaming for maintenance. Grime acts like sandpaper on your expensive components, wearing them down prematurely.
                            </p>
                        </article>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-24 pt-12 border-t border-zinc-100">
                        <div className="text-left space-y-2">
                            <p className="text-[10px] font-bold uppercase text-[#CF0738] tracking-widest">Previous Article</p>
                            <Link href="/blogs" className="flex items-center gap-2 group">
                                <svg className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                <span className="font-bold text-[#151C27] hover:text-[#CF0738] transition-colors">Winter Maintenance Tips</span>
                            </Link>
                        </div>
                        <div className="text-right space-y-2">
                            <p className="text-[10px] font-bold uppercase text-[#CF0738] tracking-widest">Next Article</p>
                            <Link href="/blogs" className="flex items-center gap-2 group justify-end">
                                <span className="font-bold text-[#151C27] hover:text-[#CF0738] transition-colors">Choosing the Right Chain Lube</span>
                                <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Also Read Section */}
                    <div className="mt-32">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-4xl font-bold text-[#013622]">Also read</h2>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-[#CF0738] text-white flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="group cursor-pointer overflow-hidden">
                                    <div className="relative w-full h-[180px] rounded-none overflow-hidden">
                                        <Image src="/food.png" alt="Read Also" fill className="object-cover transition-transform duration-500" />
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="text-xl font-bold text-[#151C27] group-hover:text-[#CF0738] transition-colors">
                                            Salted & Dried Berries From the Summer
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
