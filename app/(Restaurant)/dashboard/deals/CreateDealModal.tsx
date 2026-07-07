'use client';

import React, { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { toast } from "sonner";
import { useCreateDealMutation } from '@/redux/features/deals/dealsApi';

export enum DealType {
    TWO_FOR_ONE = "TWO_FOR_ONE",
    FREE_ITEM = "FREE_ITEM",
    PERCENT_DISCOUNT = "PERCENT_DISCOUNT",
    FIXED_DISCOUNT = "FIXED_DISCOUNT",
}

export enum TwoForOneCategory {
    MAIN_COURSE = "MAIN_COURSE",
    DRINKS = "DRINKS",
    DESSERTS = "DESSERTS",
    STARTERS = "STARTERS",
}

export enum FreeItemBuy {
    MAIN_COURSE = "MAIN_COURSE",
    MENU = "MENU",
    MAIN_COURSE_PLUS_DRINK = "MAIN_COURSE_PLUS_DRINK",
}

export enum FreeItemGet {
    DRINK = "DRINK",
    DESSERT = "DESSERT",
    STARTER = "STARTER",
}

export enum PercentDiscountAppliesTo {
    ENTIRE_ORDER = "ENTIRE_ORDER",
    CATEGORY = "CATEGORY",
}

export enum PercentDiscountCategory {
    MAIN_COURSE = "MAIN_COURSE",
    MENU = "MENU",
    DRINKS = "DRINKS",
}

export enum DayOfWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export enum MealTimeType {
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    ALL_DAY = "ALL_DAY",
}

type Props = {
    onClose: () => void;
    onSuccess: (newDeal: any) => void;
};

export default function CreateDealModal({ onClose, onSuccess }: Props) {
    const [step, setStep] = useState(1);
    const [createDeal, { isLoading }] = useCreateDealMutation();

    // Form State
    const [dealType, setDealType] = useState<DealType | null>(null);
    
    // Step 2 State
    const [twoForOneAppliesTo, setTwoForOneAppliesTo] = useState<TwoForOneCategory>(TwoForOneCategory.MAIN_COURSE);
    const [freeItemBuy, setFreeItemBuy] = useState<FreeItemBuy>(FreeItemBuy.MAIN_COURSE);
    const [freeItemGet, setFreeItemGet] = useState<FreeItemGet>(FreeItemGet.DRINK);
    const [percentDiscountValue, setPercentDiscountValue] = useState<10 | 15 | 20 | 30>(10);
    const [percentDiscountAppliesTo, setPercentDiscountAppliesTo] = useState<PercentDiscountAppliesTo>(PercentDiscountAppliesTo.ENTIRE_ORDER);
    const [percentDiscountCategory, setPercentDiscountCategory] = useState<PercentDiscountCategory>(PercentDiscountCategory.MAIN_COURSE);
    const [fixedDiscountAmount, setFixedDiscountAmount] = useState<number>(5);

    // Step 3 State
    const [day, setDay] = useState<DayOfWeek>(DayOfWeek.FRIDAY);
    const [mealTime, setMealTime] = useState<MealTimeType>(MealTimeType.DINNER);
    const [maxClaims, setMaxClaims] = useState(50);

    const generateTitle = () => {
        switch (dealType) {
            case DealType.TWO_FOR_ONE:
                return `2 for 1 ${twoForOneAppliesTo.replace('_', ' ')}`;
            case DealType.FREE_ITEM:
                return `Buy ${freeItemBuy.replace(/_/g, ' ')}, Get Free ${freeItemGet.replace(/_/g, ' ')}`;
            case DealType.PERCENT_DISCOUNT:
                return `${percentDiscountValue}% Off ${percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY ? percentDiscountCategory.replace('_', ' ') : 'Entire Order'}`;
            case DealType.FIXED_DISCOUNT:
                return `CHF${fixedDiscountAmount} Off`;
            default:
                return "New Deal";
        }
    };

    const handleNext = () => {
        if (step === 1 && dealType) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleSubmit = async () => {
        const payload: any = {
            dealType,
            title: generateTitle(),
            description: `Exclusive offer generated from dashboard.`,
            day,
            mealTime,
            maxClaimsPerDay: maxClaims,
            isActive: true,
        };

        if (dealType === DealType.TWO_FOR_ONE) {
            payload.twoForOne = { appliesTo: twoForOneAppliesTo };
        } else if (dealType === DealType.FREE_ITEM) {
            payload.freeItem = { buy: freeItemBuy, get: freeItemGet };
        } else if (dealType === DealType.PERCENT_DISCOUNT) {
            payload.percentDiscount = {
                percentage: percentDiscountValue,
                appliesTo: percentDiscountAppliesTo,
                category: percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY ? percentDiscountCategory : undefined
            };
        } else if (dealType === DealType.FIXED_DISCOUNT) {
            payload.fixedDiscount = { amount: fixedDiscountAmount };
        }

        try {
            const response = await createDeal(payload).unwrap();
            toast.success("Deal created successfully!");
            onSuccess(response.data);
        } catch (error) {
            console.error("Deal creation failed:", error);
            toast.error("Failed to create deal.");
        }
    };

    const formatEnumLabel = (str: string) => {
        return str.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
                    <div className="flex items-center gap-3">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="p-1 rounded-full hover:bg-zinc-200 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-zinc-600" />
                            </button>
                        )}
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900">
                                {step === 1 ? 'Step 1: Select Deal Type' : step === 2 ? 'Step 2: Deal Parameters' : 'Step 3: Schedule & Limits'}
                            </h2>
                            <p className="text-xs font-medium text-zinc-500">
                                {step === 1 ? 'Choose the core mechanic' : step === 2 ? 'Configure rules' : 'Set availability'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { type: DealType.TWO_FOR_ONE, icon: '🥇', label: '2 for 1 Deal' },
                                { type: DealType.FREE_ITEM, icon: '🎁', label: 'Free Item Deal' },
                                { type: DealType.PERCENT_DISCOUNT, icon: '💸', label: 'Percentage Discount' },
                                { type: DealType.FIXED_DISCOUNT, icon: '💰', label: 'Fixed Discount' },
                            ].map(opt => (
                                <button
                                    key={opt.type}
                                    onClick={() => {
                                        setDealType(opt.type);
                                        setStep(2);
                                    }}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                                        dealType === opt.type ? 'border-[#013622] bg-[#013622]/5' : 'border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50'
                                    }`}
                                >
                                    <span className="text-3xl">{opt.icon}</span>
                                    <span className="font-bold text-zinc-800 text-left">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            {dealType === DealType.TWO_FOR_ONE && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-zinc-800">What does the deal apply to?</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.values(TwoForOneCategory).map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setTwoForOneAppliesTo(cat)}
                                                className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                    twoForOneAppliesTo === cat ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                }`}
                                            >
                                                {formatEnumLabel(cat)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {dealType === DealType.FREE_ITEM && (
                                <>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-zinc-800">What does the customer need to buy?</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {Object.values(FreeItemBuy).map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFreeItemBuy(cat)}
                                                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                        freeItemBuy === cat ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    {formatEnumLabel(cat)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-zinc-800">What does the customer get for free?</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.values(FreeItemGet).map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFreeItemGet(cat)}
                                                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                        freeItemGet === cat ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    {formatEnumLabel(cat)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {dealType === DealType.PERCENT_DISCOUNT && (
                                <>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-zinc-800">Discount Percentage</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {[10, 15, 20, 30].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setPercentDiscountValue(val as any)}
                                                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                        percentDiscountValue === val ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    {val}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-zinc-800">Applies to:</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.values(PercentDiscountAppliesTo).map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setPercentDiscountAppliesTo(cat)}
                                                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                        percentDiscountAppliesTo === cat ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    {formatEnumLabel(cat)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY && (
                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-zinc-800">Select Category:</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {Object.values(PercentDiscountCategory).map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setPercentDiscountCategory(cat)}
                                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                                                            percentDiscountCategory === cat ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                        }`}
                                                    >
                                                        {formatEnumLabel(cat)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {dealType === DealType.FIXED_DISCOUNT && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-zinc-800">Fixed Discount Amount (CHF)</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[5, 10, 15, 20, 25, 30].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setFixedDiscountAmount(val)}
                                                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                    fixedDiscountAmount === val ? 'border-[#013622] bg-[#013622]/5 text-[#013622]' : 'border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                                                }`}
                                            >
                                                CHF {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-5">
                            <div className="p-4 bg-[#013622]/5 rounded-xl border border-[#013622]/20 mb-4">
                                <p className="text-sm font-bold text-[#013622]">Deal Title Preview</p>
                                <p className="text-xl font-black text-zinc-900 mt-1">{generateTitle()}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-zinc-800">Day of Week</label>
                                    <select value={day} onChange={e => setDay(e.target.value as DayOfWeek)} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#013622]">
                                        {Object.values(DayOfWeek).map(d => <option key={d} value={d}>{formatEnumLabel(d)}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-zinc-800">Meal Time</label>
                                    <select value={mealTime} onChange={e => setMealTime(e.target.value as MealTimeType)} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#013622]">
                                        {Object.values(MealTimeType).map(m => <option key={m} value={m}>{formatEnumLabel(m)}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-zinc-800">Max Claims Per Day</label>
                                <input type="number" min={1} value={maxClaims} onChange={e => setMaxClaims(parseInt(e.target.value))} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#013622]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-100 bg-white">
                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={step === 1 && !dealType}
                            className="w-full bg-[#013622] text-white font-bold rounded-xl py-4 shadow-lg hover:bg-[#012a1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-[#013622] text-white font-bold rounded-xl py-4 shadow-lg hover:bg-[#012a1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating Deal...' : 'Publish Deal'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
