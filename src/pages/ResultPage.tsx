import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import { Brain, Target, BarChart2, Award, ChevronRight, Lock, CheckCircle, Star, TrendingUp, Zap } from 'lucide-react';
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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
        setError(t('results.error'));
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [testId, answers, navigate, t]);

  const handleStartNewTest = () => {
    reset();
    navigate('/');
  };

  const premiumFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: t('results.premium.features.analysis.title'),
      description: t('results.premium.features.analysis.description')
    },
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      title: t('results.premium.features.recommendations.title'),
      description: t('results.premium.features.recommendations.description')
    },
    {
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      title: t('results.premium.features.profile.title'),
      description: t('results.premium.features.profile.description')
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-green-500" />,
      title: t('results.premium.features.metrics.title'),
      description: t('results.premium.features.metrics.description')
    }
  ];

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
            <div className="text-red-500 mb-4">{error || t('common.status.resultNotFound')}</div>
            <button
              onClick={() => navigate('/')}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {t('common.actions.returnHome')}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Main Score Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }} />
            </div>

            <div className="text-center relative">
              <Brain className="w-20 h-20 mx-auto mb-6" />
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1 mb-4">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">{t('results.percentile', { percent: result.percentile })}</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                {t('results.title', { score: Math.round(result.score) })}
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {t('results.subtitle')}
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Category Scores */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(result.categoryScores).map(([category, score]) => (
                <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-4">
                      {category === 'logical' && <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                      {category === 'verbal' && <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                      {category === 'spatial' && <BarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                      {category === 'numerical' && <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize dark:text-white">
                        {t(`results.categories.${category}`)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('results.accuracy', { accuracy: Math.round((score / result.score) * 100) })}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${(score / result.score) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Features */}
            <Card className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white p-8 mb-8">
              <div className="text-center mb-8">
                <Lock className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">{t('results.premium.title')}</h2>
                <p className="text-gray-300">
                  {t('results.premium.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {feature.icon}
                      <h3 className="ml-3 font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    {t('results.premium.benefits.title')}
                  </h3>
                  <ul className="space-y-3">
                    {t('results.premium.benefits.items', { returnObjects: true }).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold mb-2">{t('results.premium.price')}</div>
                    <div className="text-sm text-gray-300 mb-6">{t('results.premium.priceNote')}</div>
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      {t('results.premium.cta')}
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <button
                onClick={handleStartNewTest}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t('results.actions.takeAnother')}
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* Ad Space */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white/50">
          {t('results.advertisement.placeholder')}
        </div>
      </div>

      {/* Premium Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-8">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">{t('results.premium.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('results.premium.enterEmail')}
            </p>
            <input
              type="email"
              placeholder={t('results.premium.emailPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
            />
            <button
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors mb-4"
            >
              {t('results.premium.continueToPayment')}
            </button>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {t('results.premium.maybeLater')}
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResultPage;