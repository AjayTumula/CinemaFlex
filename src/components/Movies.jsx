import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './css/Movies.css'


const MOVIE_NOW_PLAYING_API = 'https://api.themoviedb.org/3/movie/now_playing?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500';
const MOVIE_POPULAR_API = 'https://api.themoviedb.org/3/movie/popular?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const MOVIE_TOP_RATED_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';
const MOVIE_UPCOMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US&page=1';


const Movies = () => {

  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  

  useEffect(() => {
    axios.get(MOVIE_NOW_PLAYING_API)
      .then(res => {
        setMovies(res.data.results);
      })
  }, []);

  useEffect(() => {
    axios.get(MOVIE_POPULAR_API)
    .then((res) => {
      setPopularMovies(res.data.results);
    })
    .catch(err => {
      setError("Error fetching popular movies: " + err.message)
    })
  }, []);

  useEffect(() => {
    axios.get(MOVIE_TOP_RATED_API)
    .then((res) => {
      setTopRatedMovies(res.data.results);
    })
    .catch(err => {
      setError("Error fetching top rated movies: " + err.message)
    })
  }, []);

  useEffect(() => {
    axios.get(MOVIE_UPCOMING_API)
    .then((res) => {
      setUpcomingMovies(res.data.results);
    })
    .catch(err => {
      setError("Error fetching upcoming movies: " + err.message)
    })
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 2 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1
    }
  };

    return(
      <div>
      <div style={{ marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
        <h1 style={{ marginLeft: "15px" }}>Now Playing</h1>
        <div style={{position: 'relative'}}> 
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          keyBoardControl={true}
         
          transitionDuration={50}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item"
          arrows={true} 
         
          >
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={IMAGE_API + movie.poster_path}
              />
              <div style={{ marginTop: "10px", fontSize: "1rem", textAlign: "center" }}>{movie.title}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>     
    
    <div style={{  marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
      <h1 style={{ marginLeft: "15px" }}>Popular Movies</h1>
      <div style={{position: 'relative' }}> 
      <Carousel
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
         
          transitionDuration={50}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item"
          arrows={true} 
          ssr={true}
        >
        {popularMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={IMAGE_API + movie.poster_path}
              alt={movie.title}
             
            />
            <div style={{ marginTop: "10px", fontSize: "1rem" }}>{movie.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>

  <div style={{ marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
    <h1 style={{ marginLeft: "15px" }}>Top Rated Movies</h1>
    <div style={{position: 'relative' }}> 
        <Carousel
            swipeable={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            
            transitionDuration={50}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            
            itemClass="carousel-item"
            arrows={true} 
            ssr={true}
          >
        {topRatedMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={IMAGE_API + movie.poster_path}
              alt={movie.title}
            />
            <div style={{ marginTop: "10px", fontSize: "1rem" }}>{movie.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>


  <div style={{ marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
    <h1 style={{ marginLeft: "15px" }}>Upcoming Movies</h1>
    <div style={{position: 'relative' }}> 
        <Carousel
            swipeable={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            
            transitionDuration={50}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
     
            itemClass="carousel-item"
            arrows={true} 
            ssr={true}
          >
        {upcomingMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={IMAGE_API + movie.poster_path}
              alt={movie.title}
            />
            <div style={{ marginTop: "10px", fontSize: "1rem" }}>{movie.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>
</div>

    )
}

export default Movies;