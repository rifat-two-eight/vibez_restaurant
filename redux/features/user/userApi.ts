import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        getUserActivitySummary: builder.query({
            query: (id) => `/users/${id}/activity-summary`,
            providesTags: ['User'],
        }),
        getUserReferrals: builder.query({
            query: ({ id, page = 1, limit = 5 }) => `/users/${id}/referrals?page=${page}&limit=${limit}`,
            providesTags: ['User'],
        }),
        getUserCommissions: builder.query({
            query: ({ id, page = 1, limit = 5 }) => `/users/${id}/commissions?page=${page}&limit=${limit}`,
            providesTags: ['User'],
        }),
        getUserWithdrawals: builder.query({
            query: ({ id, page = 1, limit = 5 }) => `/users/${id}/withdrawals?page=${page}&limit=${limit}`,
            providesTags: ['User'],
        }),
        getUserSubscriptions: builder.query({
            query: ({ id, page = 1, limit = 5 }) => `/users/${id}/subscriptions?page=${page}&limit=${limit}`,
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
    }),
});

export const {
    useGetUserStatsQuery,
    useGetAllUsersQuery,
    useGetUserActivityQuery,
    useGetUserActivitySummaryQuery,
    useGetUserReferralsQuery,
    useGetUserCommissionsQuery,
    useGetUserWithdrawalsQuery,
    useGetUserSubscriptionsQuery,
    useToggleUserStatusMutation,
    useUpdateUserMutation,
} = userApi;
