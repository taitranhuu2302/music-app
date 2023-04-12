// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyD__rXQhUQKPbeqaNGIwJ_XoXz8XLQUkMI',
  authDomain: 'music-app-42864.firebaseapp.com',
  projectId: 'music-app-42864',
  storageBucket: 'music-app-42864.appspot.com',
  messagingSenderId: '298324526046',
  appId: '1:298324526046:web:ddaeac737583a185ae934f',
  measurementId: 'G-M610PFQ00Q',
});

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const firebaseStore = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, provider, firebaseApp, firebaseStore, database };
