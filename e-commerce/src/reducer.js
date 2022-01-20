

const reducer =  (state, action) => {
    if (action.type === 'TOGGLE_AMOUNT') {
        const tempCart = state.cart.map((cartItem) => {
            if (cartItem.id ===  action.payload.id) {
                if (action.payload.type === 'inc') {
                    return {...cartItem, amount: cartItem.amount + 1 }
                }
                if (action.payload.type === 'dec' && cartItem.amount > 0) {
                    return {...cartItem, amount: cartItem.amount - 1 }
                }
                return cartItem
            }
        })
        return {...state, cart: tempCart }
    }
    if (action.type === 'ADD_TO_CART') {
        const {id, price, title,amount} = action.payload;
        const newItem = {
            id,
            price,
            title,
            amount
        }
        return {...state, shopCart:[...state.shopCart, newItem]}
    }
    if (action.type === 'COUNT_CART_TOTALS') {
        const {total_items, total_amount} = state.cart.reduce((total, cartitem) => {
            const {amount, price} = cartitem
            total.total_items += amount
            total.total_amount += price * amount
            return total
        }, {
            total_items: 0,
            total_amount: 0,
        })
        return {...state, total_items, total_amount}  
    }
    if (action.type === 'DELETE_CART') {
        const tempCart = state.cart.map((cartItem) => {
            return {...cartItem, amount: 0}
        })
        return {...state, cart:tempCart ,shopCart: [] }
    }
    return new Error('no matching action type')
}

export default reducer;