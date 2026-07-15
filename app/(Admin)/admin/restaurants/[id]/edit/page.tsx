"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, Save, X, Image as ImageIcon } from "lucide-react";
import { useGetRestaurantByIdQuery, useUpdateRestaurantByAdminMutation } from "@/redux/features/admin/adminRestaurantApi";
import { getImageUrl } from "@/lib/utils";
import { toast } from "sonner";
import Swal from "sweetalert2";

const RESTAURANT_TYPES = [
    { label: "Restaurant", value: "RESTAURANT" },
    { label: "Cafe", value: "CAFE" },
    { label: "Night Club", value: "NIGHT_CLUB" },
    { label: "Street Food", value: "STREET_FOOD" },
    { label: "Bakery", value: "BAKERY" },
    { label: "Fine Dining", value: "FINE_DINING" },
];

const CUISINE_TYPES = [
    { label: "Italian", value: "ITALIAN" },
    { label: "Chinese", value: "CHINESE" },
    { label: "Japanese", value: "JAPANESE" },
    { label: "Indian", value: "INDIAN" },
    { label: "Thai", value: "THAI" },
    { label: "Fast Food", value: "FAST_FOOD" },
    { label: "BBQ", value: "BBQ" },
    { label: "Seafood", value: "SEAFOOD" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Desserts", value: "DESSERTS" },
    { label: "Coffee & Bakery", value: "COFFEE_BAKERY" },
    { label: "Fine Dining", value: "FINE_DINING" },
    { label: "Local Food", value: "LOCAL_FOOD" },
];

export default function EditRestaurantPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const { data: restaurantRes, isLoading: isLoadingRestaurant, error } = useGetRestaurantByIdQuery(id);
    const [updateRestaurant, { isLoading: isUpdating }] = useUpdateRestaurantByAdminMutation();

    const restaurant = restaurantRes?.data;

    // Form states
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [restaurantType, setRestaurantType] = useState("RESTAURANT");
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [restaurantWebsite, setRestaurantWebsite] = useState("");

    // Address states
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    // Image states
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Pre-populate form when restaurant details load
    useEffect(() => {
        if (restaurant) {
            setRestaurantName(restaurant.restaurantName || "");
            setRestaurantDescription(restaurant.restaurantDescription || "");
            setRestaurantType(restaurant.restaurantType || "RESTAURANT");
            setSelectedCuisines(restaurant.cuisineType || []);
            setRestaurantWebsite(restaurant.restaurantWebsite || "");

            const addr = restaurant.restaurantAddress || {};
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setZipCode(addr.zipCode || "");
            setCountry(addr.country || "");

            if (restaurant.restaurantImage) {
                setImagePreview(getImageUrl(restaurant.restaurantImage));
            }
        }
    }, [restaurant]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const toggleCuisine = (cuisine: string) => {
        setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!restaurantName.trim()) return toast.error("Restaurant name is required");
        if (!restaurantDescription.trim()) return toast.error("Description is required");
        if (selectedCuisines.length === 0) return toast.error("Select at least one cuisine type");
        if (!street.trim() || !city.trim() || !zipCode.trim() || !country.trim()) {
            return toast.error("Complete address details are required");
        }

        try {
            const formData = new FormData();
            formData.append(
                "body",
                JSON.stringify({
                    restaurantName,
                    restaurantDescription,
                    restaurantType,
                    cuisineType: selectedCuisines,
                    restaurantWebsite,
                    restaurantAddress: {
                        street,
                        city,
                        state,
                        zipCode,
                        country,
                    },
                }),
            );

            if (imageFile) {
                formData.append("restaurantImage", imageFile);
            }

            const confirmResult = await Swal.fire({
                title: "Save Changes?",
                text: "Are you sure you want to update this restaurant's profile?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#10B981",
                cancelButtonColor: "#3f3f46",
                confirmButtonText: "Yes, save changes",
                background: "#171717",
                color: "#fff",
                customClass: {
                    popup: "border border-white/10 rounded-2xl",
                    confirmButton: "rounded-xl font-bold",
                    cancelButton: "rounded-xl font-bold bg-white/5 hover:bg-white/10",
                },
            });

            if (confirmResult.isConfirmed) {
                await updateRestaurant({ id, data: formData }).unwrap();
                toast.success("Restaurant profile updated successfully!");
                router.push("/admin/restaurants");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update restaurant profile");
        }
    };

    if (isLoadingRestaurant) {
        return (
            <div className="flex h-[500px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
                    <p className="text-zinc-400 animate-pulse text-sm">Loading restaurant settings...</p>
                </div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="flex flex-col h-[400px] items-center justify-center gap-4">
                <p className="text-zinc-400">Failed to load restaurant profile settings.</p>
                <button onClick={() => router.push("/admin/restaurants")} className="flex items-center gap-2 text-[#10B981] hover:underline text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.push("/admin/restaurants")} className="p-2 hover:bg-white/5 rounded-xl border border-white/5 transition-all text-zinc-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Edit Restaurant</h1>
                    <p className="text-zinc-500 text-sm mt-1">Modify info, description, cuisine types, address, and imagery.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Info Form */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-5">
                        <h3 className="text-base font-bold text-white mb-2">Primary Details</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Name</label>
                            <input
                                type="text"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="Enter restaurant name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Type</label>
                            <select value={restaurantType} onChange={(e) => setRestaurantType(e.target.value)} className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all">
                                {RESTAURANT_TYPES.map((opt) => (
                                    <option key={opt.value} value={opt.value} className="bg-[#171717] text-white">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Website URL (Optional)</label>
                            <input
                                type="text"
                                value={restaurantWebsite}
                                onChange={(e) => setRestaurantWebsite(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</label>
                            <textarea
                                value={restaurantDescription}
                                onChange={(e) => setRestaurantDescription(e.target.value)}
                                rows={5}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600 resize-none"
                                placeholder="Write a short summary about the restaurant..."
                            />
                        </div>
                    </div>

                    {/* Cuisine Types Picker */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <div className="mb-4">
                            <h3 className="text-base font-bold text-white">Cuisine Categories</h3>
                            <p className="text-xs text-zinc-500 mt-1">Select one or more culinary tags matching the menu.</p>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {CUISINE_TYPES.map((c) => {
                                const isSelected = selectedCuisines.includes(c.value);
                                return (
                                    <button
                                        type="button"
                                        key={c.value}
                                        onClick={() => toggleCuisine(c.value)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${isSelected ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981] shadow-lg shadow-[#10B981]/5" : "bg-white/3 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Image & Address */}
                <div className="space-y-6">
                    {/* Media Card */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white">Cover Image</h3>

                        <div className="relative group aspect-video rounded-xl bg-white/3 border border-dashed border-white/10 overflow-hidden flex items-center justify-center">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1.5">
                                            <Upload className="w-3.5 h-3.5" />
                                            Change Photo
                                            <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center justify-center p-6 space-y-2 text-zinc-500 hover:text-white transition-all">
                                    <ImageIcon className="w-8 h-8 stroke-1" />
                                    <span className="text-xs font-medium">Click to upload photo</span>
                                    <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                                </label>
                            )}
                        </div>
                        {/* <p className="text-[10px] text-zinc-500 text-center">Suggested resolution: 1280x720. WebP/JPEG formats supported.</p> */}
                    </div>

                    {/* Address Fields */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white">Address Details</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Street Address</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="123 Food Street"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Zurich"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">State / Canton</label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Zurich"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Zip Code</label>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="8000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Country</label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Switzerland"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
                        <button type="submit" disabled={isUpdating} className="w-full py-3.5 rounded-xl bg-[#10B981] hover:bg-[#0da673] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isUpdating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                        <button type="button" onClick={() => router.push("/admin/restaurants")} disabled={isUpdating} className="w-full py-3.5 rounded-xl bg-white/3 border border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-bold transition-all disabled:opacity-50">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
