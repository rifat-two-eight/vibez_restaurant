import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser, TUser } from "../features/auth/authSlice";

interface RefreshTokenResponse {
    data: {
        accessToken: string;
        user: TUser;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        let token = (getState() as RootState)?.auth?.token;
        if (!token && typeof window !== 'undefined') {
            token = localStorage.getItem('accessToken');
        }
        
        console.log("prepareHeaders - Token being used:", token);
        
        if (token && token !== "undefined" && token !== "null") {
            headers.set("Authorization", `Bearer ${token}`);
        } else {
            console.warn("prepareHeaders - No token available to send in headers!");
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    const isAuthEndpoint = typeof args === 'string' 
        ? args.includes('/auth/login') || args.includes('/auth/refresh-token')
        : args.url?.includes('/auth/login') || args.url?.includes('/auth/refresh-token');

    if ((result?.error?.status === 401 || result?.error?.status === 403) && !isAuthEndpoint) {
        const refreshResult = await baseQuery({ url: "/auth/refresh-token", method: "POST", credentials: "include" }, api, extraOptions);

        if (refreshResult.data && typeof refreshResult.data === "object" && "data" in refreshResult.data) {
            const backendData = (refreshResult.data as RefreshTokenResponse).data;
            const user = backendData.user;
            const accessToken = backendData.accessToken;
            if (user && accessToken) {
                api.dispatch(setUser({ user, token: accessToken }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
                if (typeof window !== 'undefined') window.location.href = '/login';
                return { error: { status: 401, data: "Session expired" } };
            }
        } else {
            api.dispatch(logOut());
            if (typeof window !== 'undefined') window.location.href = '/login';
            return { error: { status: 401, data: "Session expired" } };
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "BoostPack", "Settings", "IdentityVerification", "Category", "Dashboard", "Order", "Activity", "Dispute", "Payment", "Deal", "Short", "Restaurant", "Coupon", "Reservation"],
    endpoints: () => ({}),
});
