import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-5xl font-extrabold text-start text-[#151C27]">
                        Discover more.
                    </h2>
                    <h2 className="text-5xl font-extrabold text-start text-[#CF0738]">
                        Pay less.
                    </h2>
                </div>

                <p className="text-start font-medium text-lg text-[#151C27] max-w-xl leading-relaxed">
                    Vibez is a 2-for-1 restaurant deals app in Zurich. Get exclusive offers like free starters, desserts, and exclusiv deals by selected restaurants.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
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

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-6 mb-20 relative overflow-visible">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">

                    {/* Layer 1: Background & Custom Dashed Border (Lowest Z) */}
                    <div
                        className="absolute inset-0 z-0 rounded-full animate-[spin_40s_linear_infinite]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='300' ry='300' stroke='%23000000' stroke-width='3' stroke-dasharray='1%2c 30' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"), radial-gradient(circle, #FCF1F4 0%, white 100%)`,
                            backgroundOrigin: 'border-box',
                        }}
                    />

                    {/* Layer 2: Rotating Balls (Middle Z) */}
                    <div className="absolute inset-0 z-20 animate-[spin_15s_linear_infinite]">
                        {/* Ball 1 - Top */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#CF0738] rounded-full shadow-lg shadow-[#CF0738]/40 border-2 border-white" />
                        {/* Ball 2 - Bottom */}
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#EAB308] rounded-full shadow-lg shadow-[#EAB308]/40 border-2 border-white" />
                    </div>

                    {/* Layer 3: Image Container (Highest Z) */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-8 sm:p-10">
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero2.png"
                                alt="NeoTaste App Preview"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}