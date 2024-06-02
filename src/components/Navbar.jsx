import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import  imgHome  from '../assets/img-home.png'
import Toolbar from '@mui/material/Toolbar';
import logoHome from '../assets/logo-2.png';
import { auth, logout } from "../firebase";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";




const Navbar = () => {

   
  return (
    <div>
            <AppBar position="static" style={{background: 'white', color: 'black', boxShadow: 'none'}}>
                <Container maxWidth="xlOffset" padding='0' sx={{ml: 0, mr: 0}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="navbar-img">
                        <img src={imgHome} height={50}/>
                        <img src={logoHome} height={50}/>
                    </div>
                     <Button variant="contained" onClick={() => {logout()}}>Logout</Button>   
                  </Toolbar>                   
                </Container>              
            </AppBar>
            <hr style={{marginLeft: '-8px', marginRight: '-8px'}}/>        
    </div>
  )
}

export default Navbar;