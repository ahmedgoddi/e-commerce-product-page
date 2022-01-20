import React, {useState} from 'react'
import imageAvatar from "../images/image-avatar.png"
import { FiShoppingCart } from 'react-icons/fi'
import { FaBars, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import imageProduct1 from "../images/image-product-1-thumbnail.jpg"
import {useGlobalContext} from '../context'



const Navbar = () => {
    const { shopCart, total_items, total_amount, deleteCart} = useGlobalContext()
    const [toggle, setToggle] = useState(false);
    const [shop, setShop] = useState(false)


    return (
            <nav>
                <div className='navbar'>
                    <div className='nav-container'>
                        <FaBars onClick={() => setToggle(true)} className='toggle' />
                        <h2>sneakers</h2>
                        <div className={toggle ? "sidebar show-sidebar": "sidebar"}>
                            <AiOutlineClose className='close' onClick={() => setToggle(false)}/>
                            <ul className="nav-menu">
                                <li><a href='#'>Collections</a></li>
                                <li><a href='#'>Men</a></li>
                                <li><a href='#'>Women</a></li>
                                <li><a href='#'>About</a></li>
                                <li><a href='#'>Contact</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className='shop-menu'>
                            <div className='cart-container'>
                                <div>
                                    <FiShoppingCart
                                    onClick={() => setShop(true)} 
                                    className='icon'
                                    />
                                    <span className='cart-value'>{total_items}</span>
                            </div>
                            {shop && 
                            <>
                                {shopCart.length > 0 ? shopCart.map((item, index) => {
                                    return  <div key={index} onMouseLeave={() => setShop(false)}  className='cart'>
                                        <h3>Cart</h3>
                                        <hr/>
                                <div className='cart-info'>
                                    <img src={imageProduct1} alt=''/>
                                    <p>{item.title} <br/>
                                    ${item.price}.00 x {item.amount}  <span>${total_amount}.00</span>
                                    </p>
                                    <button onClick={deleteCart} className='btn-trash'>
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <button className='btn-checkout'>
                                    Checkout
                                </button>
                                    </div>
                                }) : <div onMouseLeave={() => setShop(false)}  className='cart'>
                                    <h3>Cart</h3>
                                    <hr/>
                                    <div className='cart-empty'>
                                        <p>Your cart is empty.</p>
                                    </div>
                                </div>
                                }
                                
                            </>
                            }
                            </div>
                            <img className='avatar' src={ imageAvatar } alt=''/>
                        </div>
                </div>
                <div className='line'></div>
            </nav>
    )
}

export default Navbar
