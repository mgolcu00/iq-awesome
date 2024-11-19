import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAdminStore } from '../store/adminStore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported
const analytics = await isSupported().then(yes => yes ? getAnalytics(app) : null);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  const { setAuthenticated } = useAdminStore.getState();
  if (user) {
    // User is signed in
    setAuthenticated(true, user.email);
  } else {
    // User is signed out
    setAuthenticated(false, null);
  }
});

export { analytics };