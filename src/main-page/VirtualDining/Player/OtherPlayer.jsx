import React from 'react'
import {useEffect} from 'react'
import './OtherPlayer.css'
export default function OtherPlayer(props) {
  const block = document.getElementById('otherPlayerParent');
  const {username, gender, message, position} = props;
  console.log(props)
  function getImage(gender){
    if(gender === 'male') return '/PlayerPicture/boy.png'
    if(gender === 'female') return '/PlayerPicture/girl.png'
    if(gender === 'none') return '/PlayerPicture/non.png'
  }
  return (
    <div
        className="otherPlayerParent"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: '50px',
          height: '50px',
        }}
      >
        <div id={username+'OP'}></div>
        <p>{username}</p>
        <img id='mcImg' src={getImage(gender)} alt="failed to load" />
      </div>
  )
}
