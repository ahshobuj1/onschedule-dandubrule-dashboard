import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { TLandingPageResponse } from './types';

export const landingPageApi = createApi({
  reducerPath: 'landingPageApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['LandingPage'],
  endpoints: (builder) => ({
    getLandingPage: builder.query<TLandingPageResponse, void>({
      query: () => ({
        url: '/landing-page',
        method: 'GET',
      }),
      providesTags: ['LandingPage'],
    }),

    updateLandingPageContent: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/content',
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    createFeature: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/features',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    updateFeature: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/landing-page/features/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    deleteFeature: builder.mutation<any, string>({
      query: (id) => ({
        url: `/landing-page/features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LandingPage'],
    }),

    createTestimonial: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/testimonials',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    updateTestimonial: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/landing-page/testimonials/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    deleteTestimonial: builder.mutation<any, string>({
      query: (id) => ({
        url: `/landing-page/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LandingPage'],
    }),

    createFAQ: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/faqs',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    updateFAQ: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/landing-page/faqs/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    deleteFAQ: builder.mutation<any, string>({
      query: (id) => ({
        url: `/landing-page/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LandingPage'],
    }),

    createHowItWorks: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/how-it-works',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    updateHowItWorks: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/landing-page/how-it-works/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),

    deleteHowItWorks: builder.mutation<any, string>({
      query: (id) => ({
        url: `/landing-page/how-it-works/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LandingPage'],
    }),
  }),
});

export const {
  useGetLandingPageQuery,
  useUpdateLandingPageContentMutation,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useCreateHowItWorksMutation,
  useUpdateHowItWorksMutation,
  useDeleteHowItWorksMutation,
} = landingPageApi;
