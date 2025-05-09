
import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question_text: "What is the capital of France?",
    options: [
      { option_name: "A", options_text: "London" },
      { option_name: "B", options_text: "Berlin" },
      { option_name: "C", options_text: "Paris" },
      { option_name: "D", options_text: "Madrid" }
    ],
    correct_answer: "C"
  },
  {
    id: 2,
    question_text: "Which planet is known as the Red Planet?",
    options: [
      { option_name: "A", options_text: "Venus" },
      { option_name: "B", options_text: "Mars" },
      { option_name: "C", options_text: "Jupiter" },
      { option_name: "D", options_text: "Saturn" }
    ],
    correct_answer: "B"
  },
  {
    id: 3,
    question_text: "What is the largest ocean on Earth?",
    options: [
      { option_name: "A", options_text: "Atlantic Ocean" },
      { option_name: "B", options_text: "Indian Ocean" },
      { option_name: "C", options_text: "Arctic Ocean" },
      { option_name: "D", options_text: "Pacific Ocean" }
    ],
    correct_answer: "D"
  },
  {
    id: 4,
    question_text: "Who wrote 'Romeo and Juliet'?",
    options: [
      { option_name: "A", options_text: "Charles Dickens" },
      { option_name: "B", options_text: "William Shakespeare" },
      { option_name: "C", options_text: "Jane Austen" },
      { option_name: "D", options_text: "Mark Twain" }
    ],
    correct_answer: "B"
  },
  {
    id: 5,
    question_text: "What is the chemical symbol for gold?",
    options: [
      { option_name: "A", options_text: "Go" },
      { option_name: "B", options_text: "Gd" },
      { option_name: "C", options_text: "Au" },
      { option_name: "D", options_text: "Ag" }
    ],
    correct_answer: "C"
  }
];
