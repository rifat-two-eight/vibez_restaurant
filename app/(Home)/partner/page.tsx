'use client';

import React, { useState, useRef } from 'react';
import Image from "next/image";
import Script from "next/script";
import { useRouter } from 'next/navigation';
import { useRegisterRestaurantMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { toast } from "sonner";

export default function Partner() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [openingDays, setOpeningDays] = useState<string[]>(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']);

    const autocompleteInputRef = useRef<HTMLInputElement>(null);
    const autocompleteInstance = useRef<any>(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');

    const [registerRestaurant, { isLoading }] = useRegisterRestaurantMutation();

    const initAutocomplete = () => {
        if ((window as any).google && autocompleteInputRef.current && !autocompleteInstance.current) {
            const autocomplete = new (window as any).google.maps.places.Autocomplete(autocompleteInputRef.current, {
                types: ['establishment']
            });
            
            autocompleteInstance.current = autocomplete;

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                if (place.name) {
                    setRestaurantName(place.name);
                }

                let streetNumber = '';
                let route = '';
                let locality = '';
                let stateName = '';
                let zip = '';
                let countryName = '';

                place.address_components?.forEach((component: { types: any; long_name: string; short_name: string; }) => {
                    const types = component.types;
                    if (types.includes('street_number')) streetNumber = component.long_name;
                    if (types.includes('route')) route = component.long_name;
                    if (types.includes('locality')) locality = component.long_name;
                    if (types.includes('postal_town') && !locality) locality = component.long_name;
                    if (types.includes('administrative_area_level_1')) stateName = component.short_name;
                    if (types.includes('postal_code')) zip = component.long_name;
                    if (types.includes('country')) countryName = component.long_name;
                });

                setStreet(`${streetNumber} ${route}`.trim() || place.name || '');
                if (locality) setCity(locality);
                if (stateName) setState(stateName);
                if (zip) setZipCode(zip);
                if (countryName) setCountry(countryName);

                if (place.editorial_summary && place.editorial_summary.overview) {
                    setRestaurantDescription(place.editorial_summary.overview);
                } else if (place.name && locality) {
                    // Fallback description if google doesn't provide one
                    setRestaurantDescription(`Welcome to ${place.name}, a premier dining destination located in the heart of ${locality}.`);
                }
            });
        }
    };

    React.useEffect(() => {
        // Try initializing in case the script is already loaded
        initAutocomplete();
    });

    const toggleDay = (day: string) => {
        setOpeningDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Build the JSON body as required by the API
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            phone: formData.get('phone'),
            restaurantName: formData.get('restaurantName'),
            restaurantDescription: formData.get('restaurantDescription'),
            restaurantType: formData.get('restaurantType'),
            cuisineType: formData.get('cuisineType'),
            restaurantWebsite: formData.get('restaurantWebsite'),
            restaurantAddress: {
                street: formData.get('street'),
                city: formData.get('city'),
                state: formData.get('state') || "NY", // fallback if not provided in form
                zipCode: formData.get('zipCode') || "10001",
                country: formData.get('country') || "USA"
            },
            restaurantOpenHours: openingDays.map(day => ({
                day,
                isOpen: true,
                openTime: "09:00",
                closeTime: "22:00",
                slots: [
                    {
                        type: formData.get('serviceType')?.toString().toUpperCase() || "LUNCH",
                        openTime: "12:00",
                        closeTime: "15:00"
                    }
                ]
            }))
        };

        const submissionData = new FormData();
        submissionData.append('body', JSON.stringify(payload));

        const profileImage = formData.get('profileImage') as File;
        const restaurantImage = formData.get('restaurantImage') as File;

        if (profileImage && profileImage.size > 0) {
            submissionData.append('profileImage', profileImage);
        }
        if (restaurantImage && restaurantImage.size > 0) {
            submissionData.append('restaurantImage', restaurantImage);
        }

        try {
            const response = await registerRestaurant(payload).unwrap();
            toast.success("Restaurant application submitted successfully!");

            if (response.data?.user && response.data?.accessToken) {
                dispatch(setUser({
                    user: response.data.user,
                    token: response.data.accessToken
                }));
            }
            router.push('/dashboard');
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDJXC1_hT7bYHo1qQU56OOAQTjz4FPq0Ks&libraries=places`}
                strategy="afterInteractive"
                onLoad={initAutocomplete}
            />
            {/* Header Image */}
            <div className="relative max-w-6xl mx-auto rounded-[12px] overflow-hidden group mb-12 shadow-2xl">
                <Image
                    src="/partner.png"
                    alt="Partner"
                    width={1300}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, #01362266 40%, #01362200 100%)"
                    }}
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-[#CF0738] text-white text-[10px] md:text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Partner with us
                    </span>
                </div>
            </div>

            <div className='text-center mt-20 mb-12'>
                <h2 className='text-[#013622] font-bold text-4xl'>Grow Your Restaurant With Us </h2>
                <p className='text-[#36654D] text-lg mt-2'>Join our platform and attract more customers without extra marketing
                    costs.</p>
            </div>

            {/* Registration Form */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="p-8 md:p-12">

                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* Restaurant Information */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Owner Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Owner / Manager Name" name="name" placeholder="Full Name" required />
                                <FormInput label="Email Address" name="email" placeholder="contact@restaurant.com" type="email" required />
                                <FormInput label="Phone Number" name="phone" placeholder="+1 (555) 000-0000" required />
                                <FormInput label="Password" name="password" placeholder="Create a Password" type="password" required />
                                <FormInput label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" type="password" required />
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Profile Image</label>
                                    <input type="file" name="profileImage" accept="image/*" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all" />
                                </div>
                            </div>
                        </section>

                        {/* Business Details */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Restaurant/Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Restaurant Name"
                                        name="restaurantName"
                                        placeholder="Start typing to search for your restaurant..."
                                        required
                                        value={restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        inputRef={autocompleteInputRef}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Short Description</label>
                                    <textarea
                                        name="restaurantDescription"
                                        rows={4}
                                        value={restaurantDescription}
                                        onChange={(e) => setRestaurantDescription(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all resize-none"
                                        placeholder="Tell us about your restaurant's story and specialty..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Restaurant Address"
                                        name="street"
                                        placeholder="Street Address"
                                        required
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </div>
                                <FormInput
                                    label="City"
                                    name="city"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <FormInput
                                    label="State/Province"
                                    name="state"
                                    placeholder="State"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                                <FormInput
                                    label="ZIP/Postal Code"
                                    name="zipCode"
                                    placeholder="ZIP Code"
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                                <FormInput
                                    label="Country"
                                    name="country"
                                    placeholder="Country"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Type of Restaurant</label>
                                    <select name="restaurantType" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all appearance-none cursor-pointer">
                                        <option value="RESTAURANT">Restaurant</option>
                                        <option value="CAFE">Cafe</option>
                                        <option value="NIGHT_CLUB">Night Club</option>
                                        <option value="STREET_FOOD">Street Food</option>
                                        <option value="BAKERY">Bakery</option>
                                        <option value="FINE_DINING">Fine Dining</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Cuisine Type</label>
                                        <select name="cuisineType" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all appearance-none cursor-pointer">
                                            <option value="ITALIAN">Italian</option>
                                            <option value="CHINESE">Chinese</option>
                                            <option value="JAPANESE">Japanese</option>
                                            <option value="INDIAN">Indian</option>
                                            <option value="THAI">Thai</option>
                                            <option value="FAST_FOOD">Fast Food</option>
                                            <option value="BBQ">BBQ</option>
                                            <option value="SEAFOOD">Seafood</option>
                                            <option value="VEGAN">Vegan</option>
                                            <option value="DESSERTS">Desserts</option>
                                            <option value="COFFEE_BAKERY">Coffee Bakery</option>
                                            <option value="LOCAL_FOOD">Local Food</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Restaurant Image</label>
                                    <input type="file" name="restaurantImage" accept="image/*" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all" />
                                </div>
                            </div>
                        </section>



                        {/* Operational Details */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Operational Details</h2>
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight block">Opening Days</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { label: 'Mon', value: 'MONDAY' },
                                        { label: 'Tue', value: 'TUESDAY' },
                                        { label: 'Wed', value: 'WEDNESDAY' },
                                        { label: 'Thu', value: 'THURSDAY' },
                                        { label: 'Fri', value: 'FRIDAY' },
                                        { label: 'Sat', value: 'SATURDAY' },
                                        { label: 'Sun', value: 'SUNDAY' }
                                    ].map(day => (
                                        <button
                                            key={day.value}
                                            type="button"
                                            onClick={() => toggleDay(day.value)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${openingDays.includes(day.value)
                                                ? "bg-[#CF0738] text-white shadow-md"
                                                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                                                }`}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Service Type</label>
                                    <select name="serviceType" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all cursor-pointer">
                                        <option value="LUNCH">Lunch</option>
                                        <option value="DINNER">Dinner</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Additional Info */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Additional Info</h2>
                            <div className="space-y-4">
                                <FormInput label="Website / Social Media Link" name="restaurantWebsite" placeholder="https://..." />
                            </div>
                        </section>

                        {/* Terms and Submit */}
                        <div className="space-y-8 pt-6">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5 rounded-md border-zinc-300 text-[#CF0738] focus:ring-[#CF0738] cursor-pointer" id="terms" required />
                                <label htmlFor="terms" className="text-sm text-zinc-600">
                                    I agree to the <a href="/terms" className="text-[#013622] underline font-medium">Terms & Conditions</a> and <a href="/policy" className="text-[#013622] underline font-medium">Privacy Policy</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#CF0738] text-white font-bold py-4 rounded-xl shadow-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                            >
                                {isLoading ? "Submitting..." : "Submit Partnership Request"}
                            </button>

                            <p className="text-center text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
                                © No Commission. No Hidden Fees.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function FormInput({ label, name, placeholder, type = "text", required = false, value, onChange, inputRef }: { label: string; name: string; placeholder: string; type?: string; required?: boolean; value?: string; onChange?: (e: any) => void; inputRef?: any }) {
    return (
        <div className="space-y-2">
            <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                ref={inputRef}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all"
            />
        </div>
    );
}