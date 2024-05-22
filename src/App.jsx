
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import ReadMore from './components/ReadMore'
import Movies from './components/Movies'
import Reviews from './components/Reviews'


function App() {

  return (
   <div>
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/home/*' element={<Home />}/>
   </Routes>
   </div>
  )
}

export default App
