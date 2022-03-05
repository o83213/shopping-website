import { createSlice } from '@reduxjs/toolkit'
// const initialState = { items: [], totalQuantity: 0, changed: false }
const initialState = {
  email: '',
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
}
const sendCartData = async (cart) => {
  try {
    console.log(cart)
    const userEmail = cart.email.replace('.', '')
    const response = await fetch(
      `https://shoppingwebsite-22c78-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${userEmail}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalPrice: cart.totalPrice,
        }),
      },
    )
    if (!response.ok) {
      throw new Error('Something went wrong?')
    }
    console.log('send cart data success!')
  } catch {
    console.log('send cart data fail!')
  }
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.changed = true
      const newItem = action.payload
      const email = localStorage.getItem('email')
      console.log(`newItem:`)
      console.log(newItem)
      console.log(state.items)
      const existingItem = state.items.find((item) => {
        console.log(item.id)
        console.log(newItem.id)
        return item.id === newItem.id
      })
      console.log(`existingItem:`)
      console.log(existingItem)
      state.totalQuantity += newItem.quantity
      state.totalPrice += newItem.totalPrice
      if (!existingItem) {
        console.log('Adding new item')
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.totalPrice,
        })
      } else {
        console.log('Adding existing item')
        console.log(existingItem.quantity)
        existingItem.quantity += newItem.quantity
        existingItem.totalPrice += existingItem.price
      }
      sendCartData({
        items: state.items,
        totalQuantity: state.totalQuantity,
        email: email,
        totalPrice: state.totalPrice,
      })
    },
    removeItemFromCart(state, action) {
      state.changed = true
      const email = localStorage.getItem('email')
      const id = action.payload
      console.log(id)
      const existingItem = state.items.find((item) => item.id === id)
      console.log(existingItem)
      state.totalQuantity--
      state.totalPrice -= existingItem.price
      console.log(state.totalQuantity)
      console.log(state.totalPrice)
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
      sendCartData({
        items: state.items,
        totalQuantity: state.totalQuantity,
        email: email,
        totalPrice: state.totalPrice,
      })
    },
    replaceCart(state, action) {
      if (action.payload.items) {
        const temp = []
        for (const objArray of Object.entries(action.payload.items)) {
          const value = objArray[1]
          temp.push(value)
        }
        state.items = temp
      }
      state.totalQuantity = action.payload.totalQuantity
        ? action.payload.totalQuantity
        : 0
      state.totalPrice = action.payload.totalPrice
        ? action.payload.totalPrice
        : 0
    },
    clearCart(state) {
      ///////////////////////////////
      state.email = localStorage.getItem('email')
      state.items = initialState.items
      state.totalQuantity = initialState.totalQuantity
      state.totalPrice = initialState.totalPrice
      state.changed = initialState.changed
      ///////////////////////////////
    },
    clearCartAndSend(state) {
      ///////////////////////////////
      state.email = localStorage.getItem('email')
      state.items = initialState.items
      state.totalQuantity = initialState.totalQuantity
      state.totalPrice = initialState.totalPrice
      state.changed = initialState.changed
      ///////////////////////////////
      sendCartData({
        items: state.items,
        totalQuantity: state.totalQuantity,
        email: state.email,
        totalPrice: state.totalPrice,
      })
    },
  },
})

export const cartAction = cartSlice.actions
export default cartSlice
