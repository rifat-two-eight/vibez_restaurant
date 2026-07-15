import { baseApi } from "../../api/baseApi";

export const adminRestaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminRestaurantStats: builder.query<any, void>({
            query: () => ({
                url: "/dashboard/admin-restaurant-stats",
                method: "GET",
            }),
            providesTags: ["AdminRestaurant"],
        }),
        getPendingRestaurants: builder.query<any, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/restaurants/admin/pending?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["AdminRestaurant"],
        }),
        getAllRestaurants: builder.query<any, { search?: string; cuisineType?: string; restaurantType?: string; page?: number; limit?: number }>({
            query: ({ search, cuisineType, restaurantType, page = 1, limit = 10 }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (cuisineType) params.append('cuisineType', cuisineType);
                if (restaurantType) params.append('restaurantType', restaurantType);
                params.append('page', page.toString());
                params.append('limit', limit.toString());
                
                return {
                    url: `/restaurants/admin/all?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["AdminRestaurant"],
        }),
        approveRestaurant: builder.mutation<any, string>({
            query: (id) => ({
                url: `/restaurants/${id}/approve`,
                method: "PATCH",
            }),
            invalidatesTags: ["AdminRestaurant"],
        }),
        rejectRestaurant: builder.mutation<any, string>({
            query: (id) => ({
                url: `/restaurants/${id}/revoke-approval`,
                method: "PATCH",
            }),
            invalidatesTags: ["AdminRestaurant"],
        }),
        getRestaurantById: builder.query<any, string>({
            query: (id) => ({
                url: `/restaurants/${id}`,
                method: "GET",
            }),
            providesTags: ["AdminRestaurant"],
        }),
        updateRestaurantByAdmin: builder.mutation<any, { id: string; data: FormData | any }>({
            query: ({ id, data }) => ({
                url: `/restaurants/admin/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["AdminRestaurant"],
        }),
    }),
});
 
 export const {
     useGetAdminRestaurantStatsQuery,
     useGetPendingRestaurantsQuery,
     useGetAllRestaurantsQuery,
     useApproveRestaurantMutation,
     useRejectRestaurantMutation,
     useGetRestaurantByIdQuery,
     useUpdateRestaurantByAdminMutation,
 } = adminRestaurantApi;
