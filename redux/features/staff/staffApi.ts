import { baseApi } from "../../api/baseApi";

export const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStaff: builder.mutation({
            query: (staffData) => ({
                url: '/users/staff',
                method: 'POST',
                body: staffData,
            }),
            invalidatesTags: ['User'],
        }),
        getStaff: builder.query({
            query: ({ page = 1, limit = 10 }) => `/users/staff?page=${page}&limit=${limit}`,
            providesTags: ['User'],
        }),
        toggleStaffStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/users/staff/${id}/toggle-login`,
                method: 'PATCH',
                body: { enable: isActive },
            }),
            invalidatesTags: ['User'],
        }),
        updateStaff: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/staff/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updateStaffPassword: builder.mutation({
            query: ({ id, password }) => ({
                url: `/users/staff/${id}/password`,
                method: 'PATCH',
                body: { password },
            }),
        }),
    }),
});

export const { useCreateStaffMutation, useGetStaffQuery, useToggleStaffStatusMutation, useUpdateStaffMutation, useUpdateStaffPasswordMutation } = staffApi;
