import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, Trophy, Clock, ChevronRight, Star, Users, BarChart2, BookOpen } from 'lucide-react';
import Chart from '../components/Chart';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const distributionData = [
    { range: '80-90', percentage: 15 },
    { range: '90-100', percentage: 25 },
    { range: '100-110', percentage: 35 },
    { range: '110-120', percentage: 15 },
    { range: '120+', percentage: 10 },
  ];

  const features = [
    {
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      title: t('landing.features.scientific.title'),
      description: t('landing.features.scientific.description')
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-blue-400" />,
      title: t('landing.features.analysis.title'),
      description: t('landing.features.analysis.description')
    },
    {
      icon: <Clock className="w-12 h-12 text-green-400" />,
      title: t('landing.features.quick.title'),
      description: t('landing.features.quick.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-purple-600 dark:from-primary-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <div className="flex justify-center mb-8">
            <Brain className="w-24 h-24" />
          </div>
          <h1 className="text-6xl font-bold mb-6">{t('landing.hero.title')}</h1>
          <p className="text-2xl opacity-90 mb-12">{t('landing.hero.subtitle')}</p>
          <button
            onClick={() => navigate('/test')}
            className="bg-white text-primary-600 dark:bg-primary-800 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center mx-auto"
          >
            {t('landing.hero.cta')} <ChevronRight className="ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center transform hover:scale-105 transition-all"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-20">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {t('landing.distribution.title')}
          </h2>
          <p className="text-white/80 text-center mb-8">
            {t('landing.distribution.subtitle')}
          </p>
          <Chart data={distributionData} />
        </div>

        {/* Scientific Methodology */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center mb-20">
          <BookOpen className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">{t('landing.methodology.title')}</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            {t('landing.methodology.description')}
          </p>
        </div>

        {/* Social Proof */}
        <div className="text-center text-white mb-20">
          <div className="flex items-center justify-center mb-6">
            <Star className="w-8 h-8 text-yellow-400" />
            <Star className="w-8 h-8 text-yellow-400" />
            <Star className="w-8 h-8 text-yellow-400" />
            <Star className="w-8 h-8 text-yellow-400" />
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Users className="w-6 h-6" />
            <span>100,000+ {t('landing.distribution.subtitle')}</span>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center text-white/50">
          Advertisement Space
        </div>
      </div>
    </div>
  );
};

export default LandingPage;