import { useState } from 'react';
import { useTestStore } from '../store/testStore';
import * as questionService from '../data/services/questionService';
import * as  sessionService from '../data/services/sessionService';
import * as  testService from '../data/services/testService';

export const useTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    setSession,
    setTest,
    setQuestions,
    sessionId,
    testId,
    answers,
  } = useTestStore();

  const startNewTest = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create new session
      const session = await sessionService.createUserSession();
      setSession(session.id);

      // Start new test
      const test = await testService.startTest(session.id);
      setTest(test.id);

      // Load questions
      const questions = await questionService.getQuestionsByLanguage('en');
      setQuestions(questions);

      return true;
    } catch (err) {
      setError('Failed to start test');
      console.error('Error starting test:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitTest = async () => {
    if (!sessionId || !testId) {
      setError('Invalid test state');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      await testService.endTest(testId, answers);

      return true;
    } catch (err) {
      setError('Failed to submit test');
      console.error('Error submitting test:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    startNewTest,
    submitTest
  };
};