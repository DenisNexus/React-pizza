import React,{useEffect,useState}  from 'react'
import Catigories from '../components/Catigories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import axios from 'axios';
import Skeleton from '../components/PizzasBlock/Skeleton';


export default function Home() {
    const[items, setItems]=useState([]);
    const[loading,isLoading]=useState(true);
    const [categoryId , setCategoryId] = useState(0);
    const [sortType,setsortType]= useState({
      name:"популярности",
      sortProperty:'rating'
    });

  
    useEffect (()=>{
      async function fetchData(){
        isLoading(true);
        const respons = await axios.get(`https://64c6862d0a25021fde91bafc.mockapi.io/pizzas?${categoryId>0 ? `category=${categoryId}`:" "}&sortBy=${sortType.sortProperty}`);
        setItems(respons.data)
        isLoading(false);
      }
      fetchData()
      window.scrollTo(0,0)
    },[categoryId ,sortType])
    console.log(sortType)
  return (
    <>
    <div className="content__top">
        <Catigories
          value={categoryId}
          onClickCategory={(id)=> setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id)=> setsortType(id)}
        />
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
