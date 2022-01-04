// Import the functions you need from the SDKs you need
import React, { useContext, useState, useEffect, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUJ-q6cr3-j6x7ediH2PdfnEk2_jTYZFw",
  authDomain: "my-todo-list-bbf6d.firebaseapp.com",
  projectId: "my-todo-list-bbf6d",
  storageBucket: "my-todo-list-bbf6d.appspot.com",
  messagingSenderId: "814775624399",
  appId: "1:814775624399:web:49a90126195fe82799cdba",
  measurementId: "G-8G81WD7WTM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth Service from firebase
const auth = getAuth(app);

//created a AuthContext
const AuthContext = createContext();

//called the useContext here rather than calling it outside of the module to make it more cleaner ;)
export const useAuth = () => useContext(AuthContext);

//here is my providers
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    createNewUser,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
