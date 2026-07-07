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
        getAllUserSubscriptions: builder.query({
            query: () => '/user-subscriptions/admin/all',
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
        getAllWithdrawals: builder.query({
            query: () => '/withdrawals/all',
            providesTags: ['Dashboard'],
        }),
        approveWithdrawal: builder.mutation({
            query: (id) => ({
                url: `/withdrawals/${id}/approve`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['Dashboard'],
        }),
        rejectWithdrawal: builder.mutation({
            query: (id) => ({
                url: `/withdrawals/${id}/reject`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['Dashboard'],
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
        getUserStats: builder.query({
            query: () => '/users/stats',
            providesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: ['User'],
        }),
        getUserActivity: builder.query({
            query: (id) => `/users/${id}/activity`,
            providesTags: ['User'],
        }),
        toggleUserStatus: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/toggle-status`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/${id}/edit`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['User'],
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
    useGetAllUserSubscriptionsQuery,
    useGetAffiliateDashboardStatsQuery,
    useGetMonthlyCommissionGraphQuery,
    useGetAllWithdrawalsQuery,
    useApproveWithdrawalMutation,
    useRejectWithdrawalMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation,
    useGetUserStatsQuery,
    useGetAllUsersQuery,
    useGetUserActivityQuery,
    useToggleUserStatusMutation,
    useUpdateUserMutation,
    useGetRestaurantStatsQuery,
    useGetRestaurantBookingsPerDayQuery,
    useGetRestaurantLunchVsDinnerQuery,
    useGetRestaurantOverviewQuery,
    useGetRestaurantInsightsQuery,
    useGetRestaurantRealtimeStatsQuery
} = dashboardApi;
