import { useContext } from "react"
import { ShoppingCartContext } from "../context/ShoppingCartProvider"

const useShoppingCart =()=>{
    const context = useContext(ShoppingCartContext);
    if(!context) {
        throw new Error('useShoppingCart should be used within ShoppingCartProvider.');
    }

    return context;
}

export default useShoppingCart;