export interface Question {
  id: number;
  category: 'logical' | 'verbal' | 'spatial' | 'numerical';
  difficulty: 1 | 2 | 3;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  timeLimit: number;
  translations?: {
    tr: {
      question: string;
      options: string[];
    };
  };
}

export interface TestResult {
  score: number;
  categoryScores: Record<string, number>;
  timeSpent: number;
  accuracy: number;
  percentile?: number;
}

export interface UserSession {
  sessionId: string;
  startTime: number;
  answers: Record<number, string>;
  timePerQuestion: Record<number, number>;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}