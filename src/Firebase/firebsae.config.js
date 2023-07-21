import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCNRq7UG_Bl9CC7NynNMEhng_DMu_UHwQw",
  authDomain: "emart-e20dc.firebaseapp.com",
  projectId: "emart-e20dc",
  storageBucket: "emart-e20dc.appspot.com",
  messagingSenderId: "275061015083",
  appId: "1:275061015083:web:2527d41e98e181e8afa06e"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)

export default app;