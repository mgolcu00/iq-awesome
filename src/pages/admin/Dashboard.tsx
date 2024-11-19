import React, { useEffect, useState } from 'react';
import { BarChart2, Users, FileQuestion, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalytics } from '../../data/services/adminService';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    questions: 0,
    sessions: 0,
    tests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const analyticsData = await getAnalytics();

        setAnalytics(analyticsData);
      } catch (err) {
        setError('Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const stats = [
    { icon: <Users className="w-8 h-8" />, label: 'Total Sessions', value: analytics.sessions.toString() },
    { icon: <FileQuestion className="w-8 h-8" />, label: 'Active Questions', value: analytics.questions.toString() },
    { icon: <BarChart2 className="w-8 h-8" />, label: 'Tests Taken', value: analytics.tests.toString() },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;