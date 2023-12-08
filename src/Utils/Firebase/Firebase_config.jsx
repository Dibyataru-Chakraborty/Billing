import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database"
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_LOCAL_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_LOCAL_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_LOCAL_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_LOCAL_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_LOCAL_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_LOCAL_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_LOCAL_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_LOCAL_FIREBASE_MEASUREMENTID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
  export const analytics = getAnalytics(app);