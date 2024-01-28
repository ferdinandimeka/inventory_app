import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/api/v1/users/user?${id}`,
            providesTags: ['User']
        }),
        getProducts: builder.query({
            query: () => '/api/v1/products',
            providesTags: ['Products']
        }),
    })
})

export const { useGetUserQuery, useGetProductsQuery } = api;