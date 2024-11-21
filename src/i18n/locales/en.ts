export default {
  common: {
    navigation: {
      home: 'Home',
      test: 'Take Test',
      results: 'Results',
      admin: 'Admin'
    },
    actions: {
      cancel: 'Cancel',
      save: 'Save',
      submit: 'Submit',
      continue: 'Continue',
      goBack: 'Go Back',
      tryAgain: 'Try Again',
      startOver: 'Start Over',
      maybeLater: 'Maybe Later',
      returnHome: 'Return to Home'
    },
    status: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      resultNotFound: 'Result not found'
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: '© 2024 IQ Awesome. All rights reserved.',
      social: 'Follow Us',
      links: 'Quick Links'
    }
  },
  landing: {
    hero: {
      title: 'Discover Your True Cognitive Potential',
      subtitle: 'Take our scientifically designed IQ test and unlock detailed insights about your cognitive abilities',
      cta: 'Start Free IQ Test',
      loading: 'Starting Test...',
      error: 'Failed to start test. Please try again.'
    },
    features: {
      scientific: {
        title: 'Scientific Method',
        description: 'Based on proven cognitive assessment techniques and modern psychometric standards'
      },
      analysis: {
        title: 'Detailed Analysis',
        description: 'Get comprehensive insights into your cognitive strengths and areas for improvement'
      },
      quick: {
        title: 'Quick Results',
        description: 'Complete the test in 30 minutes and get instant detailed feedback'
      }
    },
    stats: {
      testDuration: '30 min',
      totalUsers: '100K+ users',
      rating: '4.9/5 rating'
    },
    distribution: {
      title: 'IQ Score Distribution',
      subtitle: 'Global distribution of test scores',
      ranges: {
        '70-80': 'Below Average',
        '80-90': 'Low Average',
        '90-100': 'Average',
        '100-110': 'High Average',
        '110-120': 'Above Average',
        '120-130': 'Superior'
      }
    },
    methodology: {
      title: 'Why Choose Our IQ Test?',
      subtitle: 'Comprehensive analysis backed by scientific research'
    },
    advertisement: {
      placeholder: 'Advertisement Space'
    }
  },
  test: {
    progress: 'Question {{current}} of {{total}}',
    warning: 'Take your time to consider each answer carefully',
    submit: 'Submit Test',
    submitting: 'Submitting...',
    categories: {
      logical: 'Logical Reasoning',
      verbal: 'Verbal Comprehension',
      spatial: 'Spatial Recognition',
      numerical: 'Numerical Analysis'
    },
    difficulty: {
      1: 'Easy',
      2: 'Medium',
      3: 'Hard'
    }
  },
  results: {
    title: 'Your IQ Score: {{score}}',
    subtitle: "You've demonstrated significant cognitive abilities",
    percentile: 'Top {{percent}}% of test takers',
    accuracy: 'Accuracy: {{accuracy}}%',
    loading: 'Loading your results...',
    error: 'Failed to load test results',
    categories: {
      logical: 'Logical Reasoning',
      verbal: 'Verbal Ability',
      spatial: 'Spatial Recognition',
      numerical: 'Numerical Analysis'
    },
    premium: {
      title: 'Unlock Your Full Potential',
      subtitle: 'Get your comprehensive IQ analysis and detailed report',
      price: '$9.99',
      priceNote: 'One-time payment',
      cta: 'Sold Out',//'Get Premium Analysis',
      emailPlaceholder: 'your@email.com',
      continueToPayment: 'Continue to Payment',
      maybeLater: 'Maybe Later',
      enterEmail: 'Enter your email to receive your detailed IQ analysis report',
      features: {
        analysis: {
          title: 'Detailed Analysis',
          description: 'In-depth breakdown of your cognitive strengths and areas for improvement'
        },
        recommendations: {
          title: 'Personalized Recommendations',
          description: 'Custom strategies to enhance your cognitive abilities'
        },
        profile: {
          title: 'Cognitive Profile',
          description: 'Complete assessment of your mental capabilities across all domains'
        },
        metrics: {
          title: 'Performance Metrics',
          description: 'Detailed statistics and comparisons with global percentiles'
        }
      },
      benefits: {
        title: "What You'll Get",
        items: [
          'Comprehensive cognitive strength analysis',
          'Career compatibility insights',
          'Personal development roadmap',
          'Educational recommendations',
          'Memory enhancement techniques',
          'Problem-solving strategies'
        ]
      }
    },
    actions: {
      takeAnother: 'Take Another Test',
      viewDetails: 'View Details',
      downloadReport: 'Download Report',
      shareResults: 'Share Results'
    },
    advertisement: {
      placeholder: 'Advertisement Space'
    }
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    subtitle: 'Protecting your personal information and ensuring transparency about our data practices.',
    sections: {
      dataCollection: {
        title: 'Data Collection',
        content: 'We collect minimal personal information necessary to provide our IQ testing services. This includes test results, email address, demographic information, and optional user-provided details. All data collection is voluntary and transparent.'
      },
      dataUsage: {
        title: 'Data Usage',
        content: 'Your data is used solely for providing personalized IQ test results, improving our services, and conducting anonymous research with explicit user consent. We never sell or share personal information with third parties without your permission.'
      },
      cookies: {
        title: 'Cookies and Tracking',
        content: 'We use essential cookies to maintain session information and improve user experience. Analytics are anonymized and do not track personal identifiers. Users can manage cookie preferences through their browser settings.'
      },
      dataProtection: {
        title: 'Data Protection',
        content: 'We implement industry-standard encryption and security measures to protect your personal information from unauthorized access. All data is stored securely with restricted access and regular security audits.'
      },
      userRights: {
        title: 'Your Rights',
        content: 'You have the right to access, correct, delete your personal information, and withdraw consent at any time through your account settings. We comply with GDPR and provide full transparency in data handling.'
      },
      lastUpdated: 'Last Updated: November 21, 2024'
    },
    contact: {
      title: 'Contact Us',
      content: 'If you have any questions about our Privacy Policy, please contact us at privacy@iqawesome.com',
      email: 'privacy@iqawesome.com'
    },
    legalCompliance: {
      title: 'Legal Compliance',
      content: 'We are committed to complying with international data protection regulations, including GDPR, CCPA, and other applicable privacy laws.'
    }
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: {{date}}',
    usage: {
      title: 'Usage Terms',
      content: 'These terms govern your use of our services and platform.',
      details: 'By accessing our service, you agree to comply with these terms.'
    },
    intellectual: {
      title: 'Intellectual Property',
      content: 'All content on our platform is protected by intellectual property rights.',
      details: 'Users may not reproduce or distribute our proprietary content without permission.'
    },
    liability: {
      title: 'Liability Disclaimer',
      content: 'We strive to provide accurate and reliable services.',
      details: 'Our liability is limited to the maximum extent permitted by law.'
    }
  }
};