import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(location.pathname.split('/')[2] || 'movies');

    const handleButtonClick = (event, button) => {
        event.preventDefault();
        setActiveButton(button);
        navigate(`/home/${button}`);
      };


  return (
    <div>
            <div style={{padding: '2rem', width: '5%'}}>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeButton === 'movies' ? 'orange' : 'blue'}}
                    onClick={(event) =>  handleButtonClick(event, 'movies')}>
                    <HomeIcon  fontSize="large" sx={{padding: '6px', color:'white'}} />
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeButton === 'reviews' ? 'orange' : 'blue',
                 marginTop: '2rem', marginBottom: '2rem'}}
                 onClick={(event) => handleButtonClick(event, 'reviews')}>
                    <ReviewsIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>
                <div style={{height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeButton === 'profile' ? 'orange' : 'blue'}}
                onClick={(event) => handleButtonClick(event, 'profile')}>
                    <PermIdentityOutlinedIcon fontSize="large" sx={{padding: '6px', color: 'white'}}/>
                </div>              
            </div>          
    </div>
  )
}

export default Sidebar;