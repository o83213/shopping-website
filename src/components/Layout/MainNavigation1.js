import { Link, useHistory } from 'react-router-dom'
import classes from './MainNavigation1.module.css'
import { FaShip } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { authAction } from '../../store/auth-slice'
import { cartAction } from '../../store/cart-slice'
import { recordAction } from '../../store/record-slice'
const MainNavigation1 = () => {
  const auth = useSelector((state) => state.auth)
  const [authLogin, setauthLogin] = useState(false)
  const dispatch = useDispatch()
  /////
  useEffect(() => {
    setauthLogin(auth.isLoggedIn)
  }, [auth.isLoggedIn])
  /////
  const history = useHistory()
  const authContent = authLogin ? 'Logout' : 'Login'
  const loginHandler = () => {
    history.replace('/auth')
  }
  const logoutHandler = () => {
    dispatch(authAction.logout())
    dispatch(cartAction.clearCart())
    dispatch(recordAction.clearRecord())
    history.replace('/')
  }
  const authActionHandler = () => {
    if (authLogin) {
      logoutHandler()
      return
    }
    loginHandler()
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>
          <span>
            <FaShip />
          </span>
          Mr.Sea
        </div>
      </Link>
      <div>
        {authLogin && (
          <button
            onClick={() => {
              history.replace('/record')
            }}
            className="Button"
          >
            My Purchase
          </button>
        )}
        <button onClick={authActionHandler} className="Button">
          {authContent}
        </button>
      </div>
    </header>
  )
}

export default MainNavigation1
