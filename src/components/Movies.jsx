import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './css/Movies.css'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MoviesCard from "./MoviesCard";



const Movies = () => {
  
    return(
      <div>
      <Navbar />
      <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
      <Sidebar />
      <div style={{borderLeft: '2px solid gray', height: 'auto', marginTop: '-10px' }}>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <MoviesCard />
      <MoviesCard title={"Popular Movies"} category={"popular"}/>
      <MoviesCard title={"Top Rated Movies"} category={"top_rated"}/>
      <MoviesCard title={"Upcoming Movies"} category={"upcoming"}/>
      </div>
    </div>
    </div>
    )
}

export default Movies;