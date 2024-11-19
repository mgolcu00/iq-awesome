import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { Question } from '../types';

export const getQuestions = async (): Promise<Question[]> => {
    try {
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

export const getQuestionsByLanguage = async (language: 'en' | 'tr'): Promise<Question[]> => {
    try {
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
        const questionRef = doc(db, 'questions', id);
        await updateDoc(questionRef, question);
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

export const deleteQuestion = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'questions', id));
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};