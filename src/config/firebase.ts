import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config when deploying
  apiKey: "mock-key",
  authDomain: "iq-awesome.firebaseapp.com",
  projectId: "iq-awesome",
  storageBucket: "iq-awesome.appspot.com",
  messagingSenderId: "000000000000",
  appId: "mock-app-id",
  measurementId: "G-MOCK000000"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);