
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import AuthReducer from '../reducers/AuthReducer'

export const rootReducer = combineReducers({
	auth: AuthReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
