import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  token: '',
  email: '',
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    retrieveStoredToken(state) {
      const storedToken = localStorage.getItem('token')
      const storedEmail = localStorage.getItem('email')
      if (storedToken) {
        state.token = storedToken
        state.email = storedEmail
        state.isLoggedIn = true
      }
    },
    login(state, action) {
      state.token = action.payload.token
      state.email = action.payload.email
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('email', action.payload.email)
    },
    logout(state) {
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },
  },
})

export default authSlice
export const authAction = authSlice.actions
