import React from 'react'
import {useState, useEffect} from 'react'
import './VirtualDining.css'
import MainPlayer from './Player/MainPlayer'
import OtherPlayer from './Player/OtherPlayer.jsx'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let [focusState, changeFocusState] = useState(false);
    useEffect(() => {
        const checkFocus = document.getElementById('checkInput');
        
        if (checkFocus) {
            checkFocus.addEventListener('focus', () => {
                changeFocusState(true);
            });
            
            checkFocus.addEventListener('blur', () => {
                changeFocusState(false);
            });
        }
    
        return () => {
            // Clean up the event listeners here if needed
            if (checkFocus) {
                checkFocus.removeEventListener('focus', () => {
                    changeFocusState(true);
                });
    
                checkFocus.removeEventListener('blur', () => {
                    changeFocusState(false);
                });
            }
        };
    }, []);
    let navigate = useNavigate();
    useEffect(()=>{
        if(!props.authStatus){
            navigate('/Login');
        }
    })
    let {recievedMessage} = props;
    useEffect(()=>{
        if(recievedMessage){
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
                <div id='playArea'>
                    <MainPlayer focusState={focusState} mcValue={props.mcValue} mainPlayer={theMainPlayer} />
                    {renderPlayers()}
                </div>
                <div id='virtualDiningBottomNav'>
                    <div className='inputParent'>
                        <input placeholder='message' id='checkInput' className='mcInput' type="text" onChange={(e) => props.message(e.target.value)} />
                        <button onClick={props.handleMessage} className='mcButton'>Submit</button>
                    </div>
                    <div className='menu'>
                        <button onClick={()=>props.handleEat('hamburger')} >Hamburger</button>
                        <button onClick={()=>props.handleEat('steak')} >Steak</button>
                        <button onClick={()=>props.handleEat('ice cream')} >Ice cream</button>
                    </div>
                </div>
            </div>
        )
    }
}