import { categoryAction } from './category-slice'
export const fetchCategoryData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/categorys.json',
      )
      const data = await response.json()
      // console.log(data)
      dispatch(categoryAction.addCategory(data))
    } catch (error) {
      console.error(error)
    }
  }
}
