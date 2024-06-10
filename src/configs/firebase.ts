// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
});

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const firebaseStore = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, provider, firebaseApp, firebaseStore, database };
