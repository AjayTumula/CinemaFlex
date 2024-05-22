import { Button} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

const ReadMore = () => {

    const location = useLocation();
    const {id, title, poster_path} = location.state.movie;
    const [ crewData, setCrewData ] = useState([]);
    const [ similarMovies, setSimilarMovies ] = useState([]);
    const [open, setOpen] = React.useState(false);

   useEffect(() => {
    const CAST_CREW_API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US`;
    axios.get(CAST_CREW_API)
    .then((res) => {
        setCrewData(res.data.cast)
    })
   }, [])

   useEffect(() => {
    const SIMILAR_MOVIES_API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US`;
    axios.get(SIMILAR_MOVIES_API)
    .then((res) => {
        setSimilarMovies(res.data.results)
    })
   }, [])
 

    return(
        <div>
        <Row style={{display: 'flex', width: '80vw'}}>
          <Col style={{padding: '70px', width: '50%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <img style={{height: 400, width: 400 }} src={IMAGE_API + poster_path } />
                <div style={{marginTop: 40, fontSize: '1.5rem'}}>{title}</div>
                <div>
                <Button style={{marginTop: 40, background: '#f15a24', color: 'white'}}>Post Review</Button>
                </div>
                <div>
                    <h2>Cast & Crew</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {crewData.map((crew, index) => {
                            return(
                                <div key={index} style={{padding: 10, margin: 10, width: 70}}>
                                  <Stack direction="row">
                                    <Avatar src={IMAGE_API + crew.profile_path } />
                                  </Stack>
                                    {crew.name}
                                </div>
                            )   
                            })}
                    </div>
                </div>
                <div>
                    <h2>Similar Movies</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            similarMovies.map((smovie) => {
                                return (
                                    <div key={smovie.id} style={{padding: 10, margin: 10, width: 100}}>
                                        <img style={{height: 150, width: 120, borderRadius: '10px'}} src={IMAGE_API + smovie.poster_path}/>
                                       <div> {smovie.title} </div>
                                    </div>
                                )   
                            })
                        }
                    </div>
                </div>
            </div>     
            </Col> 

            <div style={{borderLeft: '2px solid gray', height: 'auto', marginTop: '-10px' }}>
            </div>
         
            <Col style={{padding: '70px', width: '50%'}}>
            <div >HH</div>
            </Col>
        </Row>
            
        
           
           
           

          
       
         
            
       

        
        </div>
    )
}

export default ReadMore;