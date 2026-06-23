'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from "sonner";
import { useUpdateDealMutation } from '@/redux/features/deals/dealsApi';

export default function EditDealModal({ deal, onClose, onSuccess }: { deal: any, onClose: () => void, onSuccess: () => void }) {
    const [title, setTitle] = useState(deal.title || "");
    const [maxClaimsPerDay, setMaxClaimsPerDay] = useState<number>(deal.maxClaimsPerDay || 0);
    const [updateDeal, { isLoading }] = useUpdateDealMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateDeal({ id: deal._id, title, maxClaimsPerDay }).unwrap();
            toast.success("Deal updated successfully!");
            onSuccess();
        } catch (error) {
            console.error("Deal update failed:", error);
            toast.error("Failed to update deal.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <h2 className="text-xl font-bold text-zinc-900">Edit Deal</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Deal Title</label>
                            <input 
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#013622] focus:ring-1 focus:ring-[#013622] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Max Claims Per Day</label>
                            <input 
                                type="number"
                                min={1}
                                value={maxClaimsPerDay}
                                onChange={e => setMaxClaimsPerDay(parseInt(e.target.value) || 0)}
                                required
                                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#013622] focus:ring-1 focus:ring-[#013622] outline-none transition-all"
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#013622] text-white font-bold py-3.5 rounded-xl hover:bg-[#012a1a] transition-colors disabled:opacity-50"
                            >
                                {isLoading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
