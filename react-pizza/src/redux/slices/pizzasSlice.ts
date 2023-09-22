import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store';

export type Pizza ={
  name:string,
  price:number,
  imageUrl:string,
  sizes:number[],
  types:number[],
  id:string
}

enum Status {
  LOADING="loading",
  SUCCESS = "success",
  ERROR = "error"
}

interface pizzasSliceState{
  items:Pizza[];
  status:Status
}
const initialState:pizzasSliceState = {
  items:[],
  status:Status.LOADING
  }
type Property = {sortProperty:string}
type FetchPizzasArg = {category:string,page:number,sortType:Property}
 
export const fetchPizzas = createAsyncThunk <Pizza[] ,FetchPizzasArg>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const{category,page,sortType} = params;
        const {data} =  await axios.get<Pizza[]>(`https://64c6862d0a25021fde91bafc.mockapi.io/pizzas?page=${page}&limit=4&${category}&sortBy=${sortType.sortProperty}`)
      return data;
    }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state , actions){
        state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = Status.LOADING
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = Status.SUCCESS
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = Status.ERROR
          state.items = []
       })
 }

  },
)


export const selectPizzaData = (state:RootState) =>state.pizzasSlice
export const { setItems, } = pizzasSlice.actions

export default pizzasSlice.reducer