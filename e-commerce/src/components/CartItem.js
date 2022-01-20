import React, {useState, useEffect} from 'react'
import imageProduct1 from '../images/image-product-1.jpg'
import imageProduct2 from '../images/image-product-2.jpg'
import imageProduct3 from '../images/image-product-3.jpg'
import imageProduct4 from '../images/image-product-4.jpg'
import {FaPlus, FaMinus} from 'react-icons/fa'
import { FiShoppingCart, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { useGlobalContext } from '../context'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
    imageProduct1,
    imageProduct2,
    imageProduct3,
    imageProduct4,
]

const CartItem = ({id, amount, desc, price, title}) => {
    const { toggleAmount, addToCart} = useGlobalContext()
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        const lastIndex = images.length - 1
        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex ) {
            setIndex(0)
        }
    }, [index, images])

    return (
        <>
        <div className='img-container'>
        <img src={images[index]} alt='' className='image' onClick={() => setIsOpen(true)} />
        <button className='prev' onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
        </button>
        <button  className='next' onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
        </button>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
        
        <div className='gallery'>
            {images.map((image, imageIndex) => {
                let position = "nextSlide"
                if ( imageIndex === index) {
                    position = "activeSlide"
                }
                if (imageIndex === index - 1 || 
                    (index ===0 && imageIndex === images.length -1 ) ) {
                    position = "lastSlide"
                }
                return (
                    <div key={imageIndex} className={position}>
                        <img
                        src={image}
                        alt=''
                        onClick={() => setIndex(imageIndex)}
                        className={`${imageIndex === index ? 'active' : null }`}
                        />
                    </div>
                )
            })}
        </div>
    </div>
    <div className='info'>
        <h4>SNEAKER COMPANY</h4>
        <h1> {title} </h1>
        <p>
            {desc}
        </p>
        <div className='product-price'>
            <span className='price'>${price}.00</span>
            <span className='solde'>50%</span>
        </div>
        <p>$250.00</p>
        <div className='btn-container'>
            <div className='cart-btn'>
                <button type='button' onClick={() => toggleAmount('dec', id)}>
                    <FaMinus />
                </button>
                <span> {amount} </span>
                <button type='button' onClick={() => toggleAmount('inc', id)}>
                    <FaPlus />
                </button>
            </div>
                <button disabled={amount === 0} className='btn' onClick={() => addToCart(id, price, title, amount)}>
                    <FiShoppingCart className='btn-icon'/> Add to cart
                </button>
        </div>
    </div>
    </>
    )
}

export default CartItem
