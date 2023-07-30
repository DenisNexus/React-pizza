import React, {useState} from 'react'

const allCatigories = ["Все", " Мясные" ,"Вегетарианская","Гриль" , "Острые" , "Закрытые" ]

export default function Catigories() {
const [indexCatigories , setIndexCatigories] = useState(0)

const  changeInedex = (index) =>{
  setIndexCatigories(index)
}
  return (
    <div className="categories">
            <ul>
              {allCatigories.map((value, i)=>
                <li 
                  key={i}
                  onClick={()=>changeInedex(i)}  
                  className={indexCatigories === i ? "active" : " "
                }>
                  {value}
                </li>
              )}
            </ul>
          </div>
  )
}
