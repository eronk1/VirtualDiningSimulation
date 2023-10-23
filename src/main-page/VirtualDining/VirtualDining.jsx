import React from 'react'
import {useState, useEffect} from 'react'
import './VirtualDining.css'
import MainPlayer from './Player/MainPlayer'
import OtherPlayer from './Player/OtherPlayer.jsx'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let navigate = useNavigate();
    useEffect(() => {
        if(!props.authStatus){
            navigate('/');
        }
    },[])
    let theMainPlayer = props.mainPlayer;
    const players = props.players;
    const renderPlayers = () => {
        // Use the map function to create an array of React components
        return players.map((player, index) => (
          <OtherPlayer key={index} username={player.username} gender={player.gender} message={player.message} position={player.position} />
        ));
      }
    if(props.authStatus){
        return (
            <div id='virtualDiningParent'>
                <MainPlayer mainPlayer={theMainPlayer} />
                {renderPlayers()}
            </div>
        )
    }
}