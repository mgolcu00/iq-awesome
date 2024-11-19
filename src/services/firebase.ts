import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';

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

// Mock data structure for questions
export interface FirestoreQuestion {
  id: string;
  category: string;
  difficulty: number;
  question: {
    en: string;
    tr: string;
  };
  options: {
    en: string[];
    tr: string[];
  };
  correctAnswer: string;
  points: number;
  timeLimit: number;
}

// Mock functions for future implementation
export const getQuestions = async (language: string = 'en') => {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(questionsRef, where('active', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export const saveTestResult = async (result: any) => {
  try {
    const resultsRef = collection(db, 'results');
    await addDoc(resultsRef, {
      ...result,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error saving test result:', error);
  }
};