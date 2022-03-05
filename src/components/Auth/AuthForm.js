import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import classes from './AuthForm.module.css'
import { authAction } from '../../store/auth-slice'
import { fetchCartData } from '../../store/cart-action'
import { fetchRecordData } from '../../store/record-action'
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }
  const fetchingData = async (url) => {
    const enteredEamil = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    // optional: add validation
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEamil,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      })
      ////// Fail to fetching
      if (!res.ok) {
        console.log(res)
        throw new Error('Authentication failed!')
      }
      ////// success to fetching
      const data = await res.json()
      const welcomeMessage = isLogin
        ? `Welcome back ${data.email}`
        : `Sign up successful😊😊😊, user: ${data.email}`
      alert(welcomeMessage)
      dispatch(authAction.login({ token: data.idToken, email: data.email }))
      dispatch(fetchCartData(data.email))
      dispatch(fetchRecordData(data.email))
      history.replace('/')
    } catch (error) {
      alert(error.message)
    }
  }
  const submitHandler = (event) => {
    event.preventDefault()

    setIsLoading(true)
    let url
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOOqIZoFc5OGH9a3X6k-f8AyHXDrzwHnM'
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOOqIZoFc5OGH9a3X6k-f8AyHXDrzwHnM'
    }

    fetchingData(url)
    setIsLoading(false)
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
