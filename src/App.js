import { Switch, Route, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
/////
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ContactPage from './pages/ContactPage'
import CategoryPage from './pages/CategoryPage'
import DealPage from './pages/DealPage'
import RecordPage from './pages/RecordPage'
/////
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
////
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductData } from './store/product-action'
import { fetchCategoryData } from './store/category-action'
import { fetchCartData } from './store/cart-action'
import { fetchRecordData } from './store/record-action'
import { authAction } from './store/auth-slice'
import { useHistory } from 'react-router-dom'
function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(fetchProductData())
    dispatch(fetchCategoryData())
    const email = localStorage.getItem('email')
    if (email) {
      dispatch(fetchCartData(email))
      dispatch(fetchRecordData(email))
    }

    dispatch(authAction.retrieveStoredToken())
  }, [dispatch])
  const showCartHandler = () => {
    if (!isLoggedIn) {
      history.replace('/auth')
      return
    }
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return (
    <Layout onShowCart={showCartHandler}>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/products">
          <ProductPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/category">
          <CategoryPage />
        </Route>
        <Route path="/deal">
          <DealPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/record" exact>
          <RecordPage />
        </Route>
        <Route path="/record/:recordId" exact></Route>
        <Route path="/*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
