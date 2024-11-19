import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, ArrowRight } from 'lucide-react';
import { useTestStore } from '../store/testStore';
import * as sessionService from '../data/services/sessionService';
import * as testService from '../data/services/testService';
import * as  questionService from '../data/services/questionService';

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    setSession,
    setTest,
    setQuestions,
    setLoading,
    setError,
    isLoading,
    error,
    language
  } = useTestStore();

  const handleStartTest = async () => {
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
      const questions = await questionService.getQuestionsByLanguage(language);
      setQuestions(questions);

      // Navigate to test page
      navigate('/test');
    } catch (err) {
      console.error('Failed to start test:', err);
      setError('Failed to start test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <div className="flex justify-center mb-8">
            <Brain className="w-24 h-24" />
          </div>
          <h1 className="text-6xl font-bold mb-6">{t('landing.hero.title')}</h1>
          <p className="text-2xl opacity-90 mb-12">{t('landing.hero.subtitle')}</p>

          {error && (
            <div className="max-w-md mx-auto mb-6 bg-red-500 bg-opacity-10 border border-red-300 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleStartTest}
            disabled={isLoading}
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting Test...
              </>
            ) : (
              <>
                {t('landing.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: t('landing.features.scientific.title'),
              description: t('landing.features.scientific.description')
            },
            {
              title: t('landing.features.analysis.title'),
              description: t('landing.features.analysis.description')
            },
            {
              title: t('landing.features.quick.title'),
              description: t('landing.features.quick.description')
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center transform hover:scale-105 transition-all"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;