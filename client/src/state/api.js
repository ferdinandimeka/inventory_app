import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Transactions', 'Geography',
    'Sales', 'Admin', 'Performance', 'Dashboard', 'Customer'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/api/v1/users/user?${id}`,
            providesTags: ['User']
        }),
        getProducts: builder.query({
            query: () => '/api/v1/clients/products',
            providesTags: ['Products']
        }),
        getCustomers: builder.query({
            query: () => '/api/v1/clients/customers',
            providesTags: ['User']
        }),
        getTransactions: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: '/api/v1/clients/transactions',
                method: "GET",
                params: {
                    page,
                    pageSize,
                    sort,
                    search
                },
                providesTags: ['Transactions']
            }),
        }),
        getGeography: builder.query({
            query: () => '/api/v1/clients/geography',
            providesTags: ['Geography']
        }),
        getSales: builder.query({
            query: () => '/api/v1/sales',
            providesTags: ['Sales']
        }),
        getAdmin: builder.query({
            query: () => '/api/v1/management/admin',
            providesTags: ['Admins']
        }),
        getPerformance: builder.query({
            query: (id) => `/api/v1/management/performance/${id}`,
            providesTags: ['Performance']
        }),
        getDashboard: builder.query({
            query: () => '/api/v1/users/dashboard',
            providesTags: ['Dashboard']
        }),
    }),
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery,
useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminQuery,
useGetPerformanceQuery, useGetDashboardQuery } = api;