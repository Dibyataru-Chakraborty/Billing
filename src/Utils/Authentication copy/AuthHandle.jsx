import { createContext } from "react";
import { auth } from "../Firebase/Firebase_config";
import { Navigate } from "react-router-dom";
// Declare variables outside the if statement
let uid, email, lastSignInTime, creationTime, refreshToken, expirationTime, accessToken, remember;

const userString = localStorage.getItem('user');

if (userString) {
  // Parse user data
  const user = JSON.parse(userString);

  ({ uid, email, lastSignInTime, creationTime, refreshToken, expirationTime, accessToken, remember } = user);

} else {
  console.log('No user data in local storage');
}

const {signup} = {
    user: "",
    email: "",
    uid: "",
    remember: "",
    lastSignInTime: "",
    creationTime: "",
    refreshToken: "",
    expirationTime: "",
    accessToken: "",
  };

export default class AuthHandle {
  static signin() {
    if (email && uid) {
      return true;
    } else {
      return false;
    }
  }

  static remember() {
    if (remember.remember) {
      return true;
    } else {
      return false;
    }
  }

  static refreshToken() {
    if(auth.currentUser.refreshToken === refreshToken.refreshToken){
        return true
    } else {
        return false
    }
  }

  static accessToken() {
    if(auth.currentUser.toJSON().stsTokenManager.accessToken === refreshToken.refreshToken){
        return true
    } else {
        return false
    }
  }

  static expirationTime() {
    if (Date.now() >= expirationTime) {
      return false;
    } else {
      return true;
    }
  }

  static logoutUser() {
    localStorage.setItem("user", JSON.stringify(signup));
  }

}
