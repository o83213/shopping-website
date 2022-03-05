import classes from './ProductItem.module.css'
import { getStorage, ref, getDownloadURL } from '../../firebase'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartAction } from '../../store/cart-slice'
import { useHistory } from 'react-router-dom'
const ProductItem = (props) => {
  const [url, setUrl] = useState()
  const productQuantityRef = useRef()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const history = useHistory()
  useEffect(() => {
    const fetchURL = async () => {
      const storage = getStorage()
      const reference = ref(storage, props.imgURL)
      const res = await getDownloadURL(reference)
      setUrl(res)
    }
    fetchURL()
  }, [props.imgURL])
  const addToCartHandler = () => {
    if (!isLoggedIn) {
      history.replace('/auth')
      return
    }
    const quantity = +productQuantityRef.current.value
    console.log(quantity)
    const newProduct = {
      id: props.id,
      name: props.name,
      price: props.price * (1 - props.discount),
      quantity: quantity,
      totalPrice: props.price * (1 - props.discount) * quantity,
    }
    console.log(newProduct)
    dispatch(cartAction.addItemToCart(newProduct))
  }
  return (
    <div className={classes['box']}>
      <span className={classes['discount']}>{`${(
        props.discount * 100
      ).toFixed()}%`}</span>
      <img src={url} alt="" />
      <h3>{props.name}</h3>
      <div className={classes['price']}>
        {`$${(props.price * (1 - props.discount)).toFixed(1)}`}{' '}
        <span> {`$${props.price}`} </span>
      </div>
      <div className={classes['quantity']}>
        <span>Quantity: </span>
        <input
          type="number"
          min="1"
          max="100"
          defaultValue="1"
          step="1"
          ref={productQuantityRef}
        />
        <span> /Kg </span>
      </div>
      <button className="Button" onClick={addToCartHandler}>
        Add to cart
      </button>
    </div>
  )
}
export default ProductItem
