import classes from './ContactForm.module.css'
import { useState } from 'react'
const ContactForm = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredNumber, setEnteredNumber] = useState('')
  const [enteredSubject, setEnteredSubject] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const clearInputHandler = (event) => {
    event.preventDefault()
    setEnteredName('')
    setEnteredEmail('')
    setEnteredNumber('')
    setEnteredSubject('')
    setEnteredMessage('')
  }
  return (
    <section className={classes.contact} id="contact">
      <h1 className={classes.heading}>
        <span>Contact</span> Us
      </h1>

      <form onSubmit={clearInputHandler}>
        <div className={classes['input-box']}>
          <input
            type="text"
            placeholder="name"
            value={enteredName}
            onChange={(event) => {
              setEnteredName(event.target.value)
            }}
          />
          <input
            type="email"
            placeholder="email"
            value={enteredEmail}
            onChange={(event) => {
              setEnteredEmail(event.target.value)
            }}
          />
        </div>

        <div className={classes['input-box']}>
          <input
            type="number"
            placeholder="number"
            value={enteredNumber}
            onChange={(event) => {
              setEnteredNumber(event.target.value)
            }}
          />
          <input
            type="text"
            placeholder="subject"
            value={enteredSubject}
            onChange={(event) => {
              setEnteredSubject(event.target.value)
            }}
          />
        </div>
        <textarea
          placeholder="message"
          name=""
          id=""
          cols="30"
          rows="10"
          value={enteredMessage}
          onChange={(event) => {
            setEnteredMessage(event.target.value)
          }}
        ></textarea>

        <button className="Button" type="submit">
          submit
        </button>
      </form>
    </section>
  )
}
export default ContactForm
