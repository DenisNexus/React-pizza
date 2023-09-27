import React  from 'react'
type CategoriesProps = {
  value:number;
  onClickCategory: (i:number) => void
}

const Catigories : React.FC<CategoriesProps> = ({value , onClickCategory}) =>{
const allCatigories = ["Все", " М'ясні" ,"Вегетаріанська","Гриль" , "Гострі" , "Закриті" ]

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
