import { baseApi } from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubscriptionPlans: builder.query<any, void>({
            query: () => ({
                url: "/subscriptions/plans",
                method: "GET",
            }),
            providesTags: ["SubscriptionPlan"],
        }),
        getAdminSubscriptionStats: builder.query<any, void>({
            query: () => ({
                url: "/subscriptions/admin-stats",
                method: "GET",
            }),
            providesTags: ["SubscriptionPlan"],
        }),
        getAllUserSubscriptions: builder.query<any, { page?: number; limit?: number } | void>({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/user-subscriptions/admin/all?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["SubscriptionPlan"],
        }),
        createSubscriptionPlan: builder.mutation<any, any>({
            query: (data) => ({
                url: "/subscriptions/plans",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SubscriptionPlan"],
        }),
        updateSubscriptionPlan: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/subscriptions/plans/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["SubscriptionPlan"],
        }),
        deleteSubscriptionPlan: builder.mutation<any, string>({
            query: (id) => ({
                url: `/subscriptions/plans/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SubscriptionPlan"],
        }),
    }),
});

export const {
    useGetSubscriptionPlansQuery,
    useGetAdminSubscriptionStatsQuery,
    useGetAllUserSubscriptionsQuery,
    useCreateSubscriptionPlanMutation,
    useUpdateSubscriptionPlanMutation,
    useDeleteSubscriptionPlanMutation,
} = subscriptionApi;
