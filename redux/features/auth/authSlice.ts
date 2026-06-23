import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type UserRole = "ADMIN" | "RESTAURANT_OWNER" | "USER" | "STAFF";
export type StaffRole = "MANAGER" | "CASHIER" | "WAITER";

export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    staffRole?: StaffRole;
    restaurantId?: string | null;
    phone?: string;
    profileImage?: string;
    location?: {
        lat?: number;
        lng?: number;
    };
    language?: string;
    aboutme?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    isActive: boolean;
    isEmailVerified: boolean;
    isDeleted: boolean;
    isInfluencer?: boolean;
    lastLogin?: string;
    isNewUser?: boolean;
 
    subscriptionPlanId?: string | null;
    subscriptionEndDate?: string;
 
    balance?: number;
    commissionPercentage?: number;
    maxPayout?: number;
    commissionDuration?: number;
 
    favoriteCuisines?: string[];
    dietaryPreferences?: string[];
    referralCode?: string;
    referredBy?: string | null;
    stripeConnectedAccountId?: string;
    fcmTokens?: string[];
 
    enableStaffLogin?: boolean;
 
    createdAt: string;
    updatedAt: string;
};

type TAuthState = {
    user: null | TUser;
    token: null | string;
    redirectPath: string | null;
    justLoggedIn: boolean;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    redirectPath: null,
    justLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.justLoggedIn = true;
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
        },
        setRedirectPath: (state, action: PayloadAction<string | null>) => {
            state.redirectPath = action.payload;
        },
        clearJustLoggedIn: (state) => {
            state.justLoggedIn = false;
        },
    },
});

export const { setUser, logOut, setRedirectPath, clearJustLoggedIn } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
export const redirectPath = (state: RootState) => state.auth.redirectPath;
export const justLoggedIn = (state: RootState) => state.auth.justLoggedIn;
