import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    async function handleLogout() {
        signOut(auth).then((userCredentials) => {
            navigate('/login');
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <div>Hello
        
        <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Home;