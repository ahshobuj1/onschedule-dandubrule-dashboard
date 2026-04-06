import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Transactions'],
    endpoints: builder => ({
        getTransactions: builder.query({
            query: params => ({
                url: '/billing/history',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['Transactions'],
        }),
        getTransaction: builder.query({
            query: id => ({
                url: `/billing/history/${id}`,
                method: 'GET',
            }),
            providesTags: ['Transactions'],
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useGetTransactionQuery,
} = transactionsApi;
