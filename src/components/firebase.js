// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBeMBNvRKeiAgKcRv4GjoCFBbrD_f2IzPM",
  authDomain: "human-in-loop-730d7.firebaseapp.com",
  databaseURL: "https://human-in-loop-730d7-default-rtdb.firebaseio.com",
  projectId: "human-in-loop-730d7",
  storageBucket: "human-in-loop-730d7.appspot.com", // (fixed typo: was firebasestorage.app → should be firebaseapp.com)
  messagingSenderId: "560437191687",
  appId: "1:560437191687:web:23067c51072c655e37f6a2",
  measurementId: "G-MPKW3E58HD"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;
