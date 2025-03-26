import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBrLiO6Jowa30H6oJgvlOLavr8lceGyHcc",
  authDomain: "tugas-axios.firebaseapp.com",
  projectId: "tugas-axios",
  storageBucket: "tugas-axios.firebasestorage.app",
  messagingSenderId: "308134394706",
  appId: "1:308134394706:web:849f5e1024d5e708d0988b",
  measurementId: "G-54RQ7K1W5K"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);



export { auth, googleProvider, db,storage, collection, addDoc, deleteDoc, doc, getDocs, setDoc };
