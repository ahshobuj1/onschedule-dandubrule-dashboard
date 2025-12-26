import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const clientApi = createApi({
  reducerPath: 'clientApi', // More specific name to avoid conflicts
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    // Authentication endpoints
    clients: builder.query({
      query: (params) => ({
        url: '/clients',
        method: 'GET',
        params: {...params},
      }),
      providesTags: ['Clients'],
    }),
  }),
});

export const {useClientsQuery} = clientApi;
