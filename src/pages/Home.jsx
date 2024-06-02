

import React from "react";

import { Outlet, Route, Routes} from "react-router-dom";

import Movies from "../components/Movies";
import Reviews from "../components/Reviews";
import ReadMore from "../components/ReadMore";
import Profile from "../components/Profile";
import UserReview from "../components/UserReviews";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const Home = () => {

    return(
        <div className="home-page">
            <Navbar />        
            <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
            <Sidebar />
             <div style={{borderLeft: '2px solid gray', height: 'auto', marginTop: '-10px' }}>
            </div>
            </div>        
         </div>
    )
}

export default Home;