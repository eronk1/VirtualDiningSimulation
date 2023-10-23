import React from 'react'
import { useState, useEffect } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function Home(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if(!props.authStatus){
        navigate('/');
    }
  },[])
  if(props.authStatus){
    return (
      <div id='homeParent'>
            <Link className='virtualDiningLink' to="/virtualDining">Start Dining</Link>
      </div>
    )
  }
}
