import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, getDoc } from 'firebase/firestore';
import { UserSession } from '../types';

export const createUserSession = async (language: "en" | "tr" = "en"): Promise<UserSession> => {
    try {
        const sessionsRef = collection(db, 'sessions');
        const session: UserSession = {
            language,
            mail: "",
            id: ""
        };
        const added = await addDoc(sessionsRef, session);
        session.id = added.id;
        await updateDoc(doc(db, 'sessions', added.id), { id: added.id });
        return session;
    } catch (error) {
        console.error('Error creating user session:', error);
        throw error;
    }
};

export const getUserSession = async (sessionId: string): Promise<UserSession> => {
    try {
        const sessionRef = doc(db, 'sessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);
        const session = sessionSnap.data() as UserSession;
        return session;
    } catch (error) {
        console.error('Error fetching user session:', error);
        throw error;
    }
};

export const updateUserSession = async (sessionId: string, session: Partial<UserSession>): Promise<void> => {
    try {
        const sessionRef = doc(db, 'sessions', sessionId);
        await updateDoc(sessionRef, session);
    } catch (error) {
        console.error('Error updating user session:', error);
        throw error;
    }
};

export const getUserSessions = async (): Promise<UserSession[]> => {
    try {
        const sessionsRef = collection(db, 'sessions');
        const snapshot = await getDocs(sessionsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as UserSession));
    } catch (error) {
        console.error('Error fetching user sessions:', error);
        throw error;
    }
};