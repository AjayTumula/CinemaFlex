import { Button, Card, CardContent, Rating, Typography} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDoc, collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";



const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

const ReadMore = ({ fullName }) => {

    const location = useLocation();
    const {id, title, poster_path} = location.state.movie;
    const [ crewData, setCrewData ] = useState([]);
    const [ similarMovies, setSimilarMovies ] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [ reviewText, setReviewText ] = useState('');
    

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputValue('');
        // setValue(null);
    };
    
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || (newValue >= 1 && newValue <= 5)) {
          setInputValue(newValue);
        
        }
    };

    
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const text = formJson.text;
    
        if (inputValue >= 1 && inputValue <= 5) {
          setValue(Number(inputValue)); 
          setReviewText(text);
          console.log('Review:', text);
          console.log('Rating:', inputValue);
          handleClose();
        } else {
          alert('Please enter a value between 1 and 5');
        }
      };

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
   }, []);

   useEffect(() => {
    const dbReviewsFunction = async() => {
       const collectionReference = collection(db, "reviews");
       addDoc(collectionReference, {
        user_name: {id},
        review_text: {reviewText},
        level: 5
       }).then(response => {
        console.log(response)
       }).catch(err => {
        console.log(err)
       })
    }
    // dbReviewsFunction()
    
   })
 

    return(
        <div>
        <Row style={{display: 'flex', width: '80vw'}}>
          <Col style={{padding: '70px', width: '50%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <img style={{height: 400, width: 400 }} src={IMAGE_API + poster_path } />
                <div style={{marginTop: 40, fontSize: '1.5rem'}}>{title}</div>
                <div>

                <React.Fragment>
                    <Button style={{ marginTop: 40, background: '#f15a24', color: 'white' }} onClick={handleClickOpen}>
                        Post Review
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                        }}
                    >
                        <DialogTitle>Enter Your Review Here</DialogTitle>
                        <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="text"
                            name="text"
                            label=""
                            type="text"
                            fullWidth
                            variant="standard"
                        
                        />
                        
                        <Typography component="legend" style={{ marginTop: '20px' }}>
                            Rating{' '}
                            <input
                            value={inputValue}
                            onChange={handleInputChange}
                            type="number"
                            inputprops={{ min: 1, max: 5 }}
                            style={{ width: '40px', display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}
                            />{' '}
                            out of 5
                        </Typography>
                       
                        </DialogContent>
                        <DialogActions style={{ justifyContent: 'flex-start', marginLeft: 10 }}>
                        <Button  variant="contained" type="submit">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
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
            <div>
                <h2>Reviews by Cinema Elk Users</h2>
                <Card>
                    <CardContent>
                        <Typography>this is name: {fullName}</Typography>
                        <div>
                            <Typography>{reviewText}</Typography>
                            <div>
                                {value !== null && (
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        readOnly
                                        style={{ marginTop: '10px' }}
                                    />
                                )}
                            </div>
                        </div>
                       
                    </CardContent>
                </Card>
            </div>
            </Col>
        </Row>
   
        
        </div>
    )
}

export default ReadMore;