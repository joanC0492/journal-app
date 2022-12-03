import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDvyd9xrdfbikZrCd2cJWrzmbfOSSgcN20",
  authDomain: "react-cursos-9a544.firebaseapp.com",
  projectId: "react-cursos-9a544",
  storageBucket: "react-cursos-9a544.appspot.com",
  messagingSenderId: "844906015886",
  appId: "1:844906015886:web:c492329b8d782a58f42ddf",
};

// Inicializamos Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
// Base de datos firestore
export const FirebaseDB = getFirestore(FirebaseApp);


