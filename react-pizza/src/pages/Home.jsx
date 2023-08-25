import React,{useEffect,useState,useContext , useRef}  from 'react'
import qs from "qs";
import {useNavigate} from 'react-router-dom'

import Catigories from '../components/Catigories';
import Sort, { arr } from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import AppContext from '../components/Context';
import Pagination from '../components/Pagination';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId,setsortType,setPage,setFiltres } from '../redux/slices/filterSlice'
import {fetchPizzas} from '../redux/slices/pizzasSlice'


function Home() {
    const navigate = useNavigate();
    const {sortType,categoryId,page} = useSelector(state=>state.filterSlice);
    const {items,status} = useSelector(state=>state.pizzasSlice);
    const dispatch = useDispatch()
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {inputValue} = useContext(AppContext)
  
    const categoryChange = (id)=>{
      dispatch(setCategoryId(id))
    }

    const filteChange = (id)=>{
      dispatch(setsortType(id))
    }

    const onChangepage = (id)=>{
      dispatch(setPage(id))
    }

    const getPizzas = () =>{
        const category = categoryId>0 ? `category=${categoryId}`:" "
          dispatch(fetchPizzas({
            category,
            page,
            sortType}))
        window.scrollTo(0,0)
      }

      useEffect(()=>{
        if(isMounted.current){
          const queryString = qs.stringify({
            sortProperty:sortType.sortProperty,
            categoryId,
            page,
          })
          navigate(`?${queryString}`)
        }
        isMounted.current=true
      },[categoryId ,page ,sortType.sortProperty,navigate])

    useEffect(()=>{
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1))
        const sort =  arr.find(obj=>obj.sortProperty === params.sortProperty)
        dispatch (
          setFiltres({
            ...params,
            sort
          })
        )
        isSearch.current = true
      }
    },[dispatch])

    useEffect (()=>{
      if(!isSearch.current){
        getPizzas();
      }
      isSearch.current = false
    },[categoryId ,sortType,page])

    let filterPizzas = items.filter(i=>i.name.toLocaleLowerCase().includes(inputValue))
    let skeleton = [...Array(8).keys()].map((_,index)=> <Skeleton key={index}/>);
    let pizzas = filterPizzas.map((obj)=><PizzaBlock key={obj.id}{...obj}/>);
    
    return (
    <>
    <div className="content__top">
        <Catigories
          value={categoryId}
          onClickCategory={(id)=> categoryChange(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id)=> filteChange(id)}
        />
    </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className='content__wrapper'>
    {
        status ==="error" ?
          <div className='content__error'>
          <h2> К сожалению ничего не найдено <span>😕</span ></h2>
          <p>Поробуйте повоторить запрос позже.</p>
          </div>
        :<div className="content__items">{status === "loading" ? skeleton : pizzas}</div>
      }
    <Pagination onChangepage={(id)=>onChangepage(id)}/>
    </div>
    </>
  )
}

export default Home;