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
      const findIndex = state.items.find(obj => obj.id === actions.payload.id)
      if(findIndex){
        findIndex.count++
      }else{
        state.items.push({
          ...actions.payload,
          count:1
        });
      }
      state.totalItemsPrise = state.items.reduce((sum,obj)=>{return sum+obj.price*obj.count},0)
    },
    minusItem(state , actions){
      const findIndex = state.items.find(obj => obj.id === actions.payload.id);
      if(findIndex){
        findIndex.count--
      }
      state.totalItemsPrise = state.items.reduce((sum,obj)=>{return sum+obj.price*obj.count},0)
    },
    removeToCart(state,actions){
        state.items= state.items.filter(obj => obj.id !== actions.payload.id) ;
    },
    clearCart(state){
      state.items = [];
      state.totalItemsPrise=0
    }
    }
  },
)


export const { addToCart ,removeToCart,clearCart,minusItem } = cartSlise.actions

export default cartSlise.reducer