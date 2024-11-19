import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import { mockQuestions } from '../data/mockQuestions';
import { AlertCircle } from 'lucide-react';

const TestPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentQuestion, setAnswer, nextQuestion } = useTestStore();
  const question = mockQuestions[currentQuestion];

  useEffect(() => {
    if (!question) {
      navigate('/result');
    }
  }, [question, navigate]);

  if (!question) {
    return null;
  }

  const handleAnswerSelection = (option: string) => {
    setAnswer(question.id, option);
    nextQuestion();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {/* Progress Bar */}
      <div className="container mx-auto max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t('test.progress', { current: currentQuestion + 1, total: mockQuestions.length })}
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {t(`test.categories.${question.category}`)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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
              {t(`questions.${question.id}.question`, { defaultValue: question.question })}
            </h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all dark:text-white"
                >
                  {t(`questions.${question.id}.options.${index}`, { defaultValue: option })}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{t('test.warning')}</span>
          </div>
        </div>

        {/* Ad Space */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-gray-400">
          Advertisement Space
        </div>
      </div>
    </div>
  );
};

export default TestPage;