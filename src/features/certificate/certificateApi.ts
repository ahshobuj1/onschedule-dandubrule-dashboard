import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const certificateApi = createApi({
  reducerPath: 'certificateApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Certificates'],
  endpoints: (builder) => ({
    getCertificates: builder.query({
      query: (query) => ({
        url: '/certificates',
        method: 'GET',
        params: {...query},
      }),
      providesTags: ['Certificates'],
    }),
    getCertificate: builder.query({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: 'GET',
      }),
      providesTags: ['Certificates'],
    }),
    updateCertificates: builder.mutation({
      query: ({id, data}) => ({
        url: `/certificates/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Certificates'],
    }),
    deleteCertificates: builder.mutation({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Certificates'],
    }),
    createCertificates: builder.mutation({
      query: (data) => ({
        url: '/certificates',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Certificates'],
    }),
  }),
});

export const {
  useCreateCertificatesMutation,
  useGetCertificatesQuery,
  useGetCertificateQuery,
  useDeleteCertificatesMutation,
  useUpdateCertificatesMutation,
} = certificateApi;
