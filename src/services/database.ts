import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { TestResult, Question } from '../types';

export const saveTestResult = async (result: TestResult) => {
  try {
    const resultsRef = collection(db, 'results');
    const docRef = await addDoc(resultsRef, {
      ...result,
      timestamp: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

export const getTopScores = async (limit = 10) => {
  try {
    const resultsRef = collection(db, 'results');
    const q = query(resultsRef, orderBy('score', 'desc'), limit(limit));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching top scores:', error);
    throw error;
  }
};

export const getQuestionsByCategory = async (category: string, language: string = 'en') => {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('category', '==', category),
      where('active', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Question[];
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getUserStats = async (userId: string) => {
  try {
    const resultsRef = collection(db, 'results');
    const q = query(resultsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};