import React from 'react'
import CartItem from './CartItem'
import {useGlobalContext} from '../context'


const Home = () => {
    const {cart} = useGlobalContext()

    return (
        <section>
        {cart.map((item) => {
            return <CartItem key={item.id} {...item} />
        })}
        </section>
    )
}

export default Home
