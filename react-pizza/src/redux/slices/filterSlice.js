import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortType:
          {name:"популярности",
          sortProperty:'rating'}
  }

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state , actions){
      state.categoryId = actions.payload;
    },
    setsortType(state,actions){
      state.sortType = actions.payload;
    },
    }
  },
)


export const { setCategoryId ,setsortType } = filterSlice.actions

export default filterSlice.reducer