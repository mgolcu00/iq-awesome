import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import { Brain, Target, BarChart2, Award, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { TestResult } from '../data/types';
import * as testService from '../data/services/testService';

const ResultPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { testId, answers, reset } = useTestStore();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      if (!testId) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        const testResult = await testService.endTest(testId, answers);
        setResult(testResult);
      } catch (err) {
        console.error('Error loading test result:', err);
        setError('Failed to load test results');
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [testId, answers, navigate]);

  const handleStartNewTest = () => {
    reset();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <Card className="max-w-xl mx-auto p-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">{error || 'Result not found'}</div>
            <button
              onClick={() => navigate('/')}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Return to Home
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const categoryIcons = {
    logical: Target,
    verbal: Brain,
    spatial: BarChart2,
    numerical: Award
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Main Score Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 p-8 text-white">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">
                Your IQ Score: {Math.round(result.score)}
              </h1>
              <p className="text-xl opacity-90">
                Top {100 - (result.percentile || 0)}% of test takers
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Category Scores */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(result.categoryScores).map(([category, score]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                      <h3 className="text-lg font-semibold capitalize dark:text-white">
                        {category}
                      </h3>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                        style={{ width: `${(score / result.score) * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Score: {Math.round(score)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round(result.accuracy * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Object.keys(answers).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Questions Answered</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {result.percentile}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Percentile</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartNewTest}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Take Another Test
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Print Results
              </button>
            </div>
          </div>
        </Card>

        {/* Ad Space */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white/50">
          Advertisement Space
        </div>
      </div>
    </div>
  );
};

export default ResultPage;