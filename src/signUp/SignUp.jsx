import React from 'react'
import './SignUp.css'
import {Link} from 'react-router-dom'
import StarterHeader from '../SharedStarterPage/StarterHeader'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  // Add more options to the array as needed
];


export default function SignUp() {
  return (
    <div id='SignUpParent'>
      <StarterHeader topRightButtonLink="/Login" topRightButtonValue="Login" />
      <div id='signUpPageContainer'>
        <p className='signUpText'>Sign Up</p>
        <div>
          <select name="Gender" id="gender">
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
          <p></p>
        </div>
      </div>
    </div>
  )
}
