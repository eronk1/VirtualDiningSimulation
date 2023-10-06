import React from 'react'
import { useState, useEffect } from 'react'
import './SignUp.css'
import {Link} from 'react-router-dom'
import StarterHeader from '../SharedStarterPage/StarterHeader'

export default function SignUp() {
  const [femaleId, setFemaleId] = useState(["femaleImgParent","femaleImg"]);
  const [maleId, setmaleId] = useState(["maleImgParent","maleImg"]);
  document.getElementById("femaleParent").addEventListener("click", () => {
    if(maleId[0]== "maleImgParentOn"){
      setmaleId(["maleImgParent","maleImg"]);
      setFemaleId(["femaleImgParentOn","femaleImgOn"]);
      console.log(1)
    }else if(femaleId[0] == "femaleImgParentOn"){
      setFemaleId(["femaleImgParent","femaleImg"]);
      console.log(2)
    }else{
      setFemaleId(["femaleImgParentOn","femaleImgOn"]);
      console.log(femaleId[0])
    }

  })

  return (
    <div id='SignUpParent'>
      <StarterHeader topRightButtonLink="/Login" topRightButtonValue="Login" />
      <div id='signUpPageContainer'>
        <p className='signUpText'>SIGN UP AND START DINING</p>
        <div className='inputParent'>
          <p className='inputLabel'>Choose Username</p>
          <input className='input' type="text" placeholder='VDRS_Pro123' />
        </div>
        <div className='inputParent'>
          <p className='inputLabel'>Choose Password</p>
          <input maxLength={48} className='input' type='password' placeholder='At least 8 characters' />
        </div>
        <div className='inputParent'>
          <p className='inputLabel'>Confirm Password</p>
          <input maxLength={48} className='input' type='password' placeholder='At least 8 characters' />
        </div>
        <div className='genderParent'>
          <p className='chooseGender'>Choose Gender (Optional)</p>
          <div id='femaleParent' className={femaleId[0]}>
            <svg id={femaleId[1]} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80v-240H280l122-308q10-24 31-38t47-14q26 0 47 14t31 38l122 308H560v240H400Zm80-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/></svg>
          </div>
          <div id='maleParent' className={maleId[0]}>
            <svg id={maleId[1]} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80v-280h-80v-240q0-33 23.5-56.5T400-680h160q33 0 56.5 23.5T640-600v240h-80v280H400Zm80-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/></svg>
          </div>
        </div>
        
      </div>
    </div>
  )
}
