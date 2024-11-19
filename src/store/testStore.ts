import { create } from 'zustand';
import { Question, SimpleTest, UserSession } from '../data/types';

interface TestState {
  currentQuestion: number;
  questions: Question[];
  answers: Record<string, string>;
  session: UserSession | null;
  test: SimpleTest | null;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  setSession: (session: UserSession) => void;
  setTest: (test: SimpleTest) => void;
  reset: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentQuestion: 0,
  questions: [],
  answers: {},
  session: null,
  test: null,
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  setSession: (session) => set({ session }),
  setTest: (test) => set({ test }),
  reset: () => set({
    currentQuestion: 0,
    questions: [],
    answers: {},
    session: null,
    test: null,
  }),
}));