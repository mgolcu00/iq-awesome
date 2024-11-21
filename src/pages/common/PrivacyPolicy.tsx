import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Database, Users, Cookie, Lock, FileText, LucideIcon } from 'lucide-react';

export interface PolicySectionProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ icon: Icon, title, content }) => (
  <section className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 mr-4 text-indigo-600 dark:text-indigo-400" />
      <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
    </div>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content}</p>
  </section>
);

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  // Map of icons to use with sections
  const sectionIcons: Record<string, LucideIcon> = {
    dataCollection: Database,
    dataUsage: Users,
    cookies: Cookie,
    dataProtection: Lock,
    userRights: FileText
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            {t('privacyPolicy.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            {t('privacyPolicy.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <PolicySection 
              icon={sectionIcons.dataCollection}
              title={t('privacyPolicy.sections.dataCollection.title')} 
              content={t('privacyPolicy.sections.dataCollection.content')} 
            />
            
            <PolicySection 
              icon={sectionIcons.dataUsage}
              title={t('privacyPolicy.sections.dataUsage.title')} 
              content={t('privacyPolicy.sections.dataUsage.content')} 
            />
            
            <PolicySection 
              icon={sectionIcons.cookies}
              title={t('privacyPolicy.sections.cookies.title')} 
              content={t('privacyPolicy.sections.cookies.content')} 
            />
            
            <PolicySection 
              icon={sectionIcons.dataProtection}
              title={t('privacyPolicy.sections.dataProtection.title')} 
              content={t('privacyPolicy.sections.dataProtection.content')} 
            />
            
            <PolicySection 
              icon={sectionIcons.userRights}
              title={t('privacyPolicy.sections.userRights.title')} 
              content={t('privacyPolicy.sections.userRights.content')} 
            />

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {t('privacyPolicy.sections.lastUpdated')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;