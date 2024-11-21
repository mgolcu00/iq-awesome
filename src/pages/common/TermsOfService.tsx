import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ScrollText, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Globe, 
  Shield 
} from 'lucide-react';

const TermsOfService = () => {
  const { t, i18n } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    usage: false,
    intellectual: false,
    liability: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const renderSection = (sectionKey: string) => {
    const isExpanded = expandedSections[sectionKey];
    const iconMap :Record<string,any> = {
      "usage": <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />,
      "intellectual": <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />,
      "liability": <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
    };

    return (
      <div 
        className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        key={sectionKey}
      >
        <div 
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center">
            {iconMap[sectionKey]}
            <h2 className="text-xl font-semibold dark:text-white">
              {t(`terms.${sectionKey}.title`)}
            </h2>
          </div>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {isExpanded && (
          <div className="p-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
            <p>{t(`terms.${sectionKey}.content`)}</p>
            {t(`terms.${sectionKey}.details`) && (
              <div className="mt-4 text-sm italic opacity-80">
                {t(`terms.${sectionKey}.details`)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <ScrollText className="w-16 h-16 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            {t('terms.title')}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            {['usage', 'intellectual', 'liability'].map(renderSection)}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            {t('terms.lastUpdated', { date: '2024-11-21' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;