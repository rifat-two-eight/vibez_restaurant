'use client';

import React, { useRef } from 'react';
import { UploadCloud, Trash2, RefreshCw, Loader2, PlayCircle } from 'lucide-react';
import { toast } from "sonner";
import { useGetMyShortQuery, useUploadShortMutation, useDeleteShortMutation } from '@/redux/features/shorts/shortsApi';

export default function VideoPage() {
    const { data: response, isLoading } = useGetMyShortQuery({});
    const [uploadShort, { isLoading: isUploading }] = useUploadShortMutation();
    const [deleteShort, { isLoading: isDeleting }] = useDeleteShortMutation();
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const short = response?.data;

    // Use a fallback domain if NEXT_PUBLIC_API_URL doesn't perfectly strip
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://10.10.26.171:5055';

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            toast.error("Please select a valid video file.");
            return;
        }

        const formData = new FormData();
        formData.append('short', file);

        try {
            await uploadShort(formData).unwrap();
            toast.success("Video uploaded successfully!");
        } catch (error: any) {
            console.error("Upload failed:", error);
            const errorMessage = error?.data?.message || "Failed to upload video. Please try again.";
            toast.error(errorMessage);
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteShort({}).unwrap();
            toast.success("Video deleted successfully!");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete video.");
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Promotional Video</h1>
                <p className="text-zinc-500 text-sm mt-1">Upload a short video to showcase your restaurant and attract more customers.</p>
            </div>

            <div className="bg-white rounded-[10px] border border-zinc-100 p-8 shadow-sm">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
                    </div>
                ) : short && short.shortUrl ? (
                    <div className="space-y-8">
                        <div className="aspect-[9/16] max-w-[320px] mx-auto bg-black rounded-[20px] overflow-hidden relative shadow-2xl ring-4 ring-zinc-100">
                            <video 
                                src={`${baseUrl}${short.shortUrl}`}
                                controls
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading || isDeleting}
                                className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-700 font-semibold text-sm rounded-[10px] hover:bg-zinc-200 transition-colors disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                Update Video
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isUploading || isDeleting}
                                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-semibold text-sm rounded-[10px] hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete Video
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 px-4">
                        <div className="mx-auto w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                            <PlayCircle className="w-12 h-12 text-zinc-300" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">No video uploaded yet</h3>
                        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8">
                            Upload a captivating short video of your restaurant's ambiance, signature dishes, or happy customers. Recommended aspect ratio is 9:16 (vertical).
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="inline-flex items-center gap-2 bg-[#013622] text-white px-8 py-4 rounded-[10px] font-semibold hover:bg-[#012a1a] transition-all shadow-lg shadow-[#013622]/20 disabled:opacity-50 hover:-translate-y-0.5"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-5 h-5" />
                                    Upload Video
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                />
            </div>
        </div>
    );
}
