import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

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


export const signup = async(name, email, password) => {
  try {
  const res =  await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "user" ), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
  })
  } catch(error) {
      console.log(error);
  }
}
  
export const login = async(email, password) => {
  try {
      await signInWithEmailAndPassword(auth, email, password);
  } catch(error) {
      console.log(error);
  }
}

export const logout = () => {
  signOut(auth);
}
