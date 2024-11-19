import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import QuestionForm from '../../components/admin/QuestionForm';
import { Question } from '../../types';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '../../services/firebase';

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions(); // Default to English
      setQuestions(data);
    } catch (err) {
      setError('Failed to load questions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (question: Question) => {
    try {
      if (editingQuestion) {
        await updateQuestion(question.id, question);
      } else {
        const id = await addQuestion(question);
        question.id = id;
      }
      await loadQuestions();
      setShowForm(false);
      setEditingQuestion(null);
    } catch (err) {
      setError('Failed to save question');
      console.error(err);
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestion(id);
      await loadQuestions();
    } catch (err) {
      setError('Failed to delete question');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Questions Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <Card className="p-6">
          <QuestionForm
            initialData={editingQuestion}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingQuestion(null);
            }}
          />
        </Card>
      )}

      <div className="grid gap-6">
        {questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {question.question}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Category: {question.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Difficulty: {question.difficulty}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Language: {question.language}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Questions;