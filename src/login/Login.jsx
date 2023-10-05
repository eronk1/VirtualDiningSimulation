import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  return (
    <div id='loginPageParent'>
      <header id='loginPageHeading'>
        <Link id='signupButton' to="/">Sign Up</Link>
      </header>
      <div id='loginContainer'>
        <p className='loginText' tabIndex="1">Login to Start</p>
        <input tabIndex="2" className='box inputs' placeholder='Username' type="text" />
        <input tabIndex="3" className='box inputs' placeholder='Password' type="text" />
        <div id='checkRequest'>
          <p className='errorText' >The input was invalid</p>
          <button id='loginButton' tabIndex="4" className='box'>Login</button>
        </div>
        <p className='dhaa'>Dont have an account? <Link to="/">Sign Up</Link></p>
      </div>
    </div>
  )
}
