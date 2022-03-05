import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  records: [],
  email: '',
}
const sendRecordData = async (record) => {
  try {
    console.log(record)
    const userEmail = localStorage.getItem('email').replace('.', '')
    console.log(userEmail)
    const response = await fetch(
      `https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/record/${userEmail}.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: record.name,
          street: record.street,
          postalCode: record.postalCode,
          city: record.city,
          items: record.items,
          totalQuantity: record.totalQuantity,
          totalPrice: record.totalPrice,
        }),
      },
    )
    if (!response.ok) {
      throw new Error('Something went wrong?')
    }
    console.log('send record data success!')
  } catch {
    console.log('send record data fail!')
  }
}
const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addNewRecord(state, action) {
      const newRecord = action.payload
      const email = localStorage.getItem('email')
      state.records.push(newRecord)
      state.email = email
      sendRecordData(newRecord)
    },
    replaceRecordData(state, action) {
      const email = localStorage.getItem('email')
      state.email = email
      for (const objArray of Object.entries(action.payload)) {
        const value = objArray[1]
        state.records.push(value)
      }
    },
    clearRecord(state) {
      state.records = initialState.records
      state.email = initialState.email
    },
  },
})

export default recordSlice
export const recordAction = recordSlice.actions
