import { Question } from '../types';

export const mockQuestions: Question[] = [
  // Previous questions remain...
  {
    id: 6,
    category: 'spatial',
    difficulty: 2,
    question: "Which 3D shape would result from folding this pattern?",
    options: [
      "https://images.unsplash.com/photo-1612178537261-bccd437b738e?w=300",
      "https://images.unsplash.com/photo-1612178537262-bccd437b739e?w=300",
      "https://images.unsplash.com/photo-1612178537263-bccd437b740e?w=300",
      "https://images.unsplash.com/photo-1612178537264-bccd437b741e?w=300"
    ],
    correctAnswer: "https://images.unsplash.com/photo-1612178537261-bccd437b738e?w=300",
    points: 20,
    timeLimit: 90,
    translations: {
      tr: {
        question: "Bu deseni katladığınızda hangi 3B şekil oluşur?",
        options: [
          "https://images.unsplash.com/photo-1612178537261-bccd437b738e?w=300",
          "https://images.unsplash.com/photo-1612178537262-bccd437b739e?w=300",
          "https://images.unsplash.com/photo-1612178537263-bccd437b740e?w=300",
          "https://images.unsplash.com/photo-1612178537264-bccd437b741e?w=300"
        ]
      }
    }
  },
  {
    id: 7,
    category: 'numerical',
    difficulty: 3,
    question: "If a sequence follows the pattern: 3, 7, 15, 31, what is the next number?",
    options: ["63", "51", "47", "59"],
    correctAnswer: "63",
    points: 25,
    timeLimit: 60,
    translations: {
      tr: {
        question: "Bir dizi 3, 7, 15, 31 şeklinde ilerliyorsa, sıradaki sayı nedir?",
        options: ["63", "51", "47", "59"]
      }
    }
  },
  {
    id: 8,
    category: 'verbal',
    difficulty: 2,
    question: "LIGHT is to DARK as UP is to:",
    options: ["BOTTOM", "DOWN", "LOW", "UNDER"],
    correctAnswer: "DOWN",
    points: 15,
    timeLimit: 45,
    translations: {
      tr: {
        question: "IŞIK ile KARANLIK arasındaki ilişki, YUKARI ile hangisi arasındadır:",
        options: ["ALT", "AŞAĞI", "DÜŞÜK", "ALTTA"]
      }
    }
  },
  {
    id: 9,
    category: 'logical',
    difficulty: 3,
    question: "In a logical sequence, if RED = 27 and BLUE = 32, what does GREEN equal?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "40",
    points: 20,
    timeLimit: 75,
    translations: {
      tr: {
        question: "Mantıksal bir dizide, KIRMIZI = 27 ve MAVİ = 32 ise, YEŞİL kaça eşittir?",
        options: ["35", "40", "45", "50"]
      }
    }
  },
  {
    id: 10,
    category: 'spatial',
    difficulty: 1,
    question: "Which image is the mirror reflection of the given pattern?",
    options: [
      "https://images.unsplash.com/photo-1612178537265-bccd437b742e?w=300",
      "https://images.unsplash.com/photo-1612178537266-bccd437b743e?w=300",
      "https://images.unsplash.com/photo-1612178537267-bccd437b744e?w=300",
      "https://images.unsplash.com/photo-1612178537268-bccd437b745e?w=300"
    ],
    correctAnswer: "https://images.unsplash.com/photo-1612178537266-bccd437b743e?w=300",
    points: 10,
    timeLimit: 45,
    translations: {
      tr: {
        question: "Verilen desenin ayna yansıması hangi görüntüdür?",
        options: [
          "https://images.unsplash.com/photo-1612178537265-bccd437b742e?w=300",
          "https://images.unsplash.com/photo-1612178537266-bccd437b743e?w=300",
          "https://images.unsplash.com/photo-1612178537267-bccd437b744e?w=300",
          "https://images.unsplash.com/photo-1612178537268-bccd437b745e?w=300"
        ]
      }
    }
  }
];