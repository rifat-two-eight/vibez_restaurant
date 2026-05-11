'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Partner() {
    const router = useRouter();
    const [openingDays, setOpeningDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    const [priceRange, setPriceRange] = useState('$$');

    const toggleDay = (day: string) => {
        setOpeningDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/success');
    };

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header Image */}
            <div className="relative max-w-6xl mx-auto rounded-[12px] overflow-hidden group mb-12 shadow-2xl">
                <Image
                    src="/partner.png"
                    alt="Partner"
                    width={1300}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, #01362266 40%, #01362200 100%)"
                    }}
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-[#CF0738] text-white text-[10px] md:text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Partner with us
                    </span>
                </div>
            </div>

            <div className='text-center mt-20 mb-12'>
                <h2 className='text-[#013622] font-bold text-4xl'>Grow Your Restaurant With Us </h2>
                <p className='text-[#36654D] text-lg mt-2'>Join our platform and attract more customers without extra marketing
                    costs.</p>
            </div>

            {/* Registration Form */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="p-8 md:p-12">

                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* Restaurant Information */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Restaurant Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Restaurant Name" placeholder="e.g. The Emerald Kitchen" />
                                <FormInput label="Owner / Manager Name" placeholder="Full Name" />
                                <FormInput label="Email Address" placeholder="contact@restaurant.com" type="email" />
                                <FormInput label="Phone Number" placeholder="+1 (555) 000-0000" />
                                <FormInput label="Password" placeholder="Create a Password" type="password" />
                                <FormInput label="Confirm Password" placeholder="Confirm Password" type="password" />
                            </div>
                        </section>

                        {/* Business Details */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <FormInput label="Restaurant Address" placeholder="Street Address" />
                                </div>
                                <FormInput label="City" placeholder="City" />
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Type of Restaurant</label>
                                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all appearance-none cursor-pointer">
                                        <option>Restaurant</option>
                                        <option>Cafe</option>
                                        <option>Bar</option>
                                        <option>Bistro</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <FormInput label="Cuisine Type" placeholder="e.g. Italian, Chinese, Mixed" />
                                </div>
                            </div>
                        </section>

                        {/* Operational Details */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Operational Details</h2>
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight block">Opening Days</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${openingDays.includes(day)
                                                ? "bg-[#CF0738] text-white shadow-md"
                                                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Service Type</label>
                                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all cursor-pointer">
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                        <option>Breakfast</option>
                                        <option>All Day</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight block">Average Price Range</label>
                                    <div className="flex gap-2">
                                        {['$', '$$', '$$$', '$$$$'].map(range => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() => setPriceRange(range)}
                                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${priceRange === range
                                                    ? "bg-[#CF0738] text-white shadow-md"
                                                    : "bg-red-50 text-[#CF0738] hover:bg-red-100"
                                                    }`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Additional Info */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Additional Info</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Short Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all resize-none"
                                        placeholder="Tell us about your restaurant's story and specialty..."
                                    />
                                </div>
                                <FormInput label="Website / Social Media Link" placeholder="https://..." />
                            </div>
                        </section>

                        {/* Terms and Submit */}
                        <div className="space-y-8 pt-6">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5 rounded-md border-zinc-300 text-[#CF0738] focus:ring-[#CF0738] cursor-pointer" id="terms" />
                                <label htmlFor="terms" className="text-sm text-zinc-600">
                                    I agree to the <a href="/terms" className="text-[#013622] underline font-medium">Terms & Conditions</a> and <a href="/policy" className="text-[#013622] underline font-medium">Privacy Policy</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#CF0738] text-white font-bold py-4 rounded-xl shadow-xl hover:bg-red-700 transition-all transform active:scale-[0.98]"
                            >
                                Submit Partnership Request
                            </button>

                            <p className="text-center text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
                                © No Commission. No Hidden Fees.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function FormInput({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all"
            />
        </div>
    );
}