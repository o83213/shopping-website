import RecordModal from '../UI/RecordModal'
import { Fragment } from 'react'
import classes from './RecordDetail.module.css'
const RecordDetail = (props) => {
  const data = props.recordData
  const modalActions = (
    <div>
      <button onClick={props.onClose}>Close</button>
    </div>
  )
  const recorditems = data.items.map((item) => {
    return (
      <div key={item.id}>
        <span className={classes.itemName}>{item.name}:</span> $
        {item.price.toFixed(2)} x {item.quantity}Kg
      </div>
    )
  })
  const recordModalContent = (
    <Fragment>
      <div className={classes.content}>
        <div className={classes.address}>
          <h2>Delivery Address</h2>
          <div className={classes.addressContent}>
            <h3>{data.name}</h3>
            <div>{data.street}</div>
            <div>
              {data.city}-{data.postalCode}
            </div>
          </div>
        </div>
        <div className={classes.items}>
          <h3>items:</h3>
          {recorditems}
          <h3>totalQuantity: {data.totalQuantity}kg</h3>
          <h3>totalPrice: {data.totalPrice.toFixed(2)}💲</h3>
        </div>
      </div>
      <div className={classes.action}>{modalActions}</div>
    </Fragment>
  )
  return <RecordModal onClose={props.onClose}>{recordModalContent}</RecordModal>
}
export default RecordDetail
