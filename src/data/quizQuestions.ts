
import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question_text: "What is the capital of France?",
    options: [
      { option_name: "A", option_text: "London", is_correct: false },
      { option_name: "B", option_text: "Berlin", is_correct: false },
      { option_name: "C", option_text: "Paris", is_correct: true },
      { option_name: "D", option_text: "Madrid", is_correct: false }
    ],
    correct_answer: "C"
  },
  {
    id: 2,
    question_text: "Which planet is known as the Red Planet?",
    options: [
      { option_name: "A", option_text: "Venus", is_correct: false },
      { option_name: "B", option_text: "Mars", is_correct: true },
      { option_name: "C", option_text: "Jupiter", is_correct: false },
      { option_name: "D", option_text: "Saturn", is_correct: false }
    ],
    correct_answer: "B"
  },
  {
    id: 3,
    question_text: "What is the largest ocean on Earth?",
    options: [
      { option_name: "A", option_text: "Atlantic Ocean", is_correct: false },
      { option_name: "B", option_text: "Indian Ocean", is_correct: false },
      { option_name: "C", option_text: "Arctic Ocean", is_correct: false },
      { option_name: "D", option_text: "Pacific Ocean", is_correct: true }
    ],
    correct_answer: "D"
  },
  {
    id: 4,
    question_text: "Who wrote 'Romeo and Juliet'?",
    options: [
      { option_name: "A", option_text: "Charles Dickens", is_correct: false },
      { option_name: "B", option_text: "William Shakespeare", is_correct: true },
      { option_name: "C", option_text: "Jane Austen", is_correct: false },
      { option_name: "D", option_text: "Mark Twain", is_correct: false }
    ],
    correct_answer: "B"
  },
  {
    id: 5,
    question_text: "What is the chemical symbol for gold?",
    options: [
      { option_name: "A", option_text: "Go", is_correct: false },
      { option_name: "B", option_text: "Gd", is_correct: false },
      { option_name: "C", option_text: "Au", is_correct: true },
      { option_name: "D", option_text: "Ag", is_correct: false }
    ],
    correct_answer: "C"
  }
];
