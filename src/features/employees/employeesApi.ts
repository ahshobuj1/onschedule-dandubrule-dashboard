import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const employeesApi = createApi({
  reducerPath: 'employeesApi', // More specific name to avoid conflicts
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    // Authentication endpoints
    employees: builder.query({
      query: (params) => ({
        url: '/employees',
        method: 'GET',
        params: {...params},
      }),
      providesTags: ['Employees'],
    }),
  }),
});

export const {useEmployeesQuery} = employeesApi;
