import { cartAction } from './cart-slice'
export const fetchCartData = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
      )
      const data = await response.json()
      // console.log(data)
      const userEmail = email.replace('.', '')
      // console.log(userEmail)
      const userData = data[userEmail]
      // console.log(userData)
      dispatch(cartAction.replaceCart(userData))
    } catch (error) {
      console.error(error)
    }
  }
}
