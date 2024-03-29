import React,{useState} from "react"
import {useSelector,useDispatch} from 'react-redux'
import {CartItem, addToCart,selectCartitems} from "../../redux/slices/cartSlice"
import { Link } from "react-router-dom";

type CategoriesProps ={
  name:string,
  price:number,
  imageUrl:string,
  sizes:number[],
  types:number[],
  id:string
}

const PizzaBlock:React.FC<CategoriesProps> = ({name,price,imageUrl,sizes,types,id}) => {
const cartItem  = useSelector(selectCartitems(id))
const [activeTypes , setActiveTypes] = useState(0);
const [activeSizes , setActiveSizes] = useState(0);
const dispatch = useDispatch();
const typesPizza = ["тонке","традиційне"];

const addedCount = cartItem? cartItem.count : 0 ;

const onClickAdd =  () =>{
  const item:CartItem = {
    id,
    name,
    price,
    imageUrl,
    sizes:sizes[activeSizes],
    types:typesPizza[activeTypes],
    count:0
  }
  dispatch(addToCart(item))
}
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
        {types.map((value)=>
        <li
          key={value}
          className={activeTypes === value ? "active" : " "}
          onClick={()=>setActiveTypes(value)}> 
         {typesPizza[value]}
         </li>)}
        </ul>
        <ul>
        {sizes.map((value,i)=>
        <li 
          key={i}
          className={activeSizes === i ? "active" : " "} 
          onClick={()=>setActiveSizes(i)}>
          {value} см.
        </li>)}
        </ul>
      </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} грн</div>
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span onClick={onClickAdd}>Додати</span>
            {addedCount >0 && <i>{addedCount}</i>}
  </div>
</div>
</div> 
  )
}

export default PizzaBlock