import Image from "next/image";

export default function Hungry() {
    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-12 md:gap-0">
                {/* Image Section */}
                <div className="flex justify-center items-end w-full lg:w-1/2">

                    <div>
                        <Image
                            src="/hungry1.png"
                            alt="Hungry"
                            width={300}
                            height={700}
                            className="w-[200px] md:w-[300px] h-auto"
                        />
                    </div>
                    {/* Secondary Image/Logo positioning */}
                    <div className="-ml-5 md:-ml-8 mb-2 md:mb-3">
                        <Image
                            src="/hungry2.svg"
                            alt="Decorative"
                            width={200}
                            height={330}
                            className="w-[120px] md:w-[200px] h-auto"
                        />
                    </div>

                </div>

                {/* Text Content Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h2 className="font-bold text-4xl lg:text-5xl text-[#151C27]">
                        Hungry yet?
                    </h2>
                    <h2 className="font-bold text-4xl lg:text-5xl text-[#19E68C] mt-2">
                        Download Now.
                    </h2>
                    <p className="my-6 text-[#151C27] font-medium max-w-md leading-relaxed">
                        Join thousands of others and start your culinary adventure today.
                        Download the app and get your first deal in minutes.
                    </p>

                    {/* Download Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
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
            </div>
        </div>
    );
}