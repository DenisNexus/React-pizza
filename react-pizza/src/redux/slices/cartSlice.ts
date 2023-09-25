import { createSlice , PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type CartItem ={
  id:string
  name:string,
  price:number,
  imageUrl:string,
  sizes:number,
  types:string,
  count:number,
}

interface cartSliceState {
  totalItems : number ;
  totalItemsPrise : number;
  items:CartItem[]
}

const initialState : cartSliceState= {
  totalItems: 0,
  totalItemsPrise:0,
  items:[]
  }

export const cartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state , actions:PayloadAction<CartItem>){
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
    minusItem(state , actions:PayloadAction<CartItem>){
      const findIndex = state.items.find(obj => obj.id === actions.payload.id);
      if(findIndex){
        findIndex.count--
      }
      state.totalItemsPrise = state.items.reduce((sum,obj)=>{return sum+obj.price*obj.count},0)
    },
    removeToCart(state,actions:PayloadAction<CartItem>){
        state.items= state.items.filter(obj => obj.id !== actions.payload.id) ;
        state.totalItemsPrise=0
    },
    clearCart(state){
      state.items = [];
      state.totalItemsPrise=0
    }
    }
  },
)

export const selectCart = (state:RootState)=>state.cartSlice;
export const selectCartitems = (id:string) => (state:RootState)=>state.cartSlice.items.find(obj=>obj.id === id)

export const { addToCart ,removeToCart,clearCart,minusItem } = cartSlise.actions

export default cartSlise.reducer