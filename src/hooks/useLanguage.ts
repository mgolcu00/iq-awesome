import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectUserLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code.toLowerCase();
        
        // Set Turkish for Turkey, English for others
        const detectedLanguage = countryCode === 'tr' ? 'tr' : 'en';
        
        // Only change if different from current
        if (i18n.language !== detectedLanguage) {
          i18n.changeLanguage(detectedLanguage);
        }
      } catch (error) {
        console.error('Error detecting language:', error);
        // Fallback to English
        i18n.changeLanguage('en');
      }
    };

    // Only detect if no language preference is stored
    if (!localStorage.getItem('i18nextLng')) {
      detectUserLanguage();
    }
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    changeLanguage: (lang: string) => {
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    },
    isRTL: i18n.dir() === 'rtl'
  };
};