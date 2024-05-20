import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './css/Movies.css'


const MOVIE_NOW_PLAYING_API = 'https://api.themoviedb.org/3/movie/now_playing?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500';


const Movies = () => {

  const [ movies, setMovies ] = useState([]);


  useEffect(() => {
    axios.get(MOVIE_NOW_PLAYING_API)
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(err => {
        setError("Error fetching movies: " + err.message);
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 1 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  
  
    return(
      <div style={{ marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
      <h1 style={{ marginLeft: "15px" }}>Now Playing</h1>
      <div style={{    position: 'relative' }}> 
      <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
          arrows={true} 
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ padding: "10px", border: 'none' }}>
              <img
                src={IMAGE_API + movie.poster_path}
                alt={movie.title}
                style={{ height: "300px", borderRadius: "20px", maxWidth: "100%" }} 
              />
              <div style={{ marginTop: "10px", fontSize: "1rem" }}>{movie.title}</div>
            </div>
          ))}
        </Carousel>
       
      </div>
    </div>
        
    )
}

export default Movies;