import classes from './BannerItem.module.css'
import { useDispatch } from 'react-redux'
import { productAction } from '../../store/product-slice'
import { useHistory } from 'react-router-dom'

const BannerItem = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const changeSortingHandler = () => {
    dispatch(
      productAction.changeSorting({
        sortingType: 'discount',
        sortingValue: props.discount,
      }),
    )
    history.replace('/products')
  }
  return (
    <div className={classes['banner']}>
      <img src={props.imgUrl} alt="" />
      <div className={classes.content}>
        <h3>{props.message}</h3>
        <p>{(props.discount * 100).toFixed()}% off</p>
        <button className="Button" onClick={changeSortingHandler}>
          check out
        </button>
      </div>
    </div>
  )
}
export default BannerItem
