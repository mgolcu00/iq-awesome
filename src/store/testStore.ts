import create from 'zustand';

interface TestState {
  currentQuestion: number;
  answers: Record<number, string>;
  score: number;
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  calculateScore: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentQuestion: 0,
  answers: {},
  score: 0,
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  calculateScore: () =>
    set((state) => {
      // Mock scoring logic - replace with actual scoring algorithm
      const score = Object.keys(state.answers).length * 10;
      return { score };
    }),
}));