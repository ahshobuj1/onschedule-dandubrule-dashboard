// src/features/auth/authApi.ts
import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';
import {setCredentials, logout} from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi', // More specific name to avoid conflicts
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Auth', 'User', 'Profile'],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          // Store auth data in Redux
          dispatch(
            setCredentials({
              // user: data.user,
              token: data.data.accessToken,
            })
          );

          console.log('Login success:', data);
        } catch (error) {
          // Handle login error if needed
          console.error('Login failed:', error);
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    // profile
    profile: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        data: userData,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(
            setCredentials({
              // user: data.user,
              token: data.token,
            })
          );

          localStorage.setItem('refreshToken', data.refreshToken);
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    logout: builder.mutation<{message: string}, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // async onQueryStarted(_, {dispatch, queryFulfilled}) {
      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     // Even if server logout fails, clear local state
      //     console.error('Server logout failed:', error);
      //   } finally {
      //     // Always clear local auth state
      //     dispatch(logout());
      //     localStorage.removeItem('refreshToken');
      //   }
      // },
      invalidatesTags: ['Auth', 'User', 'Profile'],
    }),

    refreshToken: builder.mutation({
      query: ({refreshToken}) => ({
        url: '/auth/refresh',
        method: 'POST',
        data: {refreshToken},
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          dispatch(
            setCredentials({
              // user: data.user,
              token: data.token,
            })
          );

          localStorage.setItem('refreshToken', data.refreshToken);
        } catch {
          // If refresh fails, logout user
          dispatch(logout());
          localStorage.removeItem('refreshToken');
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (profile) => ({
        url: '/auth/update-profile',
        method: 'PATCH',
        data: profile,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

// Export hooks for components
export const {
  useLoginMutation,
  useProfileQuery,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useUpdateProfileMutation,
} = authApi;
