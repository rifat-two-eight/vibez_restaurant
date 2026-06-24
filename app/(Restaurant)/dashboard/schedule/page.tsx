'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Loader2 } from 'lucide-react';
import { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } from '@/redux/features/restaurant/restaurantApi';
import { toast } from 'sonner';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type Slot = 'Lunch' | 'Dinner';

const ALL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_MAP: Record<string, Day> = {
    'MONDAY': 'Mon', 'TUESDAY': 'Tue', 'WEDNESDAY': 'Wed', 'THURSDAY': 'Thu', 'FRIDAY': 'Fri', 'SATURDAY': 'Sat', 'SUNDAY': 'Sun'
};
const DAY_REVERSE_MAP: Record<Day, string> = {
    'Mon': 'MONDAY', 'Tue': 'TUESDAY', 'Wed': 'WEDNESDAY', 'Thu': 'THURSDAY', 'Fri': 'FRIDAY', 'Sat': 'SATURDAY', 'Sun': 'SUNDAY'
};

const TIME_SLOTS: { name: Slot; hours: string; apiType: string; openTime: string; closeTime: string }[] = [
    { name: 'Lunch',  hours: '11:00 AM – 3:00 PM', apiType: 'LUNCH', openTime: '11:00', closeTime: '15:00' },
    { name: 'Dinner', hours: '5:00 PM – 10:00 PM', apiType: 'DINNER', openTime: '17:00', closeTime: '22:00' },
];

export default function SchedulePage() {
    const { data: restaurantRes, isLoading: isFetching } = useGetMyRestaurantQuery({});
    const [updateMyRestaurant, { isLoading: isUpdating }] = useUpdateMyRestaurantMutation();

    const [selectedDays, setSelectedDays] = useState<Day[]>([]);
    const [activeDay, setActiveDay] = useState<Day | null>(null);
    const [slotsPerDay, setSlotsPerDay] = useState<Record<Day, Slot[]>>({
        Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
    });

    useEffect(() => {
        if (restaurantRes?.data?.restaurantOpenHours) {
            const openHours = restaurantRes.data.restaurantOpenHours;
            const days: Day[] = [];
            const parsedSlots: Record<Day, Slot[]> = {
                Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
            };

            openHours.forEach((oh: any) => {
                const uiDay = DAY_MAP[oh.day];
                if (uiDay && oh.isOpen) {
                    days.push(uiDay);
                    oh.slots?.forEach((s: any) => {
                        if (s.type === 'LUNCH') parsedSlots[uiDay].push('Lunch');
                        if (s.type === 'DINNER') parsedSlots[uiDay].push('Dinner');
                    });
                }
            });

            setSelectedDays(days);
            setSlotsPerDay(parsedSlots);
            if (days.length > 0) setActiveDay(days[0]);
        }
    }, [restaurantRes]);

    const toggleDay = (day: Day) => {
        setSelectedDays(prev => {
            if (prev.includes(day)) {
                const newSelected = prev.filter(d => d !== day);
                if (activeDay === day) {
                    setActiveDay(newSelected.length > 0 ? newSelected[0] : null);
                }
                return newSelected;
            } else {
                if (prev.length === 0) setActiveDay(day);
                return [...prev, day];
            }
        });
    };

    const toggleSlot = (day: Day, slot: Slot) => {
        setSlotsPerDay(prev => {
            const currentSlots = prev[day];
            const newSlots = currentSlots.includes(slot)
                ? currentSlots.filter(s => s !== slot)
                : [...currentSlots, slot];
            return { ...prev, [day]: newSlots };
        });
    };

    const daysValid = selectedDays.length >= 5;
    const slotsValid = selectedDays.every(day => slotsPerDay[day].length >= 1);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!daysValid || !slotsValid) return;

        const restaurantOpenHours = selectedDays.map(dayStr => {
            const slotsToKeep = TIME_SLOTS.filter(ts => slotsPerDay[dayStr].includes(ts.name)).map(ts => ({
                type: ts.apiType,
                openTime: ts.openTime,
                closeTime: ts.closeTime
            }));

            return {
                day: DAY_REVERSE_MAP[dayStr],
                isOpen: true,
                slots: slotsToKeep
            };
        });

        // Add missing days as closed
        ALL_DAYS.forEach(dayStr => {
            if (!selectedDays.includes(dayStr)) {
                restaurantOpenHours.push({
                    day: DAY_REVERSE_MAP[dayStr],
                    isOpen: false,
                    slots: []
                });
            }
        });

        try {
            await updateMyRestaurant({ restaurantOpenHours }).unwrap();
            toast.success("Schedule saved successfully.");
        } catch (error: any) {
            console.error("Failed to update schedule:", error);
            toast.error(error?.data?.message || "Failed to save schedule.");
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Weekly Schedule</h1>
                <p className="text-zinc-500 text-sm mt-1">Configure your individual daily operating hours and availability</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Working Days */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900">Select Working Days</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Choose at least 5 days (platform requirement)</p>
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                        {ALL_DAYS.map(day => {
                            const active = selectedDays.includes(day);
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={`py-3 rounded-[10px] text-sm font-semibold border transition-all ${
                                        active
                                            ? 'bg-[#013622] text-white border-transparent shadow-sm'
                                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                                    }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {!daysValid && (
                        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Minimum 5 days required ({selectedDays.length}/5 selected)
                        </p>
                    )}
                </div>

                {/* Per-Day Time Slots via Tabs */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900">Set Time Slots</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Configure hours for your selected working days</p>
                    </div>

                    {selectedDays.length === 0 ? (
                        <p className="text-sm text-zinc-500 py-4 bg-zinc-50 rounded-lg px-4 border border-zinc-100 text-center">
                            Please select working days above to configure their time slots.
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {/* Tabs for selected days */}
                            <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-4">
                                {selectedDays.map(day => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => setActiveDay(day)}
                                        className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                                            activeDay === day
                                                ? 'bg-[#013622] text-white shadow-sm'
                                                : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100 border border-zinc-200'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>

                            {/* Time Slots for activeDay */}
                            {activeDay && selectedDays.includes(activeDay) && (
                                <div className="animate-in fade-in duration-200">
                                    <p className="text-sm font-bold text-[#013622] mb-3">Time Slots for {activeDay}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {TIME_SLOTS.map(slot => {
                                            const active = slotsPerDay[activeDay].includes(slot.name);
                                            return (
                                                <button
                                                    key={slot.name}
                                                    type="button"
                                                    onClick={() => toggleSlot(activeDay, slot.name)}
                                                    className={`flex items-center justify-between p-5 rounded-[10px] border text-left transition-all ${
                                                        active
                                                            ? 'border-[#013622] bg-[#013622]/5'
                                                            : 'border-zinc-200 hover:border-zinc-400'
                                                    }`}
                                                >
                                                    <div>
                                                        <p className="text-sm font-bold text-zinc-900">{slot.name}</p>
                                                        <p className="text-xs text-zinc-400 mt-0.5">{slot.hours}</p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        active ? 'border-[#013622]' : 'border-zinc-300'
                                                    }`}>
                                                        {active && <div className="w-2.5 h-2.5 rounded-full bg-[#013622]" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    {slotsPerDay[activeDay].length === 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-4">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            Please select at least one slot for {activeDay}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Validation Warnings for entire form */}
                {!slotsValid && selectedDays.length > 0 && (
                    <p className="flex items-center gap-1.5 text-sm text-red-500 font-medium">
                        <AlertCircle className="w-4 h-4" />
                        Please make sure every selected working day has at least one time slot.
                    </p>
                )}

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={!daysValid || !slotsValid || isUpdating}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all ${
                        daysValid && slotsValid
                            ? 'bg-[#013622] text-white hover:bg-[#012a1a] shadow-lg shadow-[#013622]/20'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    }`}
                >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Schedule
                </button>
            </form>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-100 rounded-[10px] p-6">
                <h3 className="text-sm font-bold text-blue-800 mb-3">Schedule Guidelines</h3>
                <ul className="space-y-1.5 text-xs text-blue-700">
                    <li>• Your schedule must include at least 5 open working days</li>
                    <li>• Use the tabs in the Time Slots section to configure hours for each day independently</li>
                    <li>• Changes to your schedule will be reflected immediately</li>
                    <li>• Existing bookings won't be affected by schedule changes</li>
                </ul>
            </div>
        </div>
    );
}
