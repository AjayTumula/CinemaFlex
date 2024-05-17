import { Box, Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import  imgHome  from '../assets/img-home.png'
import Toolbar from '@mui/material/Toolbar';
import logoHome from '../assets/logo-2.png';



const Home = () => {
    const navigate = useNavigate()

    async function handleLogout() {
        signOut(auth).then((userCredentials) => {
            navigate('/login');
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
        </div>
    
    )
}

export default Home;