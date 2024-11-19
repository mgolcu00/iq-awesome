export interface Question {
  id: string;
  category: 'logical' | 'verbal' | 'spatial' | 'numerical';
  difficulty: 1 | 2 | 3;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  language: 'en' | 'tr';
  index: number;
}

export interface SimpleTest {
  id: string;
  sessionId: string;
  questionsAndAnswers: Record<string, string>;
  totalScore: number;
  timeSpent: number;
  accuracy: number;
  percentile: number;
  resultId: string;
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
  userMail: string;
}