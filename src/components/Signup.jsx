import React, { useEffect, useState } from "react";
import { Button, Grid, Input } from "@mui/material";
// import '../Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";




export default function Signup() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password, fullName).then((userCredentials) => {
           if (auth.currentUser) {
            updateProfile(auth.currentUser, {
            displayName: fullName,
            }).then(() => {
            console.log('Profile updated!');
            navigate('/', { state: { fullName } });
            }).catch((error) => {
            console.error('Error updating profile:', error);
            });
        }
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
                        value={fullName}
                        onChange={(e) => { setFullName(e.currentTarget.value)}}
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
        </div>
    )
}