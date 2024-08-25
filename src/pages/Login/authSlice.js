import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isConnected: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload
            state.token = token
            state.user = user
            state.isConnected = true
        },
        logout: (state) => {
            state.token = null
            state.user = null
            state.isConnected = false
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
export const selectUserInfo = (state) => state?.auth?.user
export const selectConnexion = (state) => state?.auth?.isConnected
export const selectToken = (state) => state?.auth?.token
