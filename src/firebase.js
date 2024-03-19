import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0IW8RKuMdG13i-CKDKleALiyiLzq5Nvk",
  authDomain: "onecare-790fc.firebaseapp.com",
  databaseURL: "https://onecare-790fc-default-rtdb.firebaseio.com",
  projectId: "onecare-790fc",
  storageBucket: "onecare-790fc.appspot.com",
  messagingSenderId: "88129139335",
  appId: "1:88129139335:web:265f565c158ee0f753fe22"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db}