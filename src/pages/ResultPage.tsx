import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import { loadStripe } from '@stripe/stripe-js';
import { Brain, BarChart, Target, Zap, Lock, CheckCircle } from 'lucide-react';

const stripePromise = loadStripe('your_publishable_key');

const ResultPage = () => {
  const { t } = useTranslation();
  const { score } = useTestStore();
  const [email, setEmail] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePurchaseReport = async () => {
    if (!email) {
      setShowPaymentModal(true);
      return;
    }
    const stripe = await stripePromise;
    // Implement Stripe payment flow
  };

  const categoryScores = {
    logical: 85,
    verbal: 92,
    spatial: 88,
    memory: 90,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Score Overview */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">{t('results.title', { score })}</h1>
            <p className="text-xl opacity-90">{t('results.percentile', { percent: 75 })}</p>
          </div>

          {/* Category Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(categoryScores).map(([category, score]) => (
              <div key={category} className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="mt-1 text-sm opacity-90">{score}/100</div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Report Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('results.fullReport.title')}</h2>
            <p className="text-gray-600">{t('results.fullReport.description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <BarChart className="w-8 h-8 text-indigo-600" />,
                title: "Detailed Analysis",
                description: "In-depth breakdown of your cognitive strengths"
              },
              {
                icon: <Target className="w-8 h-8 text-indigo-600" />,
                title: "Personalized Insights",
                description: "Custom recommendations for improvement"
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                title: "Performance Tracking",
                description: "Compare your results with others"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Premium Features Preview */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-indigo-600" />
              Premium Report Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Cognitive strength profile",
                "Career compatibility analysis",
                "Personal development plan",
                "Comparative percentile ranking",
                "Scientific methodology explanation",
                "Future potential indicators"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handlePurchaseReport}
            className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition-all font-semibold"
          >
            {t('results.fullReport.cta')}
          </button>
        </div>

        {/* Ad Space */}
        <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-400">
          Advertisement Space
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-6">Enter your email to continue</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={() => {
                if (email) {
                  handlePurchaseReport();
                  setShowPaymentModal(false);
                }
              }}
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 font-semibold"
            >
              Continue to Payment
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full text-gray-600 mt-4 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;