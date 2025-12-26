import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const modulesApi = createApi({
    reducerPath: 'modulesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Modules'],
    endpoints: builder => ({
        getModules: builder.query({
            query: query => ({
                url: '/modules',
                method: 'GET',
                params: { ...query },
            }),
            providesTags: ['Modules'],
        }),
        getModule: builder.query({
            query: id => ({
                url: `/modules/${id}`,
                method: 'GET',
            }),
            providesTags: ['Modules'],
        }),
        updateModule: builder.mutation({
            query: ({ id, data }) => ({
                url: `/modules/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Modules'],
        }),
        deleteModule: builder.mutation({
            query: id => ({
                url: `/modules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Modules'],
        }),
        createModule: builder.mutation({
            query: data => ({
                url: '/modules',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Modules'],
        }),
    }),
});

export const {
    useGetModulesQuery,
    useGetModuleQuery,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useCreateModuleMutation,
} = modulesApi;
