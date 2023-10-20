import { useState } from 'react'
import './App.css'
import { Route , Routes, redirect } from "react-router-dom"
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './Home/Home'

function App() {
  const [count, setCount] = useState(0)
  
  const signUpInputs = useState({
    inputUsername: "",
    inputPassword: "",
    inputConfirmPassword: "",
    inputGender: ""
  });
  
  function handleButtonClick(e) {
    
    let settings = {
        method: "POST",
        body: JSON.stringify(signUpInputs[0]),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("http://localhost:3000/signUp", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
  }
  return (
    <Routes>
      <Route path="/" element={<SignUp buttonClick={handleButtonClick} inputSignUp={signUpInputs} />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
