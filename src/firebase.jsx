import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyDAUbY9CVr_gF_lyUKjTnaVXgGrzVJj4II",
    authDomain: "cinemaelk-ba8d9.firebaseapp.com",
    projectId: "cinemaelk-ba8d9",
    storageBucket: "cinemaelk-ba8d9.appspot.com",
    messagingSenderId: "1081890647728",
    appId: "1:1081890647728:web:33aced3e530fde1df41575",
    measurementId: "G-HZWK5NZXLD"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);