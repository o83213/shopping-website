import { configureStore } from '@reduxjs/toolkit'
import productSlice from './product-slice'
import categorySlice from './category-slice'
import cartSlice from './cart-slice'
import authSlice from './auth-slice'
import recordSlice from './record-slice'
const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    category: categorySlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    record: recordSlice.reducer,
  },
})
export default store
