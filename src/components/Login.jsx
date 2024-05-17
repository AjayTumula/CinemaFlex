import { Button, Container, Grid, Input } from "@mui/material";
import React from "react";
import './Login.css';
import mainImg from '../assets/img-main.png'
import logoImg from '../assets/logo-main.png'
import nextImg from '../assets/next.png';


export default function Login() {

    return(

        <div style={{display: 'flex', width: '100%'}}>
      
            <Grid >      
                <img src={mainImg} style={{height: '70vh'}}/>   
            </Grid>
        
            <Grid style={{width: '50%'}}>
                <div style={{margin: '15rem 0rem 0rem 10rem'}}>
                <img src={logoImg} style={{ marginBottom: '20px'}}/>
                    <div style={{ width: '60%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Input sx={{ borderRadius: '8px', backgroundColor: 'white', padding: '15px'}} disableUnderline placeholder="Enter Username" type='text' />
                        <Input sx={{ borderRadius: '8px', backgroundColor: 'white', padding: '15px'}} disableUnderline placeholder="Enter Password" type='text' />
                    </div>
                    <Button style={{ width: '60%', marginTop: '30px', background: '#f15a24', border: '1px solid white', display: 'flex', justifyContent: 'space-evenly', textTransform: 'none' }}  variant="contained">
                        Login Now 
                            {/* <img src={nextImg} style={{height: '20px'}} />              */}
                    </Button>
                    <div style={{color: 'white', textAlign: 'center'}}>
                    <p>Join the club, <a href=''>Click here !</a></p>
                    </div>    
                </div>           
            </Grid>
      
            
        </div>
    )
}
