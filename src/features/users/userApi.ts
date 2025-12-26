import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi', // More specific name to avoid conflicts
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Auth', 'User', 'Profile'],
  endpoints: (builder) => ({
    // Authentication endpoints
    users: builder.query({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params: {...params},
      }),
      providesTags: ['User'],
    }),

    user: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
