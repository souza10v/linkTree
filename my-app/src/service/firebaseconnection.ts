// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY7u6wDdxzMsBUuUPcIiZAjhhEzZDpG_U",
  authDomain: "linktree-589ea.firebaseapp.com",
  projectId: "linktree-589ea",
  storageBucket: "linktree-589ea.appspot.com",
  messagingSenderId: "351572452215",
  appId: "1:351572452215:web:4d13d1162d5f072244f772",
  measurementId: "G-LJCVXNNBVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export{ db, auth};