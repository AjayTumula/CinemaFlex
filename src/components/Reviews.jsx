import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";


const MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

const Reviews = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(MOVIE_API)
        .then((res) => {
            setMovies(res.data.results)
        })
    }, [])


    return(
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            {movies.map((movie) => (
            <div key={movie.id} style={{padding: '10px'}}>
            <Card style={{display: 'flex', width: 800, height: 300}}>
                <Box style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <CardContent>
                        <Typography>Person Name</Typography>
                        <hr />
                        <div>Rating</div>
                        <Typography style={{marginTop: '10px'}}>This is Review dfgdgh</Typography>
                        <div style={{marginTop: '90px'}}> 
                            <Button variant="contained">Read More</Button>
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

export default Reviews;