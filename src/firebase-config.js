// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBdqD90edEoOcD8h_3xyqqUaesu_ER3KCc',
  authDomain: 'learn-js-25006.firebaseapp.com',
  projectId: 'learn-js-25006',
  storageBucket: 'learn-js-25006.firebasestorage.app',
  messagingSenderId: '609270484970',
  appId: '1:609270484970:web:baf84a3504bbb4b9d5ec93',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
