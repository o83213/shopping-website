import RecordList from './RecordList'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'
const AllRecord = (props) => {
  const { records } = useSelector((state) => state.record)
  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}>Shopping Record</h1>
      <RecordList records={records} />
    </Fragment>
  )
}
export default AllRecord
