import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlise from './slices/cartSlise'

export const store = configureStore({
  reducer: {
  cartSlise,
  filterSlice}
})
