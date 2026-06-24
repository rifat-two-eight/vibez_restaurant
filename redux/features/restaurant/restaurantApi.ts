import { baseApi } from "../../api/baseApi";

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyRestaurant: builder.query({
            query: () => '/restaurants/my/restaurant',
            providesTags: ['Restaurant'],
        }),
        updateMyRestaurant: builder.mutation({
            query: (formData: FormData) => ({
                url: '/restaurants/my/restaurant',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Restaurant'],
        }),
    }),
});

export const { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } = restaurantApi;
