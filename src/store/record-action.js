import { recordAction } from './record-slice'
export const fetchRecordData = (email) => {
  return async (dispatch) => {
    try {
      const userEmail = email.replace('.', '')
      const response = await fetch(
        `https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/record/${userEmail}.json`,
      )
      const data = await response.json()
      dispatch(recordAction.replaceRecordData(data))
    } catch (error) {
      console.error(error)
    }
  }
}
