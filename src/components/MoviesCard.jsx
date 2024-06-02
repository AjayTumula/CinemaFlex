import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './css/Movies.css'


const IMAGE_API = 'https://image.tmdb.org/t/p/w500';


const MoviesCard = ({title, category}) => {

const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?api_key=${import.meta.env.VITE_MOVIEAPI_KEY}&language=en-US&page=1`)
      .then(res => {
        setMovies(res.data.results);   
      }).catch(error => {
        console.log(error);
      })
  }, []);

 
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
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{ marginLeft: '35px', padding: "15px",  maxWidth: "87vw" }}>
        <h1 style={{ marginLeft: "15px" }}>{title ? title : "Now Playing"}</h1>
        <div style={{position: 'relative'}}> 
        <Carousel
          swipeable={false}
          draggable={false}
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
          >
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={IMAGE_API + movie.poster_path}/>
              <div style={{ marginTop: "10px", fontSize: "1rem", textAlign: "center" }}>{movie.title}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>     
  </div>
</div>
    )
}

export default MoviesCard;