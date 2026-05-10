import React from 'react';

export default function Review() {
    const reviews = [
        {
            id: 1,
            name: "Sarah M.",
            location: "Berlin Explorer",
            text: "NeoTaste changed how I explore Berlin. Found so many hidden gems and saved nearly 100€ in my first month!",
        },
        {
            id: 2,
            name: "David L.",
            location: "Cologne Foodie",
            text: "As a student, this app is a lifesaver. High-quality food for a fraction of the price. The interface is super clean too.",
        },
        {
            id: 3,
            name: "Emma J.",
            location: "Hamburg Gourmet",
            text: "The best way to try new restaurants. We use it every Friday for our date nights. Highly recommended!",
        }
    ];

    return (
        <div className="container mx-auto px-4 mb-28">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#151C27]">Join 500k+ food lovers</h2>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-[#FAE6EB] rounded-[24px] p-8 flex flex-col justify-between h-full"
                    >
                        <div>
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-[#CF0738]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-[#151C27] text-lg font-medium leading-relaxed italic mb-8">
                                "{review.text}"
                            </p>
                        </div>

                        {/* Reviewer Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-[#CF0738]/10">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[#151C27] font-bold">{review.name}</h4>
                                <p className="text-zinc-500 text-sm">{review.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}