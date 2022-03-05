import { productAction } from './product-slice'
export const fetchProductData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
      )
      const data = await response.json()
      dispatch(productAction.addProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}
