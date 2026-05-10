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
                    NeoTaste is your culinary companion. Explore the best 
                    restaurants in your city and enjoy exclusive 2-for-1 deals or 
                    significant discounts on your next meal.
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
            <div className="w-full lg:w-1/2 flex justify-end mt-12 lg:mt-0">
                <div>
                    <Image 
                        src="/hero.png" 
                        alt="NeoTaste App Preview" 
                        width={600} 
                        height={600} 
                        priority
                    />
                </div>
            </div>
        </div>
    );
}