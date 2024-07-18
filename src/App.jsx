import { useState, useEffect } from 'react'
import './App.css'
import { Route , Routes, redirect } from "react-router-dom"
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './main-page/Home/Home'
import VirtualDining from './main-page/VirtualDining/VirtualDining'
import io from 'socket.io-client'

const socket = io('https://vdrs-backend.cags2.com');

function App() {
  const [userX,setX] = useState(0);
  const [userY,setY] = useState(0);
  const [players, updatePlayers] = useState([]);
  const [loggedValue, setLoggedValue] = useState(null);
  let mainPlayer = {username:'TheMC',position:{x:[userX, setX],y:[userY, setY]}, gender:'none',message:'Hello pro sir'};
  let count = 0;
  useEffect(() => {
    let onConnect = () => {
      count++;
      //console.log('Connected to server'+count);
    }
    socket.on('connect', onConnect);
    return () => {
      socket.off('connect', onConnect);
    }
  },[])
  useEffect(() => {
    let onPU = (change)=>{
      //console.log(change.position)
      let player = players.find(player => player.username === change.username);
      if(player){
        //console.log('water')
        const updatedPlayer = { ...player, position: { x: change.position[0], y: change.position[1] } };
        const updatedPlayers = players.map(p => (p.username === player.username ? updatedPlayer : p));
        updatePlayers(updatedPlayers);
      }else{
        socket.emit('userUpdates', socket.id )
      }
    }
    socket.on('outsideUserPositionUpdate',onPU)
    return () => {
      socket.off('outsideUserPositionUpdate',onPU);
    }
  },[]);
  
  useEffect(() => {
    let onUsersUpdated = users => {
      let updatedPlayers = users.filter(user => user.username !== loggedValue.username);
      //console.log(updatedPlayers)
      updatePlayers(updatedPlayers);
    }
    socket.on('usersUpdated', onUsersUpdated)
    return () => {
      socket.off('usersUpdated', onUsersUpdated)
    }
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
  useEffect(() => {
    const serverUrl = 'https://vdrs-backend.cags2.com/checkAuth'; // Replace with your server's URL and endpoint
    fetch(serverUrl, { method: 'GET' , credentials: 'include',headers: {'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setLoggedValue(data);
        //console.log(data);
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
      //console.log(userX, userY)
      //console.log(count)
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
    document.getElementById('checkInput').value = ''
    socket.emit('sendMessage', [loggedValue.username, message]);
  }
  let [recievedMessage, changeRecievedMessage] = useState();
  socket.on('recieveMessage', message => {
    //console.log(message);
    changeRecievedMessage(message)
  });
  
  useEffect(() => {
    let onEatingFood = message => {
      //console.log(message)
      if(message[1]=='hamburger'){
        let audio = new Audio('/eatingSound/nom.mp3')
        //console.log('eating');
        audio.play();
        document.getElementById(message[0]+"OO").src="/menu/hamburger.png";
      }else if(message[1]=='steak'){
        let audio = new Audio('/eatingSound/minecraft.mp3')
        audio.play();
        document.getElementById(message[0]+"OO").src="/menu/steak.png";
      }else if(message[1]=='ice cream'){
        let audio = new Audio('/eatingSound/yummy.mp3')
        audio.play();
        document.getElementById(message[0]+"OO").src="/menu/iceCream.png";
      }else if(message[1]=='applePie'){
        let audio = new Audio('/eatingSound/nom.mp3')
        audio.play();
        document.getElementById(message[0]+"OO").src="/menu/applePie.png";
      }
      setTimeout(function() {
        document.getElementById(message[0] + "OO").src = "";
      }, 2000);
    }
    socket.on('eatingFood',onEatingFood);
    return () => {
      socket.off('eatingFood',onEatingFood);
    }
  },[])
  let [eatClicked, changeEatClicked] = useState(false);
  let handleEatClicked = (val) =>{
    socket.emit('eating', [loggedValue.username, val]);
  }
  return (
    <Routes>
      <Route path="/" element={<SignUp setLoggedValue={setLoggedValue} setAuthStatus={setAuthenticated} authStatus={isAuthenticated} inputSignUp={signUpInputs} />} />
      <Route path="/Login" element={<Login setLoggedValue={setLoggedValue} setAuthStatus={setAuthenticated} authStatus={isAuthenticated} inputLogin={loginInputs} />} />
      <Route path="/home" element={<Home authStatus={isAuthenticated} />} />
      <Route path="/virtualDining" element={<VirtualDining handleEat={handleEatClicked} mcValue={loggedValue} recievedMessage={recievedMessage} message={changeMessage} handleMessage={handleMessage} authStatus={isAuthenticated} mainPlayer={mainPlayer} players={players} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
