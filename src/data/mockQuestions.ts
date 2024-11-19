import { Question } from './types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    category: 'logical',
    difficulty: 2,
    question: "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?",
    options: ["Yes", "No", "Cannot be determined", "More information needed"],
    correctAnswer: "Cannot be determined",
    points: 20,
    language: 'en',
    index: 0
  },
  {
    id: '2',
    category: 'numerical',
    difficulty: 1,
    question: "What comes next in the sequence: 2, 4, 8, 16, ...?",
    options: ["24", "32", "20", "28"],
    correctAnswer: "32",
    points: 15,
    language: 'en',
    index: 1
  },
  {
    id: '3',
    category: 'verbal',
    difficulty: 3,
    question: "Choose the word that best completes the analogy: Book is to Reading as Fork is to _____",
    options: ["Kitchen", "Eating", "Cooking", "Food"],
    correctAnswer: "Eating",
    points: 25,
    language: 'en',
    index: 2
  },
  {
    id: '4',
    category: 'spatial',
    difficulty: 2,
    question: "Which shape would complete the pattern?",
    options: [
      "https://images.unsplash.com/photo-1612178537261-bccd437b738e?w=300",
      "https://images.unsplash.com/photo-1612178537262-bccd437b739e?w=300",
      "https://images.unsplash.com/photo-1612178537263-bccd437b740e?w=300",
      "https://images.unsplash.com/photo-1612178537264-bccd437b741e?w=300"
    ],
    correctAnswer: "https://images.unsplash.com/photo-1612178537261-bccd437b738e?w=300",
    points: 20,
    language: 'en',
    index: 3
  }
];