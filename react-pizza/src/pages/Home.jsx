import React,{useEffect,useState}  from 'react'
import Catigories from '../components/Catigories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import axios from 'axios';
import Skeleton from '../components/PizzasBlock/Skeleton';


export default function Home() {
    const[items, setItems]=useState([]);
    const[loading,isLoading]=useState(true);
  
    useEffect (()=>{
      async function fetchData(){
        const respons = await axios.get('https://64c6862d0a25021fde91bafc.mockapi.io/pizzas');
        setItems(respons.data)
        isLoading(false);
      }
      fetchData()
      
    },[])
  return (
    <>
    <div className="content__top">
        <Catigories/>
        <Sort/>
    </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className='content__wrapper'>
    <div className="content__items">
        {
        loading ?
        [...Array(8).keys()].map((_,index)=> <Skeleton key={index}/>) 
        :items.map((obj)=><PizzaBlock key={obj.id}{...obj}
        /> 
        )}
    </div>
    </div>
    </>
  )
}
