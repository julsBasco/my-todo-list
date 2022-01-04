import { app } from "./AuthContext";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";

const db = getFirestore(app);

const StoreContext = createContext();

export const useDB = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const addDocuments = async (collectionDirectory, userEmail, data) => {
    const ref = await doc(db, collectionDirectory, userEmail);
    const docRef = await updateDoc(ref, data);
    return docRef;
  };

  const getDocuments = async (collectionDirectory, userEmail) => {
    const ref = await doc(db, collectionDirectory, userEmail);
    const documents = await getDoc(ref);
    const documentSnap = documents.data();
    return documentSnap;
  };

  const refreshDocuments = async (collectionDirectory, userEmail, data) => {
    const ref = await doc(db, collectionDirectory, userEmail);
    const docRefresh = await setDoc(ref, data);
    return docRefresh;
  };

  const value = {
    addDocuments,
    getDocuments,
    refreshDocuments,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
