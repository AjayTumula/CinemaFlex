import { Button, Grid, Input } from "@mui/material";
import React from "react";
import './Auth.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import nextImg from '../assets/next.png';


export default function Login() {

    return(

        <div className="container">
            <Grid >      
                <img src={mainImg} style={{height: '70vh', marginTop: '8rem'}}/>   
            </Grid> 

            <Grid style={{width: '55%'}}>       
                <div className="login-form">
                <img src={logoImg} style={{ marginBottom: '40px', height: '5vh', width: '50%'}}/>
                    <div className="inputs">
                        <Input  disableUnderline placeholder="Enter Username" type='text' />
                        <Input style={{ marginLeft: '20px'}} disableUnderline placeholder="Enter Password" type='text'/>
                    </div>
                    <Button  variant="contained">
                        Login Now 
                            {/* <img src={nextImg} style={{height: '20px'}} />*/}
                    </Button>
                    <div style={{color: 'white', marginLeft: '10rem'}}>
                    <p>Join the club, <a href='' style={{color: 'white'}}>Click here !</a></p>
                    </div>    
                </div>        
            </Grid>          
        </div>
    )
}
