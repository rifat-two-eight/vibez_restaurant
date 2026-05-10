import Image from "next/image";

export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Choose",
            description: "Browse through hundreds of hand-picked top restaurants and pick your favorite cuisine.",
            image: "/phone1.png"
        },
        {
            number: "2",
            title: "Book",
            description: "Select a date and time that fits your schedule and book your table directly via the app.",
            image: "/phone2.png"
        },
        {
            number: "3",
            title: "Redeem",
            description: "Show your digital voucher at the restaurant and enjoy your exclusive NeoTaste benefit.",
            image: "/phone3.png"
        }
    ];

    return (
        <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#151C27] mb-4">How it works</h2>
                <p className="text-lg text-[#151C27] font-normal">
                    Getting your discount is as easy as 1, 2, 3.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center md:items-start text-center md:text-left group">
                        {/* Phone Image Container */}
                        <div className="relative mb-12 w-full flex justify-center">
                            <div className="relative">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={240}
                                    height={460}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex flex-col items-center md:items-start max-w-[280px] ms-0 md:ms-28">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CF0738] text-xl font-bold text-white mb-6 shadow-lg shadow-red-200">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-[#151C27] mb-4">
                                {step.title}
                            </h3>
                            <p className="text-zinc-600 leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}