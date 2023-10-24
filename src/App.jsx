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
    if(player){
      const updatedPlayer = { ...player, position: { x: change.position[0], y: change.position[1] } };
      const updatedPlayers = players.map(p => (p.username === player.username ? updatedPlayer : p));
      updatePlayers(updatedPlayers);
    };
  })
  socket.on('newUser', (user) => {
    const userExists = players.some((player) => player.username === user.username);
    let newUser = {...user,message:'', position: {x: user.position[0], y: user.position[1]}}
    if (!userExists) {
      updatePlayers((oldPlayers) => [...oldPlayers, newUser]);
    }
  });
  socket.on('userDisconnected', id=>{
    players.filter(player => player.id !== id);
  })

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [loggedValue, setLoggedValue] = useState(null);
  useEffect(() => {
    const serverUrl = 'http://localhost:3000/checkAuth'; // Replace with your server's URL and endpoint
    fetch(serverUrl, { method: 'GET' , credentials: 'include',headers: {'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setLoggedValue(data);
        console.log(data);
        setAuthenticated(data.valid);
      })
  }, 10000);

  useEffect(() =>{
    if(isAuthenticated && loggedValue){
      socket.emit('newPlayer', loggedValue )
    }
  },[isAuthenticated])
  useEffect(()=>{
    if(loggedValue){
      socket.emit('positionUpdate', {position:[userX, userY], username: loggedValue.username});
      console.log(userX, userY)
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
  let [message, changeMessage] = useState('');
  let handleMessage = (e) =>{
    socket.emit('sendMessage', [loggedValue.username, message]);
  }
  let [recievedMessage, changeRecievedMessage] = useState();
  socket.on('recieveMessage', message => {
    console.log(message);
    changeRecievedMessage(message)
  });
  return (
    <Routes>
      <Route path="/" element={<SignUp setLoggedValue={setLoggedValue} setAuthStatus={setAuthenticated} authStatus={isAuthenticated} inputSignUp={signUpInputs} />} />
      <Route path="/Login" element={<Login setLoggedValue={setLoggedValue} setAuthStatus={setAuthenticated} authStatus={isAuthenticated} inputLogin={loginInputs} />} />
      <Route path="/home" element={<Home authStatus={isAuthenticated} />} />
      <Route path="/virtualDining" element={<VirtualDining mcValue={loggedValue} recievedMessage={recievedMessage} message={changeMessage} handleMessage={handleMessage} authStatus={isAuthenticated} mainPlayer={mainPlayer} players={players} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
