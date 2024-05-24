import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";



const IMAGE_API = 'https://image.tmdb.org/t/p/w500'; 

const Profile = () => {

    const [ movieId, setMovieId ]  = useState([])

    useEffect(() => {
        const getAllUsers = async() => {
            const collectionReference = collection(db, "review");
            const userDocuments = await getDocs(collectionReference);
            const users = []
            userDocuments.forEach((user) => {
                users.push(user.data());
                
            })
            setMovieId(users);
            // console.log(users)
        }
        getAllUsers()
    }, [])



    return(
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            {movieId.map((movie) => (     
            <div key={movie.movie_id} style={{padding: '10px'}}>
            <Card style={{display: 'flex', width: 800, height: 300}}>
                <Box style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <CardContent>
                    
                        <Typography>{movie.user_name}</Typography>
                        <hr />
                        <div>{movie.rating}</div>
                        <Typography style={{marginTop: '10px'}}>{movie.review_text}</Typography>
                        <div style={{marginTop: '90px'}}> 
                            <Button variant="contained"
                            onClick={() => handleClick()}>
                            Read More</Button>
                        </div>
                    </CardContent>
                </Box>
                <CardMedia 
                    component="img"
                    src={IMAGE_API + movie.poster_path}
                    style={{height: 300, width: 300}}
                />
            </Card> 
            </div>
          ))}        
        </div>
    )
}

export default Profile;