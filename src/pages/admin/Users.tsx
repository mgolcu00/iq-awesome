import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Mail, Calendar, BarChart2, ChevronDown, ChevronRight, Clock, Target, Brain, Award } from 'lucide-react';
import * as adminService from '../../data/services/adminService';
import { format } from 'date-fns';
import { SessionWithTests } from '../../data/services/adminService';

const Users = () => {
  const [sessions, setSessions] = useState<(SessionWithTests & { isExpanded: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const sessionsData = await adminService.getSessions();
      const sessionsWithExpanded = sessionsData.map(session => ({
        ...session,
        isExpanded: false
      })).filter(it => it.tests.length > 0);


      setSessions(sessionsWithExpanded);
    } catch (err) {
      setError('Failed to load sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = (sessionId: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, isExpanded: !session.isExpanded }
        : session
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'logical':
        return <Target className="w-4 h-4" />;
      case 'verbal':
        return <Brain className="w-4 h-4" />;
      case 'numerical':
        return <BarChart2 className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/50 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Sessions</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Sessions: {sessions.length}
        </div>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="overflow-hidden">
            {/* Session Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => toggleSession(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {session.mail || 'Anonymous User'}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(session.tests[0]?.timestamp.toDate() || new Date(), 'PPP')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {format(session.tests[0]?.timestamp.toDate() || new Date(), 'p')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.tests.length} Tests
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Language: {session.language}
                    </div>
                  </div>
                  {session.isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Session Details */}
            {session.isExpanded && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                {session.tests.map((test, index) => (
                  <div
                    key={test.id}
                    className={`p-6 ${index !== session.tests.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Test #{index + 1}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(test.timestamp.toDate(), 'PPp')}
                      </div>
                    </div>

                    {/* Test Results */}
                    {test.result && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Overall Score */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Overall Score</span>
                            <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                              {Math.round(test.result.score)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Accuracy</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {Math.round(test.result.accuracy * 100)}%
                            </span>
                          </div>
                        </div>

                        {/* Category Scores */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="space-y-2">
                            {Object.entries(test.result.categoryScores).map(([category, score]) => (
                              <div key={category} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {getCategoryIcon(category)}
                                  <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                    {category}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {Math.round(score)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Questions and Answers */}
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Answers: {Object.keys(test.questionsAndAnswers).length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {test.result?.percentile && (
                          <div>Percentile: {test.result.percentile}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;