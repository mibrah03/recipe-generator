import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-UqzEaZ7L_ILgNqjkljTFQNvpL6PiqnE",
  authDomain: "food-continent.firebaseapp.com",
  projectId: "food-continent",
  storageBucket: "food-continent.firebasestorage.app",
  messagingSenderId: "338546004875",
  appId: "1:338546004875:web:a106dd0f4cf494e387158e",
  measurementId: "G-CN40HGGPXZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// Save favourite to Firestore
export const saveFavourite = async (userId, recipe) => {
  const ref = doc(db, "users", userId);
  await setDoc(ref, { favourites: arrayUnion(recipe) }, { merge: true });
};

// Remove favourite from Firestore
export const removeFavourite = async (userId, recipeName) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const favs = (snap.data().favourites || []).filter(f => f.name !== recipeName);
    await updateDoc(ref, { favourites: favs });
  }
};

// Get user data from Firestore
export const getUserData = async (userId) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { favourites: [] };
};

// Save user preferences
export const saveUserPrefs = async (userId, prefs) => {
  const ref = doc(db, "users", userId);
  await setDoc(ref, { prefs }, { merge: true });
};
