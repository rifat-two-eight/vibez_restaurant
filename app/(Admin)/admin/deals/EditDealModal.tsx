"use client";

import React, { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useUpdateDealMutation } from "@/redux/features/deals/dealsApi";

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
    const [title, setTitle] = useState(deal.title || "");
    const [maxClaimsPerDay, setMaxClaimsPerDay] = useState<number>(deal.maxClaimsPerDay || 0);
    const initialDays = Array.isArray(deal.day) ? deal.day : deal.day ? [deal.day] : [];
    const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(initialDays);
    const [mealTime, setMealTime] = useState<MealTimeType>(deal.mealTime || MealTimeType.DINNER);
    
    const [updateDeal, { isLoading }] = useUpdateDealMutation();

    const formatEnumLabel = (str: string) => {
        return str
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) return toast.error("Deal title is required");
        if (selectedDays.length === 0) return toast.error("Please select at least one day");
        if (maxClaimsPerDay <= 0) return toast.error("Max claims per day must be at least 1");

        try {
            await updateDeal({
                id: deal._id,
                title,
                maxClaimsPerDay,
                day: selectedDays,
                mealTime,
            }).unwrap();
            toast.success("Deal updated successfully!");
            onSuccess();
        } catch (error: any) {
            console.error("Deal update failed:", error);
            toast.error(error?.data?.message || "Failed to update deal.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#171717] border border-white/5 rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-lg font-bold text-white">Edit Deal</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Update title, claim days, meal slot and limit.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all border border-transparent hover:border-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Deal Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="Enter deal title"
                            />
                        </div>

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
                                                    ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981] shadow-lg shadow-[#10B981]/5"
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

                        {/* Save Button */}
                        <div className="pt-4 flex gap-3">
                            <button
                                type="submit"
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
                    </form>
                </div>
            </div>
        </div>
    );
}
