'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { useDeleteDealMutation } from '@/redux/features/deals/dealsApi';

export default function DeleteDealModal({ deal, onClose, onSuccess }: { deal: { id: string, title: string }, onClose: () => void, onSuccess: () => void }) {
    const [deleteDeal, { isLoading }] = useDeleteDealMutation();

    const handleConfirm = async () => {
        try {
            await deleteDeal(deal.id).unwrap();
            toast.success("Deal deleted successfully!");
            onSuccess();
        } catch (error) {
            console.error("Deal deletion failed:", error);
            toast.error("Failed to delete deal.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-3">Delete Deal?</h2>
                    <p className="text-zinc-500 mb-8 leading-relaxed">
                        Are you sure you want to delete <strong className="text-zinc-800 font-semibold">"{deal.title}"</strong>? This action will permanently remove it from your deals.
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-3.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="flex-1 py-3.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all disabled:opacity-50"
                        >
                            {isLoading ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
