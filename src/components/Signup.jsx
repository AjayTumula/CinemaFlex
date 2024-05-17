import React from "react";
import { Button, Grid, Input } from "@mui/material";
import './Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'



export default function Signup() {


    return(
        <div className="container">
            <Grid >      
                <img src={mainImg} style={{height: '70vh', marginTop: '8rem'}}/>   
            </Grid> 

            <Grid style={{width: '55%'}}>       
                <div className="login-form">
                <img src={logoImg} style={{ marginBottom: '40px', height: '8vh', width: '45%'}}/>
                    <div className="inputs">
                        <Input  disableUnderline placeholder="Enter Username" type='text' />
                        <Input style={{ marginLeft: '20px'}} disableUnderline placeholder="Enter Password" type='text'/>
                    </div>
                    <Input style={{ marginTop: '2rem', width: '54%'}} disableUnderline placeholder="Enter Full Name" type='text'/>
                    <Button  variant="contained">
                        Join the club
                            {/* <img src={nextImg} style={{height: '20px'}} />*/}
                    </Button>
                    <div style={{color: 'white', marginLeft: '10rem'}}>
                    <p>Already a member? <a href='' style={{color: 'white'}}>Click here !</a></p>
                    </div>    
                </div>        
            </Grid>          
        </div>
    )
}