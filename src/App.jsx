
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Profile from './components/Profile'
import Movies from './components/Movies'
import Reviews from './components/Reviews'
import ReadMore from './components/ReadMore'
import UserReview from './components/UserReviews'




function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
  }, [])



  return (
   <div>
   <Routes>
    <Route path='/login' element={<Login />}/>
    <Route path='/' element={<Home />}/>
    <Route path="/movies" element={<Movies />} />  
    <Route path="/reviews" element={<Reviews />}/>
    <Route path="/profile" element={<Profile />} /> 
    
    <Route path="reviews/:id" element={<ReadMore />} />


    
                    {/* <Route path="reviews/*" element={<Outlet />}>
                        <Route index element={<Reviews />} />
                        <Route path="readmore/:id" element={<ReadMore />} />
                        <Route path="user" element={<UserReview />} />
                    </Route>    
                    <Route path="profile" element={<Profile />} />  */}
    
   </Routes>
   </div>
  )
}

export default App
