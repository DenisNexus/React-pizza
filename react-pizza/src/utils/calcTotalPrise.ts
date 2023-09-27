import { CartItem } from "../redux/slices/cartSlice"

export const calcTotalPrise = (items:CartItem[]) =>{
    return items.reduce((sum,obj)=>{return sum+obj.price*obj.count},0)
}
