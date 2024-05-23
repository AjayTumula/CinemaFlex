import { Button, Grid, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import './css/Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import nextImg from '../assets/next.png';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const fullName = location.state?.fullName || '';


    async function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {  
            navigate('/home', {state: {fullName}})
        }).catch((error) => {
            console.log(error)
        })
    }
  
    

    return(
        <div className="container">
            <Grid >      
                <img src={mainImg} style={{height: '70vh', marginTop: '8rem'}}/>   
            </Grid> 

            <Grid style={{width: '55%'}}>       
                <div className="login-form">
                <img src={logoImg} style={{ marginBottom: '40px', height: '5vh', width: '50%'}}/>
                    <div className="inputs">
                        <Input  disableUnderline placeholder="Enter Username" type='email'
                             onChange={(e) => setEmail(e.currentTarget.value)} />
                        <Input style={{ marginLeft: '20px'}} disableUnderline placeholder="Enter Password" type='password'
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <Button variant="text" onClick={handleLogin}>
                        Login Now 
                            {/* <img src={nextImg} style={{height: '20px'}} />*/}
                    </Button>
                    <div style={{color: 'white', marginLeft: '10rem', marginTop: '1rem'}}>
                        Join the club, <a onClick={() => navigate('/signup')} style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}}>Click here!</a>
                    </div>    
                </div>        
            </Grid>    
           
        </div>
    )
}
