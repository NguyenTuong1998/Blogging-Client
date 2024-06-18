// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkvGvMqECuKX8lyMSZgEddpcYrgJiF5Vk",
  authDomain: "blogging-website-e6f4d.firebaseapp.com",
  projectId: "blogging-website-e6f4d",
  storageBucket: "blogging-website-e6f4d.appspot.com",
  messagingSenderId: "23965369287",
  appId: "1:23965369287:web:141eeb7f4abf9524320fe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;