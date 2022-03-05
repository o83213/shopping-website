import { useState } from 'react'
import RecordDetail from './RecordDetail'
import classes from './RecordItem.module.css'
const RecordItem = (props) => {
  const [detailIsShown, setDetailIsShown] = useState(false)
  const viewDetailHandler = () => {
    setDetailIsShown(true)
  }
  const hideDetailHandler = () => {
    setDetailIsShown(false)
  }
  return (
    <li className={classes.item}>
      <div>
        <h2>Name: {props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>
            TotalPrice: {props.totalPrice.toFixed(2)}💲
          </span>
          <span className={classes.amount}>
            TotalQuantity: {props.totalQuantity} kg
          </span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={viewDetailHandler}>View Detail</button>
      </div>
      {detailIsShown && (
        <RecordDetail
          onClose={hideDetailHandler}
          recordData={props.recordData}
        />
      )}
    </li>
  )
}
export default RecordItem
