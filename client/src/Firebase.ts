import { initializeApp } from "firebase/app";

const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: "jwtproject-5ab78.firebaseapp.com",
     projectId: "jwtproject-5ab78",
     storageBucket: "jwtproject-5ab78.appspot.com",
     messagingSenderId: "830803620524",
     appId: "1:830803620524:web:c462d6b54a2a80cb61e509",
     measurementId: "G-5TMDWR7ZX4"
};

export const app = initializeApp(firebaseConfig);
