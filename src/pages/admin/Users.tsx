import React from 'react';
import { Card } from '../../components/ui/Card';
import { Mail, Calendar, BarChart } from 'lucide-react';

const mockUsers = [
  {
    email: 'user1@example.com',
    lastTest: '2024-03-15',
    testsCompleted: 5,
    averageScore: 85
  },
  {
    email: 'user2@example.com',
    lastTest: '2024-03-14',
    testsCompleted: 3,
    averageScore: 92
  },
  // Add more mock users as needed
];

const Users = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>

      <div className="grid gap-6">
        {mockUsers.map((user, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-900 dark:text-white font-medium">{user.email}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Last test: {user.lastTest}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart className="w-4 h-4" />
                    <span>Tests completed: {user.testsCompleted}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {user.averageScore}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;