import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface FilterState{
  inputValue:string,
  categoryId:number,
  sortType:any,
  page:number
}

const initialState:FilterState  = {
  inputValue:"",
  categoryId: 0,
  sortType:
          {name:"популярності",
          sortProperty:'price'},
  page:1
  }

export const filterSlice= createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state , actions:PayloadAction<number>){
      state.categoryId = actions.payload;
    },
    setIntutValue(state,actions:PayloadAction<string>){
      state.inputValue = actions.payload;
    },
    setsortType(state,actions:PayloadAction<any>){
      state.sortType = actions.payload;
    },
    setPage(state,actions:PayloadAction<number>){
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