

import React from "react";

import { Outlet, Route, Routes} from "react-router-dom";

import Movies from "./Movies";
import Reviews from "./Reviews";
import ReadMore from "./ReadMore";
import Profile from "./Profile";
import UserReview from "./UserReviews";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const Home = () => {

    return(
        <div className="home-page">
            <Navbar />        
            <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
            <Sidebar />
            <div style={{borderLeft: '2px solid gray', height: 'auto', marginTop: '-10px' }}>
            </div>
            <div style={{display: 'flex', marginLeft: '20px', width: '90%'}}>
                <Routes>
                    <Route path="movies" element={<Movies />} />  
                    <Route path="reviews/*" element={<Outlet />}>
                        <Route index element={<Reviews />} />
                        <Route path="readmore/:id" element={<ReadMore />} />
                        <Route path="user" element={<UserReview />} />
                    </Route>    
                    <Route path="profile" element={<Profile />} />     
                </Routes>   
            </div>     
            </div>        
         </div>
  
    )
}

export default Home;