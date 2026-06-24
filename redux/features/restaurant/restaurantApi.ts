import { baseApi } from "../../api/baseApi";

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyRestaurant: builder.query({
            query: () => '/restaurants/my/restaurant',
            providesTags: ['Restaurant'],
        }),
        updateMyRestaurant: builder.mutation({
            query: (data: any) => ({
                url: '/restaurants/my/restaurant',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Restaurant'],
        }),
    }),
});

export const { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } = restaurantApi;
