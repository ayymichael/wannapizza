import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizzas from './slices/pizzasSlice'

const rootReducer = combineReducers({
  pizzas,
  filter,
  cart
})

export const store = configureStore({
  reducer: rootReducer
})