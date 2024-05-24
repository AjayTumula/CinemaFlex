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
import { addDoc, collection, doc, setDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


const IMAGE_API = 'https://image.tmdb.org/t/p/w500'; 

const ReadMore = () => {

    const location = useLocation();
    const { movie, fullName } = location.state || {}; 
    const [ crewData, setCrewData ] = useState([]);
    const [ similarMovies, setSimilarMovies ] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [ reviewText, setReviewText ] = useState('');
    const [ ratingValue, setRatingValue ] = useState();
    const [ userDoc, setUserDoc ] = useState([]);
    

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputValue('')
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
          setRatingValue(inputValue);
          console.log('Review:', text);
          console.log('Rating:', inputValue);
          handleClose();
        } else {
          alert('Please enter a value between 1 and 5');
        }
      };

   useEffect(() => {
    const CAST_CREW_API = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US`;
    axios.get(CAST_CREW_API)
    .then((res) => {
        setCrewData(res.data.cast)
    })
   }, [movie.id])

   useEffect(() => {
    const SIMILAR_MOVIES_API = `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=4fb7181c9144f34c2175940c5e895b46&language=en-US`;
    axios.get(SIMILAR_MOVIES_API)
    .then((res) => {
        setSimilarMovies(res.data.results)
    })
   }, [movie.id]);

        useEffect(() => {
            const addUserReview = async () => {
                try {
                    const user = auth.currentUser;
                    
                    if (user && reviewText !== undefined && ratingValue !== undefined) {
                        
                        const documentReference = doc(db, "movie", `${movie.id}`, "users", user.displayName)
                        await setDoc(documentReference, {
                            user_name: user.displayName,
                            review_text: reviewText,
                            rating: ratingValue,    
                            movie_id: movie.id,
                            user_id: user.uid,
                            poster_path: movie.poster_path,
                        });
                        console.log(`Data has been added to  ${movie.id}` );
                    } else {
                        console.log("User is not authenticated or reviewText/ratingValue is undefined");
                    }
                } catch (err) {
                    console.log("Error setting document:", err);
                }
            };
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    addUserReview();
                }
            });

            return () => unsubscribe();
        }, [auth, reviewText, ratingValue]);


        useEffect(() => {
            const addUser = async () => {
                try {
                   
                    const user = auth.currentUser;
                    console.log(user.displayName)
                    
                    if (user && reviewText !== undefined && ratingValue !== undefined) {
                        
                        const collectionReference = doc(db, "review", user.displayName)
                        await setDoc(collectionReference, {
                            user_name: user.displayName,
                            review_text: reviewText,
                            rating: ratingValue,    
                            movie_id: movie.id,
                            user_id: user.uid,
                            poster_path: movie.poster_path,
                        });
                        console.log(`Data has been added to  reviews` );
                    } else {
                        console.log("User is not authenticated or reviewText/ratingValue is undefined");
                    }
                } catch (err) {
                    console.log("Error setting document:", err);
                }
            };
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    addUser();
                }
            });

            return () => unsubscribe();
        }, [auth, reviewText, ratingValue]);
        

        useEffect(() => {
            const getUserReviews = async () => {
                try {
                    const reviewsCollectionRef = collection(db, "movie", `${movie.id}`, "users");
                    const querySnapshot = await getDocs(reviewsCollectionRef);
                    const reviews = [];
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.data())
                        reviews.push(doc.data());
                       
                    });
                    setUserDoc(reviews);
                    // console.log(reviews)
                } catch (error) {
                    console.error("Error fetching user reviews:", error);
                }
            };
       
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    getUserReviews();
                }
            });
            return () => unsubscribe();
        }, [movie.id]);

        
 
    return(
        <div>
        <Row style={{display: 'flex', width: '80vw'}}>
          <Col style={{padding: '70px', width: '50%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <img style={{height: 400, width: 400 }} src={IMAGE_API + movie.poster_path } />
                <div style={{marginTop: 40, fontSize: '1.5rem'}}>{movie.title}</div>
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
                        <Button variant="contained" type="submit">
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
                { userDoc.map((doc, index) => {
                        return(
                            <div key={index} style={{padding: '10px'}}>
                                <Card>
                                <CardContent>
                                <Typography>{doc.review_text}</Typography>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                    <Typography>{doc.user_name} </Typography>
                                        <div>
                                            {inputValue !== null && (
                                                <Rating
                                                    name="simple-controlled"
                                                    value={parseInt(doc.rating)}
                                                    readOnly
                                                    style={{ marginTop: '10px' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                </Card>
                            </div>
                        )
                    })}
            </div>
            </Col>
        </Row>
        </div>
    )
}

export default ReadMore;