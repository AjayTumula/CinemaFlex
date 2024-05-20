import { Box, Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import  imgHome  from '../assets/img-home.png'
import Toolbar from '@mui/material/Toolbar';
import logoHome from '../assets/logo-2.png';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Movies from "./Movies";
import Reviews from "./Reviews";



const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(location.pathname.split('/')[2] || 'movies');
    
    async function handleLogout(e) {
        e.preventDefault();
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error)
        })
    }



    const handleButtonClick = (event, button) => {
        event.preventDefault();
        setActiveButton(button);
        navigate(`/home/${button}`);
      };

    return(
        <div className="home-page">
            <AppBar position="static" style={{background: 'white', color: 'black', boxShadow: 'none'}}>
                <Container maxWidth="xlOffset" padding='0' sx={{ml: 0, mr: 0}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="navbar-img">
                        <img src={imgHome} height={50}/>
                        <img src={logoHome} height={50}/>
                    </div>
                     <Button variant="contained" onClick={handleLogout}>Logout</Button>   
                  </Toolbar>                   
                </Container>              
            </AppBar>
            <hr style={{marginLeft: '-8px', marginRight: '-8px'}}/>
            <div style={{display: 'flex'}}>
            <div style={{padding: '2rem'}}>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeButton === 'movies' ? 'orange' : 'blue'}}
                    onClick={(event) =>  handleButtonClick(event, 'movies')}>
                    <HomeIcon  fontSize="large" sx={{padding: '6px', color:'white'}} />
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeButton === 'reviews' ? 'orange' : 'blue',
                 marginTop: '2rem', marginBottom: '2rem'}}
                 onClick={(event) => handleButtonClick(event, 'reviews')}>
                    <ReviewsIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: 'blue'}}>
                    <PermIdentityOutlinedIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>
            </div>
            <div style={{borderLeft: '2px solid gray', height: 'auto', marginTop: '-10px' }}>
            </div>

          
            <div style={{}}>
                <Routes>
                    <Route path="movies" element={<Movies />} />
                    <Route path="reviews" element={<Reviews />} />
                </Routes>
            </div>
            
            </div>
            
        </div>

       
    )
}

export default Home;