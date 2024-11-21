import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, ArrowRight, Trophy, Target, Clock, Users, Star, BarChart2, Zap, CheckCircle, Sparkles } from 'lucide-react';
import { useTestStore } from '../store/testStore';
import * as sessionService from '../data/services/sessionService';
import * as testService from '../data/services/testService';
import * as questionService from '../data/services/questionService';
import { Card } from '../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../components/ui/ThemeProvider';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const {
    setSession,
    setTest,
    setQuestions,
    setLoading,
    setError,
    isLoading,
    error,
    language,
    reset,
    setLanguage
  } = useTestStore();

  useEffect(() => {
    var currentLang = i18n.language as 'en' | 'tr';
    if (currentLang.toLowerCase() == "tr-TR".toLowerCase()) {
      currentLang = "tr"
      i18n.changeLanguage("tr");
    }
    if (currentLang.toLowerCase() == "en-US".toLowerCase()) {
      currentLang = "en"
      i18n.changeLanguage("en");
    }
    console.log(currentLang);
    setLanguage(currentLang);
  }, [i18n.language, setLanguage]);

  const handleStartTest = async () => {
    try {
      reset();
      
      setLoading(true);
      setError(null);

   

      const session = await sessionService.createUserSession();
      setSession(session.id);

      const test = await testService.startTest(session.id);
      setTest(test.id);

      const questions = await questionService.getQuestionsByLanguage(language);
      setQuestions(questions);

      navigate('/test');
    } catch (err) {
      console.error('Failed to start test:', err);
      setError(t('landing.hero.error'));
    } finally {
      setLoading(false);
    }
  };

  const distributionData = [
    { range: '70-80', percentage: 10 },
    { range: '80-90', percentage: 15 },
    { range: '90-100', percentage: 25 },
    { range: '100-110', percentage: 30 },
    { range: '110-120', percentage: 15 },
    { range: '120-130', percentage: 5 },
  ];

  const features = [
    {
      icon: <Target className="w-12 h-12 text-blue-500 dark:text-blue-400" />,
      title: t('landing.features.scientific.title'),
      description: t('landing.features.scientific.description')
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: t('landing.features.analysis.title'),
      description: t('landing.features.analysis.description')
    },
    {
      icon: <Zap className="w-12 h-12 text-amber-500 dark:text-amber-400" />,
      title: t('landing.features.quick.title'),
      description: t('landing.features.quick.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 dark:opacity-20 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>

        <div className="container mx-auto px-4 pt-20 pb-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
                <Brain className="w-24 h-24 relative text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {t('landing.hero.title')}
            </h1>

            <p className="text-2xl mb-12 leading-relaxed text-gray-600 dark:text-gray-300">
              {t('landing.hero.subtitle')}
            </p>

            {error && (
              <div className="max-w-md mx-auto mb-6 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleStartTest}
              disabled={isLoading}
              className="group relative inline-flex items-center px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full font-bold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-white dark:bg-white/10 rounded-full blur-lg group-hover:blur-xl opacity-20"></span>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('landing.hero.loading')}
                </>
              ) : (
                <>
                  {t('landing.hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                {t('landing.stats.testDuration')}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                {t('landing.stats.totalUsers')}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {t('landing.methodology.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('landing.methodology.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Distribution Chart */}
          <Card className="p-8 dark:bg-gray-800/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {t('landing.distribution.title')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributionData}>
                  <XAxis
                    dataKey="range"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                  />
                  <YAxis
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      color: isDark ? '#e2e8f0' : '#1e293b'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke={isDark ? '#818cf8' : '#4f46e5'}
                    strokeWidth={3}
                    dot={{
                      fill: isDark ? '#818cf8' : '#4f46e5',
                      strokeWidth: 2
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;