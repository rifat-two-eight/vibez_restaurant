'use client';

import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type Slot = 'Lunch' | 'Dinner';

const ALL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS: { name: Slot; hours: string }[] = [
    { name: 'Lunch',  hours: '11:00 AM – 3:00 PM' },
    { name: 'Dinner', hours: '5:00 PM – 10:00 PM' },
];

export default function SchedulePage() {
    const [selectedDays, setSelectedDays] = useState<Day[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
    const [saved, setSaved] = useState(false);

    const toggleDay = (day: Day) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
        setSaved(false);
    };

    const toggleSlot = (slot: Slot) => {
        setSelectedSlots(prev =>
            prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
        );
        setSaved(false);
    };

    const daysValid = selectedDays.length >= 5;
    const slotsValid = selectedSlots.length >= 1;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (daysValid && slotsValid) setSaved(true);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Weekly Schedule</h1>
                <p className="text-zinc-500 text-sm mt-1">Configure your restaurant's operating hours and availability</p>
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

                {/* Time Slots */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900">Set Time Slots</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Select at least one time slot</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TIME_SLOTS.map(slot => {
                            const active = selectedSlots.includes(slot.name);
                            return (
                                <button
                                    key={slot.name}
                                    type="button"
                                    onClick={() => toggleSlot(slot.name)}
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

                    {!slotsValid && (
                        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            At least one time slot required
                        </p>
                    )}
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={!daysValid || !slotsValid}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all ${
                        daysValid && slotsValid
                            ? 'bg-[#013622] text-white hover:bg-[#012a1a] shadow-lg shadow-[#013622]/20'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    }`}
                >
                    <Save className="w-4 h-4" />
                    Save Schedule
                </button>

                {saved && (
                    <p className="text-sm text-emerald-600 font-medium">
                        ✓ Schedule saved successfully.
                    </p>
                )}
            </form>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-100 rounded-[10px] p-6">
                <h3 className="text-sm font-bold text-blue-800 mb-3">Schedule Guidelines</h3>
                <ul className="space-y-1.5 text-xs text-blue-700">
                    <li>• Your schedule must include at least 5 working days</li>
                    <li>• You must offer deals during lunch, dinner, or both</li>
                    <li>• Changes to your schedule will be reflected immediately</li>
                    <li>• Existing bookings won't be affected by schedule changes</li>
                </ul>
            </div>
        </div>
    );
}
