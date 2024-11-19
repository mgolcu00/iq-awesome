import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollText } from 'lucide-react';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <ScrollText className="w-16 h-16 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold mb-4 dark:text-white">{t('terms.title')}</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('terms.usage.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('terms.usage.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('terms.intellectual.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('terms.intellectual.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{t('terms.liability.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('terms.liability.content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;