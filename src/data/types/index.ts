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
  resultId: string;
  timestamp: Date;
}

export interface TestResult {
  id: string;
  score: number;
  categoryScores: Record<string, number>;
  accuracy: number;
  percentile?: number;
}

export interface UserSession {
  id: string;
  language: 'en' | 'tr';
  mail: string;

}