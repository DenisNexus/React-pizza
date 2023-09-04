import React  from 'react'
type CategoriesProps = {
  value:number;
  onClickCategory: (i:number) => void
}

const Catigories : React.FC<CategoriesProps> = ({value , onClickCategory}) =>{
const allCatigories = ["Все", " Мясные" ,"Вегетарианская","Гриль" , "Острые" , "Закрытые" ]

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
export default Catigories;
