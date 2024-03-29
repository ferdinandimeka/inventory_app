import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fedeco-backend.onrender.com' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Transactions', 'Geography',
    'Sales', 'Admin', 'Performance', 'Dashboard', 'Customer'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/api/v1/users/user/${id}`,
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
        createUser: builder.mutation({
            query: (user) => ({
                url: '/api/v1/user/register',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: '/api/v1/user/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/v1/user/logout',
                method: 'POST'
            }),
            providesTags: ['User']
        }),
    }),
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery,
useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminQuery,
useGetPerformanceQuery, useGetDashboardQuery, useCreateUserMutation,
useLoginUserMutation, useLogoutUserMutation } = api;