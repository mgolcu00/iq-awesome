import React from 'react';
import { useForm } from 'react-hook-form';
import { Question } from '../../data/types';
// import uuid
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormProps {
  initialData?: Question | null;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ initialData, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Question>({
    defaultValues: initialData || {
      id: uuidv4(),
      category: 'logical',
      difficulty: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
      language: 'en',
      index: 0
    }
  });

  const onSubmit = (data: Question) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Question
          </label>
          <textarea
            {...register('question', { required: 'Question is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
          {errors.question && (
            <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="logical">Logical</option>
            <option value="verbal">Verbal</option>
            <option value="spatial">Spatial</option>
            <option value="numerical">Numerical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <select
            {...register('difficulty')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            {...register('language')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="tr">Turkish</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Points
          </label>
          <input
            type="number"
            {...register('points', { required: 'Points are required', min: 1 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Index
          </label>
          <input
            type="number"
            {...register('index', { required: 'Index is required', min: 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

     

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Options
        </label>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            {...register(`options.${index}` as const, { required: 'Option is required' })}
            placeholder={`Option ${index + 1}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Correct Answer
        </label>
        <input
          {...register('correctAnswer', { required: 'Correct answer is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Question
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;