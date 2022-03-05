import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartModal from '../UI/CartModal'
import CartItem from './CartItem'
import classes from './Cart.module.css'
import Checkout from './Checkout'
import { cartAction } from '../../store/cart-slice'

const Cart = (props) => {
  const [cartItem, setCartItem] = useState([])
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  console.log('Cart:')
  console.log(cart)
  const totalQuantity = `$${cart.totalPrice.toFixed(2)}`
  const hasItems = cart.items.length > 0
  useEffect(() => {
    console.log(cart.items)
    setCartItem(cart.items)
  }, [cart])
  const cartItemRemoveHandler = (id) => {
    console.log(id)
    dispatch(cartAction.removeItemFromCart(id))
  }

  const cartItemAddHandler = (item) => {
    console.log(item)
    const adjustItemtoOne = Object.assign({}, item)
    adjustItemtoOne.quantity = 1
    adjustItemtoOne.totalPrice = adjustItemtoOne.price
    dispatch(cartAction.addItemToCart(adjustItemtoOne))
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch(
      'https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cart.items,
        }),
      },
    )
    setIsSubmitting(false)
    setDidSubmit(true)
  }
  const closeCheckoutHandler = () => {
    setIsCheckout(false)
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartItem.map((item) => {
        console.log(item)
        console.log(item.id)
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.quantity}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        )
      })}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes['button--alt']} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalQuantity}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          onClose={closeCheckoutHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  )

  return (
    <CartModal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </CartModal>
  )
}

export default Cart
