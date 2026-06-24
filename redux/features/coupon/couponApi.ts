import { baseApi } from "../../api/baseApi";

export const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (data) => ({
                url: '/coupons',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        getCoupons: builder.query({
            query: () => '/coupons',
            providesTags: ['Coupon'],
        }),
        getCouponById: builder.query({
            query: (id) => `/coupons/${id}`,
            providesTags: ['Coupon'],
        }),
        updateCoupon: builder.mutation({
            query: ({ id, data }) => ({
                url: `/coupons/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupon'],
        }),
    }),
});

export const { 
    useCreateCouponMutation, 
    useGetCouponsQuery, 
    useGetCouponByIdQuery, 
    useUpdateCouponMutation, 
    useDeleteCouponMutation 
} = couponApi;
