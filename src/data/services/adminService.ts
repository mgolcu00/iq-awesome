import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { Question, SimpleTest, TestResult, UserSession } from '../types';
import * as questionService from './questionService';
import * as sessionService from './sessionService';
import * as testService from './testService';

export const getAnalytics = async (): Promise<{ questions: number, sessions: number, tests: number }> => {
    try {
        const questions = await questionService.getQuestions();
        const sessions = await sessionService.getUserSessions();
        const tests = await testService.getAllTests();
        const analytics = {
            questions: questions.length,
            sessions: sessions.length,
            tests: tests.length,
        };
        return analytics;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
}
export interface TestWithResult extends SimpleTest {
    result: TestResult;
}

export interface SessionWithTests extends UserSession {
    tests: TestWithResult[];
}

export const getSessions = async (): Promise<SessionWithTests[]> => {
    try {
        const sessions = await sessionService.getUserSessions();
        const sessionsWithTests = await Promise.all(sessions.map(async session => {
            const tests = await testService.getAllTestsWithResultsBySessionId(session.id);
            return { ...session, tests } as SessionWithTests;
        }));
        return sessionsWithTests;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
}

export const getSessionDetails = async (sessionId: string): Promise<{ session: UserSession, tests: SimpleTest[] }> => {
    try {
        const session = await sessionService.getUserSession(sessionId);
        const tests = await testService.getAllTestsWithResultsBySessionId(sessionId);
        return { session, tests };
    } catch (error) {
        console.error('Error fetching session details:', error);
        throw error;
    }
}


