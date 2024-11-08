import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/user/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                },
            }),
            transformResponse: (response) => {
                return response.body.token
            },
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: 'profile',
                method: 'POST',
            }),
        }),
        editUserProfile: builder.mutation({
            query: ({ firstName, lastName }) => ({
                url: 'profile',
                method: 'PUT',
                body: {
                    firstName: firstName,
                    lastName: lastName,
                },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useGetUserProfileQuery,
    useEditUserProfileMutation,
} = api
