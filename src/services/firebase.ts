import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { Question, SimpleTest, UserSession, TestResult } from '../types';
import { requireAuth } from './auth';

// Questions Service
export const getQuestions = async (): Promise<Question[]> => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      orderBy('index')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Question));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getQuestionsByLanguage = async (  language: 'en' | 'tr'): Promise<Question[]> => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      orderBy('index'),
      where('language', '==', language)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Question));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const addQuestion = async (question: Omit<Question, 'id'>): Promise<string> => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, question);
    const id = docRef.id;
    await updateDoc(doc(db, 'questions', id), { id });
    return docRef.id;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};

export const updateQuestion = async (id: string, question: Partial<Question>): Promise<void> => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, question);
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const questionRef = doc(db, 'questions', id);
    await deleteDoc(questionRef);
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

// Test Results Service
export const saveTestResult = async (result: Omit<SimpleTest, 'id'>): Promise<string> => {
  try {
    const resultsRef = collection(db, 'results');
    const docRef = await addDoc(resultsRef, {
      ...result,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

// Analytics Service
export const getTestAnalytics = async () => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const resultsRef = collection(db, 'results');
    const snapshot = await getDocs(resultsRef);
    const results = snapshot.docs.map(doc => doc.data() as SimpleTest);
    
    return {
      totalTests: results.length,
      averageScore: results.reduce((acc, curr) => acc + curr.totalScore, 0) / results.length || 0,
      totalUsers: new Set(results.map(r => r.sessionId)).size
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

// Admin Settings Service
export const getAdminSettings = async () => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const settingsRef = collection(db, 'settings');
    const snapshot = await getDocs(settingsRef);
    return snapshot.docs[0]?.data() || {};
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateAdminSettings = async (settings: any) => {
  try {
    await requireAuth(); // Ensure user is authenticated
    const settingsRef = collection(db, 'settings');
    const snapshot = await getDocs(settingsRef);
    const settingDoc = snapshot.docs[0];
    
    if (settingDoc) {
      await updateDoc(doc(db, 'settings', settingDoc.id), settings);
    } else {
      await addDoc(settingsRef, settings);
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};