import React  from 'react'

const allCatigories = ["Все", " Мясные" ,"Вегетарианская","Гриль" , "Острые" , "Закрытые" ]

export default function Catigories({value , onClickCategory}) {


  return (
    <div className="categories">
            <ul>
              {allCatigories.map((categoryName, i)=>
                <li 
                  key={i}
                  onClick={()=>onClickCategory(i)}  
                  className={value === i ? "active" : " "
                }>
                  {categoryName}
                </li>
              )}
            </ul>
          </div>
  )
}
