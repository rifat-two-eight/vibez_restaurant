import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminDashboardStats: builder.query({
            query: () => '/dashboard/stats',
            providesTags: ['Dashboard'],
        }),
        getRevenueBreakdown: builder.query({
            query: () => '/user-subscriptions/admin/revenue-breakdown',
            providesTags: ['Dashboard'],
        }),
        getAffiliateDashboardStats: builder.query({
            query: () => '/dashboard/affiliate-stats',
            providesTags: ['Dashboard'],
        }),
        getMonthlyCommissionGraph: builder.query({
            query: () => '/user-subscriptions/admin/monthly-commission-graph',
            providesTags: ['Dashboard'],
        }),
        getWithdrawalStats: builder.query<any, void>({
            query: () => "/withdrawals/stats",
            providesTags: ["Dashboard", "Withdrawal"],
        }),
        getAllWithdrawals: builder.query<any, { status?: string; page?: number; limit?: number } | void>({
            query: (params) => {
                const searchParams = new URLSearchParams();
                if (params && params.status && params.status !== "ALL") searchParams.append("status", params.status);
                if (params && params.page) searchParams.append("page", params.page.toString());
                if (params && params.limit) searchParams.append("limit", params.limit.toString());
                const queryString = searchParams.toString();
                return `/withdrawals/all${queryString ? `?${queryString}` : ""}`;
            },
            providesTags: ["Dashboard", "Withdrawal"],
        }),
        approveWithdrawal: builder.mutation<any, string>({
            query: (id) => ({
                url: `/withdrawals/${id}/approve`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Dashboard", "Withdrawal"],
        }),
        rejectWithdrawal: builder.mutation<any, string | { id: string; adminFeedback?: string }>({
            query: (arg) => {
                const id = typeof arg === "string" ? arg : arg.id;
                const adminFeedback = typeof arg === "string" ? undefined : arg.adminFeedback;
                return {
                    url: `/withdrawals/${id}/reject`,
                    method: "PATCH",
                    body: { adminFeedback },
                };
            },
            invalidatesTags: ["Dashboard", "Withdrawal"],
        }),
        getSettings: builder.query({
            query: () => '/settings',
            providesTags: ['Settings'],
        }),
        updateSettings: builder.mutation({
            query: (body) => ({
                url: '/settings',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Settings'],
        }),
        getRestaurantStats: builder.query({
            query: () => '/dashboard/restaurant-stats',
            providesTags: ['Dashboard'],
        }),
        getRestaurantBookingsPerDay: builder.query({
            query: () => '/dashboard/restaurant-bookings-per-day',
            providesTags: ['Dashboard'],
        }),
        getRestaurantLunchVsDinner: builder.query({
            query: () => '/dashboard/restaurant-lunch-vs-dinner',
            providesTags: ['Dashboard'],
        }),
        getRestaurantOverview: builder.query({
            query: () => '/dashboard/restaurant-overview',
            providesTags: ['Dashboard'],
        }),
        getRestaurantInsights: builder.query({
            query: () => '/dashboard/restaurant-insights',
            providesTags: ['Dashboard'],
        }),
        getRestaurantRealtimeStats: builder.query({
            query: () => '/dashboard/restaurant-realtime-stats',
            providesTags: ['Dashboard'],
        }),
    }),
});

export const { 
    useGetAdminDashboardStatsQuery, 
    useGetRevenueBreakdownQuery, 
    useGetAffiliateDashboardStatsQuery,
    useGetMonthlyCommissionGraphQuery,
    useGetWithdrawalStatsQuery,
    useGetAllWithdrawalsQuery,
    useApproveWithdrawalMutation,
    useRejectWithdrawalMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation,
    useGetRestaurantStatsQuery,
    useGetRestaurantBookingsPerDayQuery,
    useGetRestaurantLunchVsDinnerQuery,
    useGetRestaurantOverviewQuery,
    useGetRestaurantInsightsQuery,
    useGetRestaurantRealtimeStatsQuery
} = dashboardApi;
