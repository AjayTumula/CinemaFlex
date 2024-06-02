import { Button, Grid, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import './Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import nextImg from '../assets/next.png';

import {  login, signup } from "../firebase";





export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signState, setSignState] = useState("Sign In");


    const user_auth = async(event) => {
        event.preventDefault();
        if(signState === "Sign In"){
            await login(email, password);
        } else {
            await signup(name, email, password);
        }
    }


    return(
        <div className="container">
            <Grid>      
                <img src={mainImg} style={{height: '70vh', marginTop: '8rem'}}/>   
            </Grid> 

            <Grid style={{width: '55%'}}>       
                <div className="login-form">
                <img src={logoImg} style={{ marginBottom: '40px', height: '5vh', width: '50%'}}/>
                    <form>
                    <div className="inputs">
                        <input placeholder="Enter Username" type='email' value={email}
                             onChange={(e) => setEmail(e.currentTarget.value)} />
                        <input style={{ marginLeft: '20px'}}  placeholder="Enter Password" type='password' value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />    
                    </div>
                    {signState === "Sign Up" ? <input style={{marginTop: '20px', width: '52%'}} placeholder="Full Name" type="text" value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        /> : <></>}
                    <Button variant="text" onClick={user_auth} type="submit">
                        {signState}
                            {/* <img src={nextImg} style={{height: '20px'}} />*/}
                    </Button>
                    </form>
                    <div style={{color: 'white', marginLeft: '10rem', marginTop: '1rem', cursor: 'pointer'}}>
                    {signState === "Sign In" ? <p>Join the club, <span onClick={() => {
                        setSignState("Sign Up")
                    }}>Click here!</span></p>
                    : <p>Already a member? <span onClick={() => {
                        setSignState("Sign In")
                    }}>Click here!</span></p>
                    }
                         {/* <a onClick={() => navigate('/signup')} 
                        style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}}></a>
                         <a onClick={() => navigate('/')} 
                        style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}}></a> */}
                    </div>    
                </div>        
            </Grid>    
           
        </div>
    )
}
