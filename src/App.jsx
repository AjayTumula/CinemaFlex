
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Home from './components/Home'



function App() {

  let navigate = useNavigate();

  
 
  return (
   <div>
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/home' element={<Home />}/>
   </Routes>
   </div>
  )
}

export default App
