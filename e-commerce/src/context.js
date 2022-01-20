import React, {useContext, useReducer, useEffect} from 'react'
import cartItem from './data';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
    cart: cartItem,
    shopCart : [],
    total_items: 0,
    totle_amount:0,
}


export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const toggleAmount = (type, id) => {
        dispatch({type: "TOGGLE_AMOUNT", payload: { type, id }})
    }
    
    const addToCart = (id, price, title, amount) => {
        dispatch({type: "ADD_TO_CART", payload: {id, price, title, amount }})
    }
    const deleteCart = () => {
        dispatch({type: "DELETE_CART"})
    }

    useEffect(() => {
        dispatch({type: "COUNT_CART_TOTALS"})
    }, [state.shopCart])
    
    return <AppContext.Provider value={{
        ...state,
        toggleAmount,
        addToCart,
        deleteCart
    }}>
        {children}
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}
