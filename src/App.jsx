import { useState } from 'react'
import './App.css'
import { Route , Routes } from "react-router-dom"
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
