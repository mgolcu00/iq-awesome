import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import * as testService from '../data/services/testService';
import { AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

const TestPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    sessionId,
    testId,
    questions,
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    isLoading,
    error,
    setError,
    setLoading
  } = useTestStore();

  useEffect(() => {
    if (!sessionId || !testId) {
      navigate('/');
    }
  }, [sessionId, testId, navigate]);

  const handleAnswerSelection = (option: string) => {
    const question = questions[currentQuestionIndex];
    if (!question) return;

    setAnswer(question.id, option);

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  };

  const handleSubmitTest = async () => {
    if (!testId) return;

    try {
      setLoading(true);
      setError(null);
      await testService.endTest(testId, answers);
      navigate('/result');
    } catch (err) {
      console.error('Failed to submit test:', err);
      setError('Failed to submit test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <Card className="p-8 max-w-xl mx-auto">
          <div className="text-red-500 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  if (!question) return null;

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrentQuestion = !!answers[question.id];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {t('test.progress', { current: currentQuestionIndex + 1, total: questions.length })}
            </span>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {t(`test.categories.${question.category}`)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
                {t(`test.categories.${question.category}`)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t(`test.difficulty.${question.difficulty}`)}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className={`w-full text-left p-4 rounded-lg border transition-all dark:text-white
                    ${answers[question.id] === option
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/50'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {isLastQuestion && hasAnsweredCurrentQuestion && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSubmitTest}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit Test'}
              </button>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{t('test.warning')}</span>
          </div>
        </Card>

        {/* Ad Space */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-gray-400">
          Advertisement Space
        </div>
      </div>
    </div>
  );
};

export default TestPage;