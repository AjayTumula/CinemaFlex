import React, { useState } from "react";
import { Button, Grid, Input } from "@mui/material";
import './css/Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Home from "./Home";



export default function Signup() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password, fullName).then((userCredentials) => {
           navigate('/')
        })
    }


    return(
        <div className="container">
            <Grid >      
                <img src={mainImg} style={{height: '70vh', marginTop: '8rem'}}/>   
            </Grid> 

            <Grid style={{width: '55%'}}>       
                <div className="login-form">
                <img src={logoImg} style={{ marginBottom: '40px', height: '8vh', width: '45%'}}/>
                    <div className="inputs">
                        <Input  disableUnderline placeholder="Enter Username" type='email'
                            onChange={(e) => setEmail(e.currentTarget.value)}
                         />
                        <Input style={{ marginLeft: '20px'}} disableUnderline placeholder="Enter Password" type='password'
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <Input style={{ marginTop: '2rem', width: '54%'}} disableUnderline placeholder="Enter Full Name" type='text'
                        onChange={(e) => setFullName(e.currentTarget.value)}
                    />
                    <Button  variant="text" onClick={handleRegister} >
                        Join the club
                            {/* <img src={nextImg} style={{height: '20px'}} />*/}
                    </Button>

                    <div style={{color: 'white', marginLeft: '10rem', marginTop: '1rem'}}>
                        Already a member? <a onClick={() => navigate('/')} style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}}>Click here!</a>
                    </div>    
                </div>        
            </Grid> 
            <Home fullName={fullName} />         
        </div>
    )
}