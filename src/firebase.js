import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDbJP8uipxyD0-CbApaT3B7ytbNPmZ01_g",
  authDomain: "taller-efsystemas.firebaseapp.com",
  projectId: "taller-efsystemas",
  storageBucket: "taller-efsystemas.appspot.com",
  messagingSenderId: "485914256004",
  appId: "1:485914256004:web:7518379c63eba23d4018d1",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export { db, auth, firebase }
