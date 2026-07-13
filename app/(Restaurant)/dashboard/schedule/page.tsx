'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Save, AlertCircle, Loader2, Clock } from 'lucide-react';
import { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } from '@/redux/features/restaurant/restaurantApi';
import { toast } from 'sonner';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type Slot = 'Lunch' | 'Dinner';

interface SlotTimes {
    openTime: string;
    closeTime: string;
}

interface DaySlotData {
    enabled: boolean;
    times: SlotTimes;
}

type DaySlotsState = Record<Day, Record<Slot, DaySlotData>>;

const ALL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_MAP: Record<string, Day> = {
    'MONDAY': 'Mon', 'TUESDAY': 'Tue', 'WEDNESDAY': 'Wed', 'THURSDAY': 'Thu', 'FRIDAY': 'Fri', 'SATURDAY': 'Sat', 'SUNDAY': 'Sun'
};
const DAY_REVERSE_MAP: Record<Day, string> = {
    'Mon': 'MONDAY', 'Tue': 'TUESDAY', 'Wed': 'WEDNESDAY', 'Thu': 'THURSDAY', 'Fri': 'FRIDAY', 'Sat': 'SATURDAY', 'Sun': 'SUNDAY'
};

const SLOT_DEFAULTS: Record<Slot, { apiType: string; openTime: string; closeTime: string }> = {
    'Lunch':  { apiType: 'LUNCH',  openTime: '11:00', closeTime: '15:00' },
    'Dinner': { apiType: 'DINNER', openTime: '17:00', closeTime: '22:00' },
};

const SLOT_NAMES: Slot[] = ['Lunch', 'Dinner'];

function createDefaultDaySlotsState(): DaySlotsState {
    const state: Partial<DaySlotsState> = {};
    ALL_DAYS.forEach(day => {
        state[day] = {
            Lunch: { enabled: false, times: { openTime: SLOT_DEFAULTS.Lunch.openTime, closeTime: SLOT_DEFAULTS.Lunch.closeTime } },
            Dinner: { enabled: false, times: { openTime: SLOT_DEFAULTS.Dinner.openTime, closeTime: SLOT_DEFAULTS.Dinner.closeTime } },
        };
    });
    return state as DaySlotsState;
}

function formatTime12h(time24: string, padHour = true): string {
    if (!time24 || !time24.includes(':')) return '';
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m)) return time24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    const hourStr = padHour ? hour.toString().padStart(2, '0') : hour.toString();
    return `${hourStr}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function isValid24hTime(time: string): boolean {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time);
}

export default function SchedulePage() {
    const { data: restaurantRes, isLoading: isFetching } = useGetMyRestaurantQuery({});
    const [updateMyRestaurant, { isLoading: isUpdating }] = useUpdateMyRestaurantMutation();

    const [activeDay, setActiveDay] = useState<Day>('Mon');
    const [daySlots, setDaySlots] = useState<DaySlotsState>(createDefaultDaySlotsState);

    useEffect(() => {
        if (restaurantRes?.data?.restaurantOpenHours) {
            const openHours = restaurantRes.data.restaurantOpenHours;
            const newState = createDefaultDaySlotsState();
            let firstOpenDay: Day | null = null;

            openHours.forEach((oh: any) => {
                const uiDay = DAY_MAP[oh.day];
                if (uiDay && oh.isOpen) {
                    if (!firstOpenDay) firstOpenDay = uiDay;
                    oh.slots?.forEach((s: any) => {
                        if (s.type === 'LUNCH') {
                            newState[uiDay].Lunch = {
                                enabled: true,
                                times: { openTime: s.openTime || SLOT_DEFAULTS.Lunch.openTime, closeTime: s.closeTime || SLOT_DEFAULTS.Lunch.closeTime },
                            };
                        }
                        if (s.type === 'DINNER') {
                            newState[uiDay].Dinner = {
                                enabled: true,
                                times: { openTime: s.openTime || SLOT_DEFAULTS.Dinner.openTime, closeTime: s.closeTime || SLOT_DEFAULTS.Dinner.closeTime },
                            };
                        }
                    });
                }
            });

            setDaySlots(newState);
            setActiveDay(firstOpenDay || 'Mon');
        }
    }, [restaurantRes]);

    const toggleSlot = (day: Day, slot: Slot) => {
        setDaySlots(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [slot]: {
                    ...prev[day][slot],
                    enabled: !prev[day][slot].enabled,
                },
            },
        }));
    };

    const updateSlotTime = (day: Day, slot: Slot, field: 'openTime' | 'closeTime', value: string) => {
        setDaySlots(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [slot]: {
                    ...prev[day][slot],
                    times: {
                        ...prev[day][slot].times,
                        [field]: value,
                    },
                },
            },
        }));
    };

    const openDays = ALL_DAYS.filter(day => daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled);
    const daysValid = openDays.length >= 5;
    const slotsValid = true;
    const timesValid = openDays.every(day =>
        SLOT_NAMES.every(slot => {
            const data = daySlots[day][slot];
            if (!data.enabled) return true;
            return isValid24hTime(data.times.openTime) && isValid24hTime(data.times.closeTime);
        })
    );

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!daysValid || !timesValid) {
            toast.error("Please enter valid operating times in 24-hour format (e.g., 08:00, 22:30).");
            return;
        }

        const restaurantOpenHours = ALL_DAYS.map(dayStr => {
            const isOpen = openDays.includes(dayStr);
            const slotsToKeep = SLOT_NAMES
                .filter(slot => daySlots[dayStr][slot].enabled)
                .map(slot => ({
                    type: SLOT_DEFAULTS[slot].apiType,
                    openTime: daySlots[dayStr][slot].times.openTime,
                    closeTime: daySlots[dayStr][slot].times.closeTime,
                }));

            return {
                day: DAY_REVERSE_MAP[dayStr],
                isOpen,
                slots: slotsToKeep,
            };
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

    const enabledSlotsForActiveDay = activeDay ? SLOT_NAMES.filter(s => daySlots[activeDay][s].enabled).length : 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Weekly Schedule</h1>
                <p className="text-zinc-500 text-sm mt-1">Configure your individual daily operating hours and availability</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Working Days & Schedule Configuration */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900">Select Working Days & Configure Hours</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Choose at least 5 days (platform requirement). Click any day to configure its hours below.</p>
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                        {ALL_DAYS.map(day => {
                            const isCurrent = activeDay === day;
                            const hasActiveSlot = daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled;
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => setActiveDay(day)}
                                    className={`py-3 rounded-[10px] text-sm font-semibold border transition-all ${
                                        isCurrent
                                            ? 'ring-2 ring-[#013622] ring-offset-2 border-transparent'
                                            : ''
                                    } ${
                                        hasActiveSlot
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
                            Minimum 5 working days required (currently {openDays.length} selected)
                        </p>
                    )}
                </div>

                {/* Per-Day Time Slots */}
                {activeDay && (
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                            <div>
                                <h2 className="text-base font-bold text-zinc-900">Operating Slots & Hours for {DAY_REVERSE_MAP[activeDay]}</h2>
                                <p className="text-xs text-zinc-400 mt-0.5">Toggle and configure times for Lunch/Dinner slots</p>
                            </div>
                            {(daySlots[activeDay].Lunch.enabled || daySlots[activeDay].Dinner.enabled) ? (
                                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    Open
                                </span>
                            ) : (
                                <span className="bg-zinc-100 text-zinc-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    Closed
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {SLOT_NAMES.map(slotName => {
                                const slotData = daySlots[activeDay][slotName];
                                const isEnabled = slotData.enabled;
                                return (
                                    <div
                                        key={slotName}
                                        className={`rounded-[10px] border transition-all overflow-hidden bg-white ${
                                            isEnabled
                                                ? 'border-[#013622] bg-[#013622]/5'
                                                : 'border-zinc-200 hover:border-zinc-400'
                                        }`}
                                    >
                                        {/* Slot Toggle Header */}
                                        <button
                                            type="button"
                                            onClick={() => toggleSlot(activeDay, slotName)}
                                            className="flex items-center justify-between p-5 w-full text-left"
                                        >
                                            <div>
                                                <p className="text-sm font-bold text-zinc-900">{slotName}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    {isEnabled
                                                        ? `${slotData.times.openTime} – ${slotData.times.closeTime}`
                                                        : 'Tap to enable this slot'
                                                    }
                                                </p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                isEnabled ? 'border-[#013622]' : 'border-zinc-300'
                                            }`}>
                                                {isEnabled && <div className="w-2.5 h-2.5 rounded-full bg-[#013622]" />}
                                            </div>
                                        </button>

                                        {/* Time Pickers (expandable) */}
                                        {isEnabled && (
                                            <div className="px-5 pb-5 pt-0 border-t border-zinc-100">
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    {/* Open Time */}
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-2">
                                                            <Clock className="w-3 h-3" />
                                                            Opens at
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={slotData.times.openTime}
                                                            onChange={(e) => updateSlotTime(activeDay, slotName, 'openTime', e.target.value)}
                                                            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] transition-all"
                                                        />
                                                    </div>
                                                    {/* Close Time */}
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-2">
                                                            <Clock className="w-3 h-3" />
                                                            Closes at
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={slotData.times.closeTime}
                                                            onChange={(e) => updateSlotTime(activeDay, slotName, 'closeTime', e.target.value)}
                                                            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={!daysValid || !slotsValid || !timesValid || isUpdating}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all ${
                        daysValid && slotsValid && timesValid
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
                    <li>• You can set custom open and close times for Lunch and Dinner on each day</li>
                    <li>• Changes to your schedule will be reflected immediately</li>
                    <li>• Existing bookings won't be affected by schedule changes</li>
                </ul>
            </div>
        </div>
    );
}
