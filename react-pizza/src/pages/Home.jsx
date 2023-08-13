import React,{useEffect,useState,useContext}  from 'react'
import Catigories from '../components/Catigories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import axios from 'axios';
import Skeleton from '../components/PizzasBlock/Skeleton';
import AppContext from '../components/Context';
import Pagination from '../components/Pagination';


export default function Home() {
    const {inputValue} = useContext(AppContext)
    const [items, setItems]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,isLoading]=useState(true);
    const [categoryId , setCategoryId] = useState(0);
    const [sortType,setsortType]= useState({
      name:"популярности",
      sortProperty:'rating'
    });
    

    useEffect (()=>{
      async function fetchData(){
        isLoading(true);

        const category = categoryId>0 ? `category=${categoryId}`:" "

        const respons = await axios.get(`https://64c6862d0a25021fde91bafc.mockapi.io/pizzas?page=${page}&limit=4&${category}&sortBy=${sortType.sortProperty}`);
        setItems(respons.data)
        isLoading(false);
      }
      fetchData()
      window.scrollTo(0,0)
    },[categoryId ,sortType,page])

    let filterPizzas = items.filter(i=>i.name.toLocaleLowerCase().includes(inputValue))
    let skeleton = [...Array(8).keys()].map((_,index)=> <Skeleton key={index}/>);
    let pizzas = filterPizzas.map((obj)=><PizzaBlock key={obj.id}{...obj}/>);
    
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
        skeleton
        :pizzas}
    </div>
    <Pagination onChangepage={setPage}/>
    </div>
    </>
  )
}
