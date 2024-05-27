import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


// This movie api can be created as a custom hook
const MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

const Reviews = () => {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [ userReview, setUserReview ] = useState([]);


    useEffect(() => {
        axios.get(MOVIE_API)
        .then((res) => {
            setMovies(res.data.results)
        })
    }, [])

    const handleClick = (movie) => {
       navigate(`/home/reviews/readmore/${movie.id}`, { state: { movie } });

       const addMovie = async() => {       
        const documentReference = doc(db, "movie", `${movie.id}`);
            setDoc(documentReference, {
                movie_id: movie.id,
            });
        }
        addMovie();
     
    }  

    useEffect(() => {
        const getAllUsers = async() => {
            const collectionReference = collection(db, "review");
            const userDocuments = await getDocs(collectionReference);
            const users = []
            userDocuments.forEach((user) => {
                users.push(user.data());
                
            })
            setUserReview(users);
            console.log(users)
        }
        getAllUsers()
    }, [])

    const handleClickUser = (movie) => {
        navigate(`/home/reviews/user`, { state: { movie } });
    }
 
    return(
        <div>
        {userReview.map((user) => { 
            return (
            <div key={user.id} style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            {movies.map((movie) => (         
            <div key={movie.id} style={{padding: '10px'}}>
            
            <Card style={{display: 'flex', width: 800, height: 300}}>
                <Box style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <CardContent>       
                        <Typography onClick={() => handleClickUser(movie)} style={{cursor: 'pointer'}}>{user.user_name}</Typography>
                        <hr />
                        <div>Rating {movie.title} </div>
                        <Typography style={{marginTop: '10px'}}>{user.review_text} </Typography>
                        <div style={{marginTop: '90px'}}> 
                            <Button variant="contained"
                            onClick={() => handleClick(movie)}>
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
           })}    
           </div>
    )
} 

export default Reviews;