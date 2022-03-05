import { Link } from 'react-router-dom'
import classes from './MainNavigation2.module.css'
import HeaderCartButton from './HeaderCartButton'
import { useDispatch } from 'react-redux'
import { productAction } from '../../store/product-slice'
const MainNavigation2 = (props) => {
  const dispatch = useDispatch()
  return (
    <header className={classes.header}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => {
                  dispatch(productAction.changeSorting(''))
                }}
              >
                Products
              </Link>
            </li>
            <li>
              <Link to="/deal">Deal</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <HeaderCartButton onClick={props.onShowCart} />
      </div>
    </header>
  )
}

export default MainNavigation2
