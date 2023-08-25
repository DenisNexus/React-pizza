import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items:[]
  }

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
      const{category,page,sortType} = params;
     const {data} =  await axios.get(`https://64c6862d0a25021fde91bafc.mockapi.io/pizzas?page=${page}&limit=4&${category}&sortBy=${sortType.sortProperty}`)
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
          state.status = "loading"
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success"
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error"
          state.items = []
       })
 }

  },
)


export const { setItems, } = pizzasSlice.actions

export default pizzasSlice.reducer