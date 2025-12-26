import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const assignmentApi = createApi({
  reducerPath: 'assignmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Assignments'],
  endpoints: (builder) => ({
    createAssignment: builder.mutation({
      query: (data) => ({
        url: '/admin/assessments',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Assignments'],
    }),
    getAssignments: builder.query({
      query: (params) => ({
        url: 'admin/assessments',
        method: 'GET',
        params: {...params},
      }),
      providesTags: ['Assignments'],
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/admin/assessments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Assignments'],
    }),
    updateAssignment: builder.mutation({
      query: ({id, data}) => ({
        url: `/admin/assessments/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Assignments'],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/admin/assessments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assignments'],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
