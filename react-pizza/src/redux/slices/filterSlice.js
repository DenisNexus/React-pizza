import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortType:
          {name:"популярности",
          sortProperty:'rating'},
  page:1
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
    setPage(state,actions){
      state.page = actions.payload;
    },
    setFiltres(state,actions){
      state.page = Number(actions.payload.page);
      state.categoryId = Number(actions.payload.categoryId);
      state.sortProperty = actions.payload.sortType;
    }
    }
  },
)


export const { setCategoryId ,setsortType,setPage,setFiltres } = filterSlice.actions

export default filterSlice.reducer