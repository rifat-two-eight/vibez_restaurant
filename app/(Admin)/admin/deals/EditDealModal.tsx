"use client";

import React, { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useUpdateDealMutation } from "@/redux/features/deals/dealsApi";

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

interface EditDealModalProps {
    deal: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditDealModal({ deal, onClose, onSuccess }: EditDealModalProps) {
    const [dealType, setDealType] = useState<DealType>(deal.dealType || DealType.TWO_FOR_ONE);
    
    // Type Parameters States
    const [twoForOneAppliesTo, setTwoForOneAppliesTo] = useState<TwoForOneCategory>(
        deal.twoForOne?.appliesTo || TwoForOneCategory.MAIN_COURSE
    );
    const [freeItemBuy, setFreeItemBuy] = useState<FreeItemBuy>(
        deal.freeItem?.buy || FreeItemBuy.MAIN_COURSE
    );
    const [freeItemGet, setFreeItemGet] = useState<FreeItemGet>(
        deal.freeItem?.get || FreeItemGet.DRINK
    );
    const [percentDiscountValue, setPercentDiscountValue] = useState<10 | 15 | 20 | 30>(
        deal.percentDiscount?.percentage || 10
    );
    const [percentDiscountAppliesTo, setPercentDiscountAppliesTo] = useState<PercentDiscountAppliesTo>(
        deal.percentDiscount?.appliesTo || PercentDiscountAppliesTo.ENTIRE_ORDER
    );
    const [percentDiscountCategory, setPercentDiscountCategory] = useState<PercentDiscountCategory>(
        deal.percentDiscount?.category || PercentDiscountCategory.MAIN_COURSE
    );
    const [fixedDiscountAmount, setFixedDiscountAmount] = useState<number>(
        deal.fixedDiscount?.amount || 10
    );
    const [fixedDiscountMinSpend, setFixedDiscountMinSpend] = useState<number>(
        deal.fixedDiscount?.minSpend || 0
    );

    // Schedule & Claim States
    const initialDays = Array.isArray(deal.day) ? deal.day : deal.day ? [deal.day] : [];
    const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(initialDays);
    const [mealTime, setMealTime] = useState<MealTimeType>(deal.mealTime || MealTimeType.DINNER);
    const [maxClaimsPerDay, setMaxClaimsPerDay] = useState<number>(deal.maxClaimsPerDay || 50);

    const [updateDeal, { isLoading }] = useUpdateDealMutation();

    const generateTitle = () => {
        switch (dealType) {
            case DealType.TWO_FOR_ONE:
                return `2 for 1 ${twoForOneAppliesTo.replace("_", " ")}`;
            case DealType.FREE_ITEM:
                return `Buy ${freeItemBuy.replace(/_/g, " ")}, Get Free ${freeItemGet.replace(/_/g, " ")}`;
            case DealType.PERCENT_DISCOUNT:
                return `${percentDiscountValue}% Off ${
                    percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY
                        ? percentDiscountCategory.replace("_", " ")
                        : "Entire Order"
                }`;
            case DealType.FIXED_DISCOUNT:
                return `CHF ${fixedDiscountAmount} Off (Min Spend CHF ${fixedDiscountMinSpend})`;
            default:
                return "New Deal";
        }
    };

    const formatEnumLabel = (str: string) => {
        return str
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedDays.length === 0) return toast.error("Please select at least one day");
        if (maxClaimsPerDay <= 0) return toast.error("Max claims per day must be at least 1");

        const payload: any = {
            id: deal._id,
            dealType,
            title: generateTitle(),
            description: deal.description || `Exclusive offer generated from dashboard.`,
            day: selectedDays,
            mealTime,
            maxClaimsPerDay,
        };

        if (dealType === DealType.TWO_FOR_ONE) {
            payload.twoForOne = { appliesTo: twoForOneAppliesTo };
            payload.freeItem = null;
            payload.percentDiscount = null;
            payload.fixedDiscount = null;
        } else if (dealType === DealType.FREE_ITEM) {
            payload.freeItem = { buy: freeItemBuy, get: freeItemGet };
            payload.twoForOne = null;
            payload.percentDiscount = null;
            payload.fixedDiscount = null;
        } else if (dealType === DealType.PERCENT_DISCOUNT) {
            payload.percentDiscount = {
                percentage: percentDiscountValue,
                appliesTo: percentDiscountAppliesTo,
                category: percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY ? percentDiscountCategory : undefined,
            };
            payload.twoForOne = null;
            payload.freeItem = null;
            payload.fixedDiscount = null;
        } else if (dealType === DealType.FIXED_DISCOUNT) {
            if (fixedDiscountMinSpend < 0 || fixedDiscountMinSpend > 100) {
                return toast.error("Minimum spending amount must be from CHF 0 to CHF 100");
            }
            if (fixedDiscountAmount < 10) {
                return toast.error("The minimum discount should be CHF 10.");
            }
            payload.fixedDiscount = {
                minSpend: fixedDiscountMinSpend,
                amount: fixedDiscountAmount,
            };
            payload.twoForOne = null;
            payload.freeItem = null;
            payload.percentDiscount = null;
        }

        try {
            await updateDeal(payload).unwrap();
            toast.success("Deal updated successfully!");
            onSuccess();
        } catch (error: any) {
            console.error("Deal update failed:", error);
            toast.error(error?.data?.message || "Failed to update deal.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#171717] border border-white/5 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/1">
                    <div>
                        <h2 className="text-lg font-bold text-white">Edit Deal Settings</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Modify deal mechanics, claimable schedule, and limits.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all border border-transparent hover:border-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Live Preview Card */}
                    <div className="p-4 bg-[#10B981]/5 border border-[#10B981]/25 rounded-xl">
                        <p className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Live Deal Title Preview</p>
                        <p className="text-lg font-black text-white mt-1.5">{generateTitle()}</p>
                    </div>

                    {/* Deal Type Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Deal Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { type: DealType.TWO_FOR_ONE, label: "2 for 1 Deal" },
                                { type: DealType.FREE_ITEM, label: "Free Item Deal" },
                                { type: DealType.PERCENT_DISCOUNT, label: "Percentage %" },
                                { type: DealType.FIXED_DISCOUNT, label: "Fixed Discount" },
                            ].map((opt) => (
                                <button
                                    key={opt.type}
                                    type="button"
                                    onClick={() => setDealType(opt.type)}
                                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-center ${
                                        dealType === opt.type
                                            ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981] shadow-lg shadow-[#10B981]/5"
                                            : "bg-white/3 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Deal Parameters */}
                    <div className="border-t border-white/5 pt-4 space-y-4">
                        {dealType === DealType.TWO_FOR_ONE && (
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">What does the deal apply to?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.values(TwoForOneCategory).map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setTwoForOneAppliesTo(cat)}
                                            className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                twoForOneAppliesTo === cat
                                                    ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                    : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            {formatEnumLabel(cat)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {dealType === DealType.FREE_ITEM && (
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">What does the customer buy?</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.values(FreeItemBuy).map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFreeItemBuy(cat)}
                                                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-left ${
                                                    freeItemBuy === cat
                                                        ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                        : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {formatEnumLabel(cat)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">What does the customer get free?</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.values(FreeItemGet).map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFreeItemGet(cat)}
                                                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                                                    freeItemGet === cat
                                                        ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                        : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {formatEnumLabel(cat)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {dealType === DealType.PERCENT_DISCOUNT && (
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Discount Percentage</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[10, 15, 20, 30].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setPercentDiscountValue(val as any)}
                                                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                                    percentDiscountValue === val
                                                        ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                        : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {val}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Applies to:</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.values(PercentDiscountAppliesTo).map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setPercentDiscountAppliesTo(cat)}
                                                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                    percentDiscountAppliesTo === cat
                                                        ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                        : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {formatEnumLabel(cat)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {percentDiscountAppliesTo === PercentDiscountAppliesTo.CATEGORY && (
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Category:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Object.values(PercentDiscountCategory).map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setPercentDiscountCategory(cat)}
                                                    className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all ${
                                                        percentDiscountCategory === cat
                                                            ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                            : "bg-white/3 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                                                    }`}
                                                >
                                                    {formatEnumLabel(cat)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {dealType === DealType.FIXED_DISCOUNT && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Minimum Spending Amount (CHF)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={fixedDiscountMinSpend}
                                        onChange={(e) => setFixedDiscountMinSpend(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                                        className="w-full py-3 px-4 rounded-xl bg-white/3 border border-white/5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                                        placeholder="Enter minimum spending (0 to 100)"
                                    />
                                    <p className="text-[10px] text-zinc-500">Allowed range: CHF 0 to CHF 100</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Fixed Discount Amount (CHF)</label>
                                    <input
                                        type="number"
                                        min="10"
                                        value={fixedDiscountAmount}
                                        onChange={(e) => setFixedDiscountAmount(Math.max(10, Number(e.target.value) || 10))}
                                        className="w-full py-3 px-4 rounded-xl bg-white/3 border border-white/5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                                        placeholder="Minimum CHF 10"
                                    />
                                    <p className="text-[10px] text-zinc-500">Must be CHF 10 or more</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Schedule & Limits */}
                    <div className="border-t border-white/5 pt-4 space-y-4">
                        {/* Days of Week */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Claimable Days</label>
                            <div className="grid grid-cols-4 gap-2">
                                {Object.values(DayOfWeek).map((d) => {
                                    const isSelected = selectedDays.includes(d);
                                    const label = d === "WEDNESDAY" ? "Wed" : d === "THURSDAY" ? "Thu" : formatEnumLabel(d).slice(0, 3);
                                    return (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    if (selectedDays.length > 1) {
                                                        setSelectedDays(selectedDays.filter((day) => day !== d));
                                                    } else {
                                                        toast.error("Please select at least one day.");
                                                    }
                                                } else {
                                                    setSelectedDays([...selectedDays, d]);
                                                }
                                            }}
                                            className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                                                isSelected
                                                    ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                                                    : "bg-white/3 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Meal Time */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Meal Time</label>
                                <select
                                    value={mealTime}
                                    onChange={(e) => setMealTime(e.target.value as MealTimeType)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all cursor-pointer"
                                >
                                    {Object.values(MealTimeType).map((m) => (
                                        <option key={m} value={m} className="bg-[#171717] text-white">
                                            {formatEnumLabel(m)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Max Claims */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Claims Limit</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={maxClaimsPerDay}
                                    onChange={(e) => setMaxClaimsPerDay(parseInt(e.target.value) || 0)}
                                    required
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-white/1 flex gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-[#10B981] text-white font-bold py-3.5 rounded-xl hover:bg-[#0da673] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/15 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-3.5 rounded-xl bg-white/3 border border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
