import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerRestaurant: builder.mutation({
            query: (formData) => ({
                url: '/auth/register-restaurant',
                method: 'POST',
                body: formData,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useRegisterRestaurantMutation, useLoginMutation } = authApi;
