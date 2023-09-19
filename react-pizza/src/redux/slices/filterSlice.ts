import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Sort ={
  name:string;
  sortProperty:"rating"|"price"|"name";
}

interface FilterState{
  inputValue:string,
  categoryId:number,
  sortType:Sort,
  page:number
}

const initialState:FilterState  = {
  inputValue:"",
  categoryId: 0,
  sortType:
          {name:"популярности",
          sortProperty:'price'},
  page:1
  }

export const filterSlice= createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state , actions){
      state.categoryId = actions.payload;
    },
    setIntutValue(state,actions){
      state.inputValue = actions.payload;
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
      state.sortType.sortProperty = actions.payload.sortType;
    }
    }
  },
)

export const selectSort = (state:RootState)=>state.filterSlice;
export const { setCategoryId ,setsortType,setPage,setFiltres,setIntutValue } = filterSlice.actions

export default filterSlice.reducer