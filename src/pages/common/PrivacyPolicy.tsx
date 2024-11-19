import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold mb-4 dark:text-white">{t('privacy.title')}</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            {/* Content sections will be populated from translations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('privacy.dataCollection.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('privacy.dataCollection.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('privacy.dataUsage.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('privacy.dataUsage.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('privacy.cookies.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('privacy.cookies.content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;