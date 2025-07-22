// firebase.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOOjbAoKAzHaOBA5_DiCoazWKydwkwPG8',
  authDomain: 'qrscannerapp-3551f.firebaseapp.com',
  projectId: 'qrscannerapp-3551f',
  storageBucket: 'qrscannerapp-3551f.appspot.com',
  messagingSenderId: '53885063132',
  appId: '1:53885063132:web:b6cce2b266817e0965c919'
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
