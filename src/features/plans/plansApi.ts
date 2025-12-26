import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const plansApi = createApi({
  reducerPath: 'plansApi', // More specific name to avoid conflicts
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Plans'],
  endpoints: (builder) => ({
    // Authentication endpoints
    plans: builder.query({
      query: (params) => ({
        url: '/plans',
        method: 'GET',
        params: {...params},
      }),
      providesTags: ['Plans'],
    }),

    plan: builder.query({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'GET',
      }),
      providesTags: ['Plans'],
    }),

    createPlan: builder.mutation({
      query: (data) => ({
        url: '/plans',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Plans'],
    }),

    updatePlan: builder.mutation({
      query: ({id, data}) => ({
        url: `/plans/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Plans'],
    }),

    updatePlanStatus: builder.mutation({
      query: ({id, status}) => ({
        url: `/plans/${id}/status`,
        method: 'PATCH',
        data: {status},
      }),
      invalidatesTags: ['Plans'],
    }),

    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plans'],
    }),
  }),
});

export const {
  usePlansQuery,
  usePlanQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useUpdatePlanStatusMutation,
  useDeletePlanMutation,
} = plansApi;
