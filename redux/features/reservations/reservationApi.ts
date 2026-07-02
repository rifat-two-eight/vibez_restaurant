import { baseApi } from "../../api/baseApi";

export const reservationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReservationStats: builder.query({
            query: () => '/reservations/stats',
            providesTags: ['Reservation'],
        }),
        getOwnerReservationStats: builder.query({
            query: () => '/reservations/owner-stats',
            providesTags: ['Reservation'],
        }),
        getWeeklyBookings: builder.query({
            query: () => '/reservations/weekly-bookings',
            providesTags: ['Reservation'],
        }),
        getReservations: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.restaurantId) queryParams.append('restaurantId', params.restaurantId);
                if (params?.userId) queryParams.append('userId', params.userId);
                if (params?.status) queryParams.append('status', params.status);
                if (params?.reservationDate) queryParams.append('reservationDate', params.reservationDate);
                if (params?.page) queryParams.append('page', params.page);
                if (params?.limit) queryParams.append('limit', params.limit);

                const queryString = queryParams.toString();
                return `/reservations${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['Reservation'],
        }),
        updateReservationStatus: builder.mutation({
            query: ({ id, status }: { id: string; status: string }) => ({
                url: `/reservations/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Reservation'],
        }),
    }),
});

export const {
    useGetReservationStatsQuery,
    useGetOwnerReservationStatsQuery,
    useGetWeeklyBookingsQuery,
    useGetReservationsQuery,
    useUpdateReservationStatusMutation
} = reservationApi;
