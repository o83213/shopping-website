import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], sortingType: '', sortingValue: '' }

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeSorting(state, action) {
      state.sortingType = action.payload.sortingType
      state.sortingValue = action.payload.sortingValue
    },
    addProduct(state, action) {
      // taking an object data
      for (const objArray of Object.entries(action.payload)) {
        const value = objArray[1]
        state.items.push(value)
      }
    },
  },
})

export default productSlice
export const productAction = productSlice.actions
