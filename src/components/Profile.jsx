

import {  React, useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Card, CardContent, Box, CardMedia } from "@mui/material";
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";

const IMAGE_API = 'https://image.tmdb.org/t/p/w500'; 

const Profile = () => {
    const [movieId, setMovieId] = useState([]);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [open, setOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const handleClickOpen = (review) => {
        setCurrentReview(review);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentReview(null);
    };

    useEffect(() => {
        const getAllUsers = async () => {
            const collectionReference = collection(db, "review");
            const userDocuments = await getDocs(collectionReference);
            const users = [];
            userDocuments.forEach((user) => {
                users.push(user.data());
            });
            setMovieId(users);
        }
        getAllUsers();
    }, []);

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (user && currentReview) {
                const documentReference = doc(db, "review", user.displayName);
                await setDoc(documentReference, {
                    ...currentReview,
                    review_text: event.target.review_text.value,
                    rating: event.target.rating.value,
                });
                console.log(`Review has been updated for ${currentReview.movie_id}`);
                handleClose();
                window.location.reload(); 
            } else {
                console.log("User is not authenticated or review details are missing");
            }
        } catch (err) {
            console.error("Error updating document:", err);
        }
    };

    const handleDelete = async (review) => {
        try {
            const user = auth.currentUser;
            const documentReference = doc(db, "reviews", user.displayName);
            await deleteDoc(documentReference);
            console.log(`Review has been deleted for ${review.movie_id}`);
            window.location.reload(); 
        } catch (err) {
            console.error("Error deleting document:", err);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
            {movieId.map((movie) => (
                <div key={movie.movie_id} style={{ padding: '10px' }}>
                    <Card style={{ display: 'flex', width: 800, height: 300 }}>
                        <Box style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                            <CardContent>
                                <Typography>{movie.user_name}</Typography>
                                <hr />
                                <div>{movie.rating}</div>
                                <Typography style={{ marginTop: '10px' }}>{movie.review_text}</Typography>
                                <div style={{ marginTop: '90px' }}>
                                    <Button variant="contained" onClick={() => handleClickOpen(movie)}>Edit</Button>
                                    <Button variant="contained" onClick={() => handleDelete(movie)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            src={IMAGE_API + movie.poster_path}
                            style={{ height: 300, width: 300 }}
                        />
                    </Card>
                </div>
            ))}

            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <form onSubmit={handleEditSubmit}>
                    <DialogTitle>Edit Your Review</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="review_text"
                            name="review_text"
                            label=""
                            type="text"
                            fullWidth
                            defaultValue={currentReview ? currentReview.review_text : ''}
                        />
                        <Typography component="legend" style={{ marginTop: '20px' }}>
                            Rating{' '}
                            <input
                                id="rating"
                                name="rating"
                                type="number"
                                // inputProps={{ min: 1, max: 5 }}
                                style={{ width: '40px', display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}
                                defaultValue={currentReview ? currentReview.rating : ''}
                            />{' '}
                            out of 5
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" type="submit">Submit</Button>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Profile;