import React,{useEffect,useRef}  from 'react'
import qs from "qs";
import {useNavigate} from 'react-router-dom'

import Catigories from '../components/Catigories';
import Sort, { arr } from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId,setsortType,setPage,setFiltres,selectSort } from '../redux/slices/filterSlice'
import {fetchPizzas , selectPizzaData} from '../redux/slices/pizzasSlice'


function Home() {
    const navigate = useNavigate();
    const {sortType,categoryId,page} = useSelector(selectSort);
    const {items,status} = useSelector(selectPizzaData);
    const dispatch = useDispatch()
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {inputValue} = useSelector(selectSort)
  
    const categoryChange = (id:number)=>{
      dispatch(setCategoryId(id))
    }

    const filteChange = (id:number)=>{
      dispatch(setsortType(id))
    }

    const onChangepage = (id:number)=>{
      dispatch(setPage(id))
    }

    const getPizzas = () =>{
        const category = categoryId>0 ? `category=${categoryId}`:" "
          dispatch(
            //@ts-ignore
            fetchPizzas({
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

    let filterPizzas = items.filter((i:any)=>i.name.toLocaleLowerCase().includes(inputValue))
    let skeleton = [...Array(8).keys()].map((_,index)=> <Skeleton key={index}/>);
    let pizzas = filterPizzas.map((obj:any)=><PizzaBlock key={obj.id}{...obj}/>);
    
    return (
    <>
    <div className="content__top">
        <Catigories
          value={categoryId}
          onClickCategory={(id:number)=> categoryChange(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id:number)=> filteChange(id)}
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
    <Pagination onChangepage={(id:number)=>onChangepage(id)}/>
    </div>
    </>
  )
}

export default Home;