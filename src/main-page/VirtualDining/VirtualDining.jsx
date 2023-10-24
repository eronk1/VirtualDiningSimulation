import React from 'react'
import {useState, useEffect} from 'react'
import './VirtualDining.css'
import MainPlayer from './Player/MainPlayer'
import OtherPlayer from './Player/OtherPlayer.jsx'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let navigate = useNavigate();
    useEffect(()=>{
        if(!props.authStatus){
            navigate('/Login');
        }
    })
    let {recievedMessage} = props;
    useEffect(()=>{
        if(recievedMessage){
            console.log(Error('water'))
            const myDiv = document.getElementById(`${recievedMessage[0]}OP`);
            myDiv.textContent = `${recievedMessage[1]}`;
        }
    },[recievedMessage])
    let theMainPlayer = props.mainPlayer;
    const players = props.players;
    const renderPlayers = () => {
        const uniqueUsernames = new Set();
        for (let i = players.length - 1; i >= 0; i--) {
        const player = players[i];
        if (uniqueUsernames.has(player.username)) {
            // Remove the duplicate by splicing it from the array
            players.splice(i, 1);
        } else {
            uniqueUsernames.add(player.username);
        }
        }

        return players.map((player, index) => (
          <OtherPlayer key={index} username={player.username} gender={player.gender} message={player.message} position={player.position} />
        ));
      }
    if(props.authStatus){
        return (
            <div id='virtualDiningParent'>
                <MainPlayer mcValue={props.mcValue} mainPlayer={theMainPlayer} />
                {renderPlayers()}
                <div className='inputParent'>
                    <input className='mcInput' type="text" onChange={(e) => props.message(e.target.value)} />
                    <button onClick={props.handleMessage} className='mcButton'>Submit</button>
                </div>
            </div>
        )
    }
}