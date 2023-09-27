import { calcTotalPrise } from "./calcTotalPrise";

export const getCartFromLS = () =>{
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : []
    const totalItemsPrise = calcTotalPrise(items)

    return {
        items,
        totalItemsPrise
    }
}