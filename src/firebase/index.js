import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBOz987xavsPugAXUJ8XVi3FpOBT-QtcQ",
  authDomain: "moneymate-781e6.firebaseapp.com",
  projectId: "moneymate-781e6",
  storageBucket: "moneymate-781e6.appspot.com",
  messagingSenderId: "718858871004",
  appId: "1:718858871004:web:31d4f4f022c13b1f3b9419",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{
    db
}
