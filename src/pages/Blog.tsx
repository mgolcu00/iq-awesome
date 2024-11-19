import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();

  const mockPosts = [
    {
      id: 1,
      title: 'Understanding IQ Test Results',
      excerpt: 'Learn how to interpret your IQ test results and what they mean for your cognitive abilities.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
    },
    {
      id: 2,
      title: 'The Science Behind IQ Testing',
      excerpt: 'Explore the scientific principles and methodologies used in modern IQ testing.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
    },
    {
      id: 3,
      title: 'Improving Cognitive Performance',
      excerpt: 'Practical tips and exercises to enhance your cognitive abilities and mental performance.',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold mb-4 dark:text-white">{t('blog.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t('blog.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockPosts.map(post => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 dark:text-white">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300">
                  {t('blog.readMore')} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;