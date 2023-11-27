import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filter from './Filter/slice'
import cart from './Cart/slice'
import pizzas from './Pizza/slice'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  pizzas,
  filter,
  cart,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
