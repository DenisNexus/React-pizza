import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalItems: 0,
  totalItemsPrise:0,
  items:[]
  }

export const cartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state , actions){
      state.items.push(actions.payload)
    },
    removeToCart(state,actions){
        state.items= state.items.filter(obj => obj.id !== actions.payload.id) ;
    },
    clearCart(state){
      state.items = [];
    }
    }
  },
)


export const { addToCart ,removeToCart,clearCart } = cartSlise.actions

export default cartSlise.reducer