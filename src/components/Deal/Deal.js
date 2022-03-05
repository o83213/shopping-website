import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classes from './Deal.module.css'
const Deal = (props) => {
  const [timmer, setTimmer] = useState({})
  useEffect(() => {
    const endTime = new Date(2023, 1, 1, 0, 0, 0)
    const countingTimmer = setInterval(() => {
      const now = new Date()
      const remainingTime = (endTime - now) / 1000
      const day = Math.floor(remainingTime / 86400)
      const hour = Math.floor((remainingTime % 86400) / 3600)
      const minute = Math.floor((remainingTime % 3600) / 60)
      const second = Math.floor(remainingTime % 60)
      setTimmer({ day, hour, minute, second })
    }, 1000)
    return () => {
      clearInterval(countingTimmer)
    }
  }, [])
  return (
    <section className={classes.deal} id="deal">
      <div className={classes.content}>
        <h3 className={classes.title}>Deal Of The Day</h3>
        <p>This is special offer for new settler, only end in Dec.31!</p>
        <div className={classes['count-down']}>
          <div className={classes.box}>
            <h3>{timmer.day}</h3>
            <span>day</span>
          </div>
          <div className={classes.box}>
            <h3>{timmer.hour}</h3>
            <span>hour</span>
          </div>
          <div className={classes.box}>
            <h3>{timmer.minute}</h3>
            <span>minute</span>
          </div>
          <div className={classes.box}>
            <h3>{timmer.second}</h3>
            <span>second</span>
          </div>
        </div>
      </div>
      <div className={classes.buttonBox}>
        <Link to="/products" className="Button">
          check the products
        </Link>
      </div>
    </section>
  )
}
export default Deal
