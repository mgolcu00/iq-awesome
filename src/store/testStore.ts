import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question } from '../data/types';

interface TestState {
  sessionId: string | null;
  testId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  language: "en" | "tr";

  setSession: (sessionId: string) => void;
  setTest: (testId: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLanguage: (language: "en" | "tr") => void;
  reset: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      sessionId: null,
      testId: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      isLoading: false,
      error: null,
      language: 'en',

      setSession: (sessionId) => set({ sessionId }),
      setTest: (testId) => set({ testId }),
      setQuestions: (questions) => set({ questions }),
      setAnswer: (questionId, answer) => set((state) => ({
        answers: { ...state.answers, [questionId]: answer }
      })),
      nextQuestion: () => set((state) => ({
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setLanguage: (language) => set({ language }),
      reset: () => set({
        testId: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        isLoading: false,
        error: null
      })
    }),
    {
      name: 'test-storage',
      partialize: (state) => ({ language: state.language })
    }
  )
);