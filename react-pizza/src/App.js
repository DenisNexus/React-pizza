import React,{useEffect,useState} from 'react';
import './scss/app.scss'
import Header from './components/Header';
import Catigories from './components/Catigories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import axios from 'axios';


function App() {
  const[items, setItems]=useState([]);

  useEffect (()=>{
    async function fetchData(){
      const respons = await axios.get('https://64c6862d0a25021fde91bafc.mockapi.io/pizzas');
      setItems(respons.data)
    }
    fetchData()
  },[])

  return (
    <div className="wrapper">
      <Header/>
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Catigories/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {items.map((obj)=>
          <PizzaBlock
          key={obj.id}
           {...obj}
          /> )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
