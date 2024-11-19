import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, query, where, Timestamp } from 'firebase/firestore';
import { Question, SimpleTest, TestResult } from '../types';
import { getUserSession } from './sessionService';

export const startTest = async (sessionId: string): Promise<SimpleTest> => {
    try {
        const session = await getUserSession(sessionId);
        const test: SimpleTest = {
            id: "",
            sessionId,
            questionsAndAnswers: {},
            resultId: "",
            timestamp: Timestamp.fromDate(new Date()),
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
        // Input validation
        if (!questionsAndAnswers || Object.keys(questionsAndAnswers).length === 0) {
            throw new Error('No answers provided');
        }

        // Get questions efficiently using their IDs
        const questionIds = Object.keys(questionsAndAnswers);
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, where('id', 'in', questionIds));
        const snapshot = await getDocs(q);

        const questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Question));

        // Validate that all questions were found
        if (questions.length !== questionIds.length) {
            throw new Error('Some questions could not be found');
        }

        // Initialize scoring variables
        const scoring = questions.reduce((acc, question) => {
            const isCorrect = question.correctAnswer === questionsAndAnswers[question.id];
            const points = isCorrect ? question.points : 0;

            // Update category scores
            acc.categoryScores[question.category] = (acc.categoryScores[question.category] || 0) + points;

            // Update totals
            acc.totalPoints += points;
            acc.maxPossiblePoints += question.points;
            acc.correctAnswers += isCorrect ? 1 : 0;

            return acc;
        }, {
            categoryScores: {} as Record<string, number>,
            totalPoints: 0,
            maxPossiblePoints: 0,
            correctAnswers: 0
        });

        // Calculate final scores
        const accuracy = scoring.correctAnswers / questions.length;
        const normalizedScore = (scoring.totalPoints / scoring.maxPossiblePoints) * 100;

        // Calculate percentile (this is a simplified version - consider implementing a more sophisticated percentile calculation)
        const percentile = Math.min(Math.round(normalizedScore), 100);

        const testResult: TestResult = {
            id: "",
            score: Math.round(normalizedScore * 10) / 10, // Round to 1 decimal place
            categoryScores: Object.fromEntries(
                Object.entries(scoring.categoryScores).map(([category, points]) => [
                    category,
                    Math.round((points / scoring.maxPossiblePoints) * 1000) / 10 // Category scores as percentages
                ])
            ),
            accuracy: Math.round(accuracy * 1000) / 1000, // Round to 3 decimal places
            percentile,
            metadata: {
                totalQuestions: questions.length,
                correctAnswers: scoring.correctAnswers,
                maxPossiblePoints: scoring.maxPossiblePoints,
                earnedPoints: scoring.totalPoints
            }
        };

        return testResult;
    } catch (error) {
        console.error('Error calculating score:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to calculate score: ${error.message}`);
        }
        throw new Error('Failed to calculate score');
    }
};

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
};

export const getTestsBySession = async (sessionId: string): Promise<SimpleTest[]> => {
    try {
        const testsRef = collection(db, 'tests');
        const q = query(testsRef, where('sessionId', '==', sessionId));
        const snapshot = await getDocs(q);
        return snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            } as SimpleTest));
    } catch (error) {
        console.error('Error fetching tests by session:', error);
        throw error;
    }
}

export const getTestResultsBySession = async (sessionId: string): Promise<TestResult[]> => {
    try {

        const tests = await getTestsBySession(sessionId);
        const testResults = tests.map(async test => {
            const result = await getTestResult(test.resultId);
            return result;
        });
        return Promise.all(testResults);
    } catch (error) {
        console.error('Error fetching test results by session:', error);
        throw error;
    }
}


export const getAllTests = async (): Promise<SimpleTest[]> => {
    try {
        const testsRef = collection(db, 'tests');
        const snapshot = await getDocs(testsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SimpleTest));
    } catch (error) {
        console.error('Error fetching all tests:', error);
        throw error;
    }
}

export const getTest = async (testId: string): Promise<SimpleTest> => {
    try {
        const testRef = doc(db, 'tests', testId);
        const testSnap = await getDoc(testRef);
        const test = testSnap.data() as SimpleTest;
        return test;
    } catch (error) {
        console.error('Error fetching test:', error);
        throw error;
    }
}

export const getAllTestResults = async (): Promise<TestResult[]> => {
    try {
        const resultsRef = collection(db, 'results');
        const snapshot = await getDocs(resultsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as TestResult));
    } catch (error) {
        console.error('Error fetching all test results:', error);
        throw error;
    }
}

export const getTestResult = async (resultId: string): Promise<TestResult> => {
    try {
        const resultRef = doc(db, 'results', resultId);
        const resultSnap = await getDoc(resultRef);
        const result = resultSnap.data() as TestResult;
        return result;
    } catch (error) {
        console.error('Error fetching test result:', error);
        throw error;
    }
}

export const getAllTestsWithResults = async (): Promise<SimpleTest[]> => {
    try {
        const tests = await getAllTests();
        const testResults = await getAllTestResults();
        return tests.map(test => ({
            ...test,
            result: testResults.find(result => result.id === test.resultId)
        }));
    } catch (error) {
        console.error('Error fetching all tests with results:', error);
        throw error;
    }
}

export const getAllTestsWithResultsBySessionId = async (sessionId: string): Promise<SimpleTest[]> => {
    try {
        const tests = await getAllTests();
        const testResults = await getAllTestResults();
        return tests.map(test => ({
            ...test,
            result: testResults.find(result => result.id === test.resultId)
        })).filter(test => test.sessionId === sessionId);
    } catch (error) {
        console.error('Error fetching all tests with results:', error);
        throw error;
    }
}

