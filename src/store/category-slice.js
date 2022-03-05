import { createSlice } from '@reduxjs/toolkit'
const initialState = { items: [] }

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory(state, action) {
      // taking an object data
      for (const objArray of Object.entries(action.payload)) {
        const value = objArray[1]
        state.items.push(value)
      }
      // state.items.forEach((item) => console.log(item))
    },
  },
})

export default categorySlice
export const categoryAction = categorySlice.actions
