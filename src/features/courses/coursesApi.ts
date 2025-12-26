import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Courses'],
    endpoints: builder => ({
        createCourse: builder.mutation({
            query: data => ({
                url: '/courses',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Courses'],
        }),
        getCourses: builder.query({
            query: params => ({
                url: '/courses',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['Courses'],
        }),
        getCourse: builder.query({
            query: id => ({
                url: `/courses/${id}`,
                method: 'GET',
            }),
            providesTags: ['Courses'],
        }),
        updateCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Courses'],
        }),
        deleteCourse: builder.mutation({
            query: id => ({
                url: `/courses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Courses'],
        }),
    }),
});

export const {
    useCreateCourseMutation,
    useGetCoursesQuery,
    useGetCourseQuery,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = coursesApi;
