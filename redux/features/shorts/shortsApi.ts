import { baseApi } from "../../api/baseApi";

export const shortsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyShort: builder.query({
            query: () => '/shorts/my-short',
            providesTags: ['Short'],
        }),
        uploadShort: builder.mutation({
            query: (formData: FormData) => ({
                url: '/shorts/upload',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Short'],
        }),
        deleteShort: builder.mutation({
            query: () => ({
                url: `/shorts`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Short'],
        }),
    }),
});

export const { useGetMyShortQuery, useUploadShortMutation, useDeleteShortMutation } = shortsApi;
