// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCa68yoeuKNFy6xkfAHAla4uTUGfz06sKk',
  authDomain: 'imagegallery-69cdf.firebaseapp.com',
  projectId: 'imagegallery-69cdf',
  storageBucket: 'imagegallery-69cdf.firebasestorage.app',
  messagingSenderId: '733038402773',
  appId: '1:733038402773:web:307d37545a1be9fa12165c',
  measurementId: 'G-S1CLJ3T5YT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
