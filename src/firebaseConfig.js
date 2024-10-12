import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD5u8IBrO3ij1NfFM50gVEVgb_V57mVrho",
  authDomain: "incomex-4a1f8.firebaseapp.com",
  projectId: "incomex-4a1f8",
  storageBucket: "incomex-4a1f8.appspot.com",
  messagingSenderId: "335636752223",
  appId: "1:335636752223:web:e4890f89d0efa17f7738ea",
  measurementId: "G-MFNKV0E49H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 


export { auth, provider, signInWithPopup };
