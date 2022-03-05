import { useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const [itemNumber, setItemNumber] = useState(0)
  const items = useSelector((state) => state.cart.items)
  const btnClasses = `Button ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    const numberOfCartItems = items.reduce((curNumber, item) => {
      return curNumber + item.quantity
    }, 0)
    setItemNumber(numberOfCartItems)
    /////////////////////////////////////////
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <FaShoppingCart size="1.3rem" />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemNumber}</span>
    </button>
  )
}

export default HeaderCartButton
