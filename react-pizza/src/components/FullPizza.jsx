import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'



const FullPizza = () => {
    const {id} = useParams();
    const [pizza,setPizza] = useState();
    console.log(id)
    useEffect(()=>{
        async function getPizza (){
            const {data}  = await axios.get('https://64c6862d0a25021fde91bafc.mockapi.io/pizzas/'+id)
           console.log(data)
           setPizza(data)
        } 
        getPizza()
    },[id])

    if(!pizza){
        return "Loading.."
    }
  return (
   
    <div>
         <img src={pizza.imageUrl} alt="" />
         <h2>{pizza.name}</h2>
         <p>{pizza.price} грн</p>
    </div>
  )
}

export default FullPizza