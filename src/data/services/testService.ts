import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { Question, SimpleTest, UserSession, TestResult } from '../types';

import { getUserSession } from './sessionService';

export const startTest = async (sessionId: string): Promise<SimpleTest> => {
    try {
        const session = await getUserSession(sessionId);
        const test: SimpleTest = {
            id: "",
            sessionId,
            questionsAndAnswers: {},
            resultId: "",
            timestamp: new Date(),
        }
        const added = await addDoc(collection(db, 'tests'), test);
        test.id = added.id;
        await updateDoc(doc(db, 'tests', added.id), { id: added.id });
        return test;
    } catch (error) {
        console.error('Error starting test:', error);
        throw error;
    }
}

const calculateScore = async (questionsAndAnswers: Record<string, string>): Promise<TestResult> => {

    try {
        const questionIds = Object.keys(questionsAndAnswers);
        const questionsRef = collection(db, 'questions');
        const snapshot = await getDocs(questionsRef);
        const questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Question));
        let score = 0;
        let categoryScores: Record<string, number> = {};
        let totalQuestions = 0;
        let accuracy = 0;
        let percentile = 0;

        questionIds.forEach(questionId => {
            const question = questions.find(q => q.id === questionId);
            if(question) {
                totalQuestions += 1;
                if (question.correctAnswer === questionsAndAnswers[questionId]) {
                    score += question.points;
                    categoryScores[question.category] = (categoryScores[question.category] || 0) + question.points;
                }
            }
        });
        // Calculate accuracy
        accuracy = score / totalQuestions;
        // Calculate percentile
        percentile = Math.floor((accuracy / 1) * 100);

        const testResult: TestResult = {
            id: "",
            score,
            categoryScores,
            accuracy,
            percentile,
        }


        return testResult;
    } catch (error) {
        console.error('Error calculating score:', error);
        throw error;
    }
}
export const endTest = async (
    testId: string,
    questionsAndAnswers: Record<string, string>
): Promise<TestResult> => {
    try {
        const testResult = await calculateScore(questionsAndAnswers);
        const added = await addDoc(collection(db, 'results'), testResult);
        testResult.id = added.id;
        await updateDoc(doc(db, 'results', added.id), { id: added.id });
        await updateDoc(doc(db, 'tests', testId), {
            questionsAndAnswers,
            resultId: added.id,
        });
        return testResult;
    } catch (error) {
        console.error('Error ending test:', error);
        throw error;
    }
}
