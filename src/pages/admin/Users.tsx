import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Mail, Calendar, BarChart, ChevronDown, ChevronRight } from 'lucide-react';
import * as adminService from '../../data/services/adminService';
import { format, formatDistanceToNow } from 'date-fns';
import { Question, SimpleTest, TestResult, UserSession } from '../../data/types'




const Users = () => {
  const [sessions, setSessions] = useState<adminService.SessionWithTests[]>([]);
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
        isExpanded: false,
        tests: []
      }));
      setSessions(sessionsWithExpanded);
    } catch (err) {
      setError('Failed to load sessions');
      console.error(err);
    } finally {
      setLoading(false);
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
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Sessions</h1>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="p-6">
            {/* implement sessions here  */}
           <div></div>

          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;