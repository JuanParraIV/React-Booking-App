import React from 'react'
import './MailList.modules.css'

export const MailList = () => {
  return (
    <div className='mail'>
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="emailInputContainer">
        <input className="emailInput" type="text" placeholder="Your email" />
        <button className="emailButton">Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
