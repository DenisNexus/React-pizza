import React,{useEffect,useState,useContext , useRef}  from 'react'
import axios from 'axios';
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


function Home() {
    const navigate = useNavigate();
    const {sortType,categoryId,page} = useSelector(state=>state.filterSlice)
    const dispatch = useDispatch()
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {inputValue} = useContext(AppContext)
    const [items, setItems]=useState([]);
    const [loading,isLoading]=useState(true);
        
    const categoryChange = (id)=>{
      dispatch(setCategoryId(id))
    }

    const filteChange = (id)=>{
      dispatch(setsortType(id))
    }

    const onChangepage = (id)=>{
      dispatch(setPage(id))
    }

    const fetchPizzas =()=>{
      async function fetchData(){
        isLoading(true);

        const category = categoryId>0 ? `category=${categoryId}`:" "

        const respons = await axios.get(`https://64c6862d0a25021fde91bafc.mockapi.io/pizzas?page=${page}&limit=4&${category}&sortBy=${sortType.sortProperty}`);
        setItems(respons.data)
        isLoading(false);
      }
      fetchData()
      window.scrollTo(0,0)
    }
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
      if(isSearch.current){
        fetchPizzas();
      }
      isSearch.current = false
    },[categoryId ,sortType,page])

    let filterPizzas = items.filter(i=>i.name.toLocaleLowerCase().includes(inputValue))
    let skeleton = [...Array(8).keys()].map((_,index)=> <Skeleton key={index}/>);
    let pizzas = filterPizzas.map((obj)=><PizzaBlock key={obj.id}{...obj}/>);
    
    useEffect(()=>{
      const queryString = qs.stringify({
        sortProperty:sortType.sortProperty,
        categoryId,
        page,
      })
      navigate(`?${queryString}`)
    },[categoryId ,page ,sortType.sortProperty])

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
    <div className="content__items">
        {
        loading ?
        skeleton
        :pizzas}
    </div>
    <Pagination onChangepage={(id)=>onChangepage(id)}/>
    </div>
    </>
  )
}

export default Home;