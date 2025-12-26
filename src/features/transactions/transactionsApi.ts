import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Transactions'],
    endpoints: builder => ({
        getTransactions: builder.query({
            query: params => ({
                url: '/transactions',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['Transactions'],
        }),
        getTransaction: builder.query({
            query: id => ({
                url: `/transactions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Transactions'],
        }),
        updateTransaction: builder.mutation({
            query: ({ id, data }) => ({
                url: `/transactions/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Transactions'],
        }),
        deleteTransaction: builder.mutation({
            query: id => ({
                url: `/transactions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Transactions'],
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useGetTransactionQuery,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} = transactionsApi;
