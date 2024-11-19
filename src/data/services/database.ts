import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { TestResult, Question, SimpleTest, UserSession } from '../types';

export const saveTestResult = async (result: SimpleTest) => {
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

export const createUserSession = async (email: string): Promise<UserSession> => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const session: UserSession = {
      sessionId: Math.random().toString(36).substring(2, 15),
      userMail: email
    };
    await addDoc(sessionsRef, session);
    return session;
  } catch (error) {
    console.error('Error creating user session:', error);
    throw error;
  }
};

export const getQuestionsByLanguage = async (language: 'en' | 'tr'): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('language', '==', language),
      where('active', '==', true),
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

export const getTestResults = async (sessionId: string): Promise<SimpleTest[]> => {
  try {
    const resultsRef = collection(db, 'results');
    const q = query(resultsRef, where('sessionId', '==', sessionId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SimpleTest));
  } catch (error) {
    console.error('Error fetching test results:', error);
    throw error;
  }
};