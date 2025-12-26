// src/features/auth/authApi.ts
import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    stats: builder.query({
      query: () => ({
        url: '/admin/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
  }),
});

// Export hooks for components
export const {useStatsQuery} = statsApi;
