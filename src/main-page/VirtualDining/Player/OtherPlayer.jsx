import React from 'react'
import {useEffect} from 'react'
import './OtherPlayer.css'
export default function OtherPlayer(props) {
  const block = document.getElementById('otherPlayerParent');
  const {username, gender, message, position} = props;
  useEffect(() =>{
    console.log(position)
    console.log(username)
  },[position])
  return (
    <div
        id="otherPlayerParent"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: '50px', // Set your desired width
          height: '50px', // Set your desired height
          position: 'relative',
        }}
      ></div>
  )
}
