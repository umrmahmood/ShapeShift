import { createContext, useCallback, useMemo, useState, useEffect } from "react"

//id, quantity
export const ShoppingCartContext = createContext(null);
const ShoppingCartProvider = ({ children }) => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingCartItems')) || []);

    useEffect(() => {
        localStorage.setItem('shoppingCartItems', JSON.stringify(items));
      }, [items]);
    
      // fetch item object of the selected product
    const addItem = useCallback(({_id: id, ...productItem}) => {

        setItems(previousItems => {
            const isItemPresent = previousItems.find(item => item.id === id);
            if (!isItemPresent) {
                return [...previousItems, { ...productItem, id, quantity: 1 }]
            }
            return previousItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        })
    }, [])

    //TODO: fetch item object of the selected product
    const subtractItem = useCallback((id) => {

        setItems(previousItems => {
            const hasOneItem = previousItems.find(item => item.id === id && item.quantity === 1)
            if (hasOneItem) {
                console.log(hasOneItem)
                return previousItems.filter(item => item.id !== id)
            }
            return previousItems.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        })
    }, [])

    //TODO: fetch item object of the selected product
    const removeItem = useCallback((id) => {

        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id)
        })
    }, [])

    //TODO: fetch item object of the selected product
    const editItem = useCallback((id, noOfItem) => {

        if (noOfItem < 1) {
            console.log('less than 1')
            removeItem(id)
        }
        setItems(previousItems => {
            const isItemPresent = previousItems.find(item => item.id === id);
            if (!isItemPresent) {
                return [...previousItems, { id, quantity: noOfItem }]
            }
            return previousItems.map(item => item.id === id ? { ...item, quantity: noOfItem } : item)
        })
    }, [removeItem])

    const value = useMemo(() => {
        return {
            addItem,
            subtractItem,
            removeItem,
            editItem,
            items
        }
    }, [addItem, 
        subtractItem,
        removeItem,
        editItem, 
        items])

    return (<ShoppingCartContext.Provider value={value}>
        {children}
    </ShoppingCartContext.Provider>)
}

export default ShoppingCartProvider;