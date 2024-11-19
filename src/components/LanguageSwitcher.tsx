import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'tr' : 'en';
    changeLanguage(nextLang);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">
        {currentLang?.flag} {currentLang?.name}
      </span>
    </button>
  );
};

export default LanguageSwitcher;