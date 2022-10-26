import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPNBcOjAXxPtbHrAl1R7LleDq5WhYqs_Q",
  authDomain: "natours-220f9.firebaseapp.com",
  projectId: "natours-220f9",
  storageBucket: "natours-220f9.appspot.com",
  messagingSenderId: "337889521392",
  appId: "1:337889521392:web:6d4c24aeb3cc8ffb731c35",
  measurementId: "G-9LH8FEC38M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;
