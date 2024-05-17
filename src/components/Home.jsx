import { Box, Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import  imgHome  from '../assets/img-home.png'
import Toolbar from '@mui/material/Toolbar';
import logoHome from '../assets/logo-2.png';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



const Home = () => {
    const navigate = useNavigate()

    async function handleLogout(e) {
        e.preventDefault();
        signOut(auth).then((userCredentials) => {
            navigate('/');
        }).catch((error) => {
            console.log(error)
        })
    }

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
            <hr />
            <div style={{display: 'flex'}}>
            <div style={{padding: '2rem'}}>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: '#f15a24'}}>
                    <HomeIcon fontSize="large" sx={{padding: '6px', color: 'white'}} />
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: 'blue', marginTop: '2rem', marginBottom: '2rem'}}>
                    <ReviewsIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: 'blue'}}>
                    <PermIdentityOutlinedIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>
            </div>
            <div style={{borderLeft: '4px solid gray', height: '100vh', marginTop: '-10px' }}>
            </div>

            </div>
        </div>
    
    )
}

export default Home;