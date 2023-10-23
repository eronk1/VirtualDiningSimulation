import { useState, useEffect } from 'react'
import './App.css'
import { Route , Routes, redirect } from "react-router-dom"
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './main-page/Home/Home'
import VirtualDining from './main-page/VirtualDining/VirtualDining'
import io from 'socket.io-client'

const socket = io('http://localhost:3000');

function App() {
  const [userX,setX] = useState(0);
  const [userY,setY] = useState(0);
  const [players, updatePlayers] = useState([]);
  let mainPlayer = {username:'TheMC',position:{x:[userX, setX],y:[userY, setY]}, gender:'none',message:'Hello pro sir'};
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on('outsideUserPositionUpdate',(change)=>{
    let player = players.find(player => player.username === change.username);
    console.log(players)
    console.log(player)
    if(player){
      const updatedPlayer = { ...player, position: { x: change.position.x, y: change.position.y } };
      const updatedPlayers = players.map(p => (p.username === player.username ? updatedPlayer : p));
      updatePlayers(updatedPlayers);
    };
  })
  socket.on('newUser', (user) => {
    const userExists = players.some((player) => player.username === user.username);
  
    if (!userExists) {
      updatePlayers((oldPlayers) => [...oldPlayers, user]);
    }
  });
  socket.on('userDisconnected', id=>{
    players.filter(player => player.id !== id);
  })

  let settings = {
    method: "GET"
  };
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loggedValue, setLoggedValue] = useState(null);

  useEffect(() =>{
    if(isAuthenticated && loggedValue){
      socket.emit('newPlayer', loggedValue )
    }
  },[isAuthenticated])
  useEffect(()=>{
    console.log(userX, userY)
    if(loggedValue){
      socket.emit('positionUpdate', {position:[userX, userY], username: loggedValue.username});
    }
  },[userX,userY])
  
  const signUpInputs = useState({
    inputUsername: "",
    inputPassword: "",
    inputConfirmPassword: "",
    inputGender: "none"
  });
  const loginInputs = useState({
    inputUsername: "",
    inputPassword: ""
  });
  return (
    <Routes>
      <Route path="/" element={<SignUp setLoggedValue={setLoggedValue} authStatus={[isAuthenticated,setAuthenticated]} inputSignUp={signUpInputs} />} />
      <Route path="/Login" element={<Login setLoggedValue={setLoggedValue} authStatus={[isAuthenticated,setAuthenticated]} inputLogin={loginInputs} />} />
      <Route path="/home" element={<Home authStatus={isAuthenticated} />} />
      <Route path="/virtualDining" element={<VirtualDining authStatus={isAuthenticated} mainPlayer={mainPlayer} players={players} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
