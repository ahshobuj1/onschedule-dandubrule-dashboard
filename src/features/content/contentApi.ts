import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
type PublicUploadUrlResponse = {
  success: boolean;
  message: string;
  data: {
    uploadUrl: string;
    key: string;
    bucket: string;
    url: string; // public CDN url
  };
};
export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Content'],
  endpoints: (builder) => ({
    getPublicUploadUrl: builder.mutation<
      PublicUploadUrlResponse,
      {fileName: string; fileType: string; fileSize: number}
    >({
      query: (body) => ({
        url: '/content/get-public-upload-url',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Content'],
    }),

    getPresignedUrl: builder.mutation<
      PublicUploadUrlResponse,
      {fileName: string; fileType: string; fileSize: number; moduleId: string}
    >({
      query: (body) => ({
        url: '/content/get-presigned-url',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Content'],
    }),

    /** ------------------ UPLOAD ------------------ */

    uploadToS3: builder.mutation<
      void,
      {
        presignedUrl: string;
        file: File;
        onUploadProgress?: (percent: number) => void;
      }
    >({
      queryFn: async ({presignedUrl, file, onUploadProgress}) => {
        try {
          const response = await axios.put(presignedUrl, file, {
            headers: {
              'Content-Type': file.type || 'application/octet-stream',
            },
            withCredentials: false, // ✅ VERY IMPORTANT
            onUploadProgress: (event) => {
              if (event.total && onUploadProgress) {
                const percent = Math.round((event.loaded * 100) / event.total);
                onUploadProgress(percent);
              }
            },
          });

          return {data: response.data};
        } catch {
          return {
            error: {
              status: 500,
              data: 'Upload failed',
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetPublicUploadUrlMutation,
  useGetPresignedUrlMutation,
  useUploadToS3Mutation,
} = contentApi;
