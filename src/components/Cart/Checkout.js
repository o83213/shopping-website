import { useState } from 'react'

import classes from './Checkout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { recordAction } from '../../store/record-slice'
import { cartAction } from '../../store/cart-slice'
const isEmpty = (value) => value.trim() === ''
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  })
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  )
  const [enteredName, setEnteredName] = useState('')
  const [enteredStreet, setEnteredStreet] = useState('')
  const [enteredCity, setEnteredCity] = useState('')
  const [enteredPostalCode, setEnteredPostalCode] = useState('')
  const confirmHandler = (event) => {
    event.preventDefault()
    console.log('Form Confirm!')
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid

    if (!formIsValid) {
      return
    }
    const newRecordData = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
      items,
      totalQuantity,
      totalPrice,
    }
    console.log(newRecordData)
    dispatch(recordAction.addNewRecord(newRecordData))
    dispatch(cartAction.clearCartAndSend())
    setEnteredName('')
    setEnteredStreet('')
    setEnteredPostalCode('')
    setEnteredCity('')
    ///////////////////////////////////
    props.onClose()
  }

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={(event) => setEnteredName(event.target.value)}
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={(event) => setEnteredStreet(event.target.value)}
        />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={(event) => setEnteredPostalCode(event.target.value)}
        />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={(event) => setEnteredCity(event.target.value)}
        />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  )
}

export default Checkout
