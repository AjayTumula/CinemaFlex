import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const UserReview = () => {

    const location = useLocation();

    const { movie } = location.state || {};


    useEffect(() => {
        const getUserReviews = async () => {
            try {
                const reviewsCollectionRef = collection(db, "movie");
                const querySnapshot = await getDocs(reviewsCollectionRef);
                const reviews = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    reviews.push(doc.data());
                   
                });
                // setUserDoc(reviews);
                console.log(reviews)
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



    return (
        <div>sjdksj</div>
    )
}  

export default UserReview;