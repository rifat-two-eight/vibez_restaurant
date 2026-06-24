'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Save, Loader2, Building, ShieldCheck } from 'lucide-react';
import { toast } from "sonner";
import { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } from '@/redux/features/restaurant/restaurantApi';
import { useToggleAllStaffLoginMutation } from '@/redux/features/staff/staffApi';

export default function SettingsPage() {
    const { data: response, isLoading: isLoadingRestaurant } = useGetMyRestaurantQuery({});
    const [updateRestaurant, { isLoading: isUpdating }] = useUpdateMyRestaurantMutation();
    const [toggleAllStaff, { isLoading: isToggling }] = useToggleAllStaffLoginMutation();

    const restaurant = response?.data;
    
    // Manage local globalStaffLogin state visually.
    const [globalStaffLogin, setGlobalStaffLogin] = useState(true);

    const [form, setForm] = useState({
        restaurantName: '',
        restaurantDescription: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://10.10.26.171:5055';

    useEffect(() => {
        if (restaurant) {
            setForm({
                restaurantName: restaurant.restaurantName || '',
                restaurantDescription: restaurant.restaurantDescription || '',
                street: restaurant.restaurantAddress?.street || '',
                city: restaurant.restaurantAddress?.city || '',
                state: restaurant.restaurantAddress?.state || '',
                zipCode: restaurant.restaurantAddress?.zipCode || '',
                country: restaurant.restaurantAddress?.country || '',
            });
            if (restaurant.restaurantImage) {
                setImagePreview(`${baseUrl}${restaurant.restaurantImage}`);
            }
        }
    }, [restaurant, baseUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleToggleAllStaff = async (checked: boolean) => {
        try {
            await toggleAllStaff({ enable: checked }).unwrap();
            setGlobalStaffLogin(checked);
            toast.success(`Global staff login ${checked ? 'enabled' : 'disabled'} successfully.`);
        } catch (error) {
            console.error("Failed to toggle staff:", error);
            toast.error("Failed to update global staff login.");
        }
    };

    const handleSaveRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('restaurantName', form.restaurantName);
        formData.append('restaurantDescription', form.restaurantDescription);
        
        // Try appending address as a nested object string, standard for multer backends parsing JSON strings.
        formData.append('restaurantAddress', JSON.stringify({
            street: form.street,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode,
            country: form.country,
        }));

        if (imageFile) {
            formData.append('restaurantImage', imageFile);
        }

        try {
            await updateRestaurant(formData).unwrap();
            toast.success("Restaurant profile updated successfully!");
        } catch (error: any) {
            console.error("Update failed:", error);
            const errorMessage = error?.data?.message || "Failed to update restaurant profile.";
            toast.error(errorMessage);
        }
    };

    if (isLoadingRestaurant) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl pb-12">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage your restaurant profile and global configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Toggles & Quick Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#013622]/10 rounded-lg text-[#013622]">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-zinc-900">Security & Access</h2>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-t border-zinc-100">
                            <div className="pr-4">
                                <h3 className="text-sm font-semibold text-zinc-900">Global Staff Login</h3>
                                <p className="text-xs text-zinc-500 mt-1">Enable or disable portal access for all staff members at once.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={globalStaffLogin}
                                    onChange={(e) => handleToggleAllStaff(e.target.checked)}
                                    disabled={isToggling}
                                />
                                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#013622]"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profile Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSaveRestaurant} className="bg-white rounded-[10px] border border-zinc-100 p-8 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                            <div className="p-2 bg-[#013622]/10 rounded-lg text-[#013622]">
                                <Building className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-zinc-900">Restaurant Profile</h2>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-3">Restaurant Banner / Image</label>
                            <div className="flex items-start gap-6">
                                <div 
                                    className="w-40 h-40 rounded-2xl border-2 border-dashed border-zinc-200 overflow-hidden bg-zinc-50 flex flex-col items-center justify-center relative cursor-pointer hover:bg-zinc-100 transition-colors shrink-0"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
                                            <span className="text-xs text-zinc-500 font-medium text-center px-4">Click to upload</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2 pt-2">
                                    <p className="text-sm text-zinc-600">Upload a high-quality image of your restaurant's interior or signature dish.</p>
                                    <p className="text-xs text-zinc-400">Recommended size: 800x800px. Max size: 5MB.</p>
                                    {imagePreview && (
                                        <button 
                                            type="button" 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-sm text-[#013622] font-semibold hover:underline mt-2 inline-block"
                                        >
                                            Change Image
                                        </button>
                                    )}
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageChange} 
                                    accept="image/*" 
                                    className="hidden" 
                                />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Restaurant Name</label>
                                <input
                                    required
                                    value={form.restaurantName}
                                    onChange={e => setForm({ ...form, restaurantName: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Description</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={form.restaurantDescription}
                                    onChange={e => setForm({ ...form, restaurantDescription: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-2">Location</h3>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Street Address</label>
                                <input
                                    required
                                    value={form.street}
                                    onChange={e => setForm({ ...form, street: e.target.value })}
                                    className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">City</label>
                                    <input
                                        required
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">State</label>
                                    <input
                                        required
                                        value={form.state}
                                        onChange={e => setForm({ ...form, state: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">ZIP Code</label>
                                    <input
                                        required
                                        value={form.zipCode}
                                        onChange={e => setForm({ ...form, zipCode: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Country</label>
                                    <input
                                        required
                                        value={form.country}
                                        onChange={e => setForm({ ...form, country: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-zinc-100">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="flex items-center gap-2 bg-[#013622] text-white px-8 py-3 rounded-[10px] font-semibold hover:bg-[#012a1a] transition-all shadow-lg shadow-[#013622]/20 disabled:opacity-50"
                            >
                                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
