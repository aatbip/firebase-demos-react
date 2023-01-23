import { collection } from "firebase/firestore";
import { database } from "../firebaseConfig"; 

export const User = collection(database, "users"); 

