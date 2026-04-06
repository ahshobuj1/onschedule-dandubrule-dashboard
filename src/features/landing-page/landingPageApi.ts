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

    createTestimonial: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/testimonials',
        method: 'POST',
        data,
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

    createHowItWorks: builder.mutation<any, any>({
      query: (data) => ({
        url: '/landing-page/how-it-works',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['LandingPage'],
    }),
  }),
});

export const {
  useGetLandingPageQuery,
  useUpdateLandingPageContentMutation,
  useCreateFeatureMutation,
  useCreateTestimonialMutation,
  useCreateFAQMutation,
  useCreateHowItWorksMutation,
} = landingPageApi;
