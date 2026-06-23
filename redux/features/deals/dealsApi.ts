import { baseApi } from "../../api/baseApi";

export const dealsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDeal: builder.mutation({
            query: (dealData) => ({
                url: '/deals',
                method: 'POST',
                body: dealData,
            }),
            invalidatesTags: ['Deal'],
        }),
        getMyDeals: builder.query({
            query: ({ page = 1, limit = 10 }) => `/deals/my-deals?page=${page}&limit=${limit}`,
            providesTags: ['Deal'],
        }),
        toggleDealStatus: builder.mutation({
            query: (id) => ({
                url: `/deals/${id}/toggle-status`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Deal'],
        }),
        updateDeal: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/deals/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Deal'],
        }),
        deleteDeal: builder.mutation({
            query: (id) => ({
                url: `/deals/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Deal'],
        }),
    }),
});

export const { useCreateDealMutation, useGetMyDealsQuery, useToggleDealStatusMutation, useUpdateDealMutation, useDeleteDealMutation } = dealsApi;
