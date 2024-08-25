import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './services/Api'
import { authSlice } from './pages/Login/authSlice'

export const store = configureStore({
    reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        auth: authSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
