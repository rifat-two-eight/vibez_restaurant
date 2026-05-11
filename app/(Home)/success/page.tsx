import Image from "next/image";
import Link from "next/link";

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 pb-12">
            <div className="max-w-2xl w-full text-center">
                
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20">
                        <Image 
                            src="/success.svg" 
                            alt="Review in progress" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Status Subtitle */}
                <p className="text-[#8B5E3C] font-semibold tracking-[0.2em] text-[10px] md:text-lg mb-4 uppercase">
                    Review in progress
                </p>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#013622] mb-8">
                    Account Under Review
                </h1>

                {/* Content Card */}
                <div className="bg-white rounded-[14px] shadow-xl shadow-zinc-200/50 p-6 mb-8 border border-zinc-100">
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8">
                        Your restaurant registration has been received and is currently under review by our team. 
                        We are verifying your business details to ensure quality and authenticity on the platform.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Estimated Time Box */}
                        <div className="bg-[#FAE6EB] rounded-[16px] p-5 flex flex-col items-center justify-center">
                            <svg className="w-6 h-6 text-[#013622] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-[10px] font-bold text-[#151C27] opacity-60 uppercase tracking-wider mb-0.5">Estimated Time</p>
                            <p className="text-base font-bold text-[#005C2C]">Within 24 hours</p>
                        </div>

                        {/* Notification Info Box */}
                        <div className="bg-[#FAE6EB] rounded-[16px] p-5 flex flex-col items-center justify-center">
                            <svg className="w-6 h-6 text-[#013622] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <p className="text-[10px] font-bold text-[#151C27] opacity-60 uppercase tracking-wider mb-0.5">Notification Info</p>
                            <p className="text-[11px] md:text-xs font-medium text-zinc-500 leading-tight">
                                Email with dashboard access <br /> will be sent once approved.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <Link href="/" className="w-full md:w-auto px-8 py-3 bg-[#CF0738] text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-all text-center text-sm">
                        Back to Home
                    </Link>
                    <button className="w-full md:w-auto px-8 py-3 bg-white border border-[#CF0738] text-[#CF0738] font-bold rounded-full hover:bg-zinc-50 transition-all text-sm">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}