import { Fragment } from 'react'
import RecordItem from './RecordItem'
import classes from './RecordList.module.css'
const RecordList = (props) => {
  const contents = props.records.map((data) => {
    return (
      <ul className={classes.list} key={Math.random()}>
        <RecordItem
          name={data.name}
          totalQuantity={data.totalQuantity}
          totalPrice={data.totalPrice}
          recordData={data}
        />
      </ul>
    )
  })
  return <Fragment>{contents}</Fragment>
}

export default RecordList
