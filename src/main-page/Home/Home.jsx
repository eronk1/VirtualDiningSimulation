import React from 'react'
import { useState, useEffect } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function Home(props) {
  let navigate = useNavigate();
  useEffect(()=>{
    if(!props.authStatus){
      navigate('/login');
    }
  })
  const handleClick = () => {
    const serverUrl = 'https://vdrs-backend.cags2.com/logout'; // Replace with your server's URL and endpoint

    fetch(serverUrl, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        if (data.valid) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };
  if(props.authStatus){
    return (
      <div id='homeParent'>
            <Link className='virtualDiningLink' to="/virtualDining">Start Dining</Link>
            <button onClick={handleClick} id='homPageLogOutButton'>Logout</button>
      </div>
    )
  }
}
