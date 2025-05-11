
import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question_text: "What is the best way to save money for a long-term goal?",
    options: [
      { option_name: "A", option_text: "Save a fixed amount every month", is_correct: false },
      { option_name: "B", option_text: "Save a percentage of your income every month", is_correct: true },
      { option_name: "C", option_text: "Save whatever is left over after spending", is_correct: false },
      { option_name: "D", option_text: "Invest in stocks or mutual funds", is_correct: false }
    ],
    correct_answer: "B"
  },
  {
    id: 2,
    question_text: "What is the difference between a need and a want?",
    options: [
      { option_name: "A", option_text: "A necessity for survival", is_correct: false },
      { option_name: "B", option_text: "Something you can't live without", is_correct: false },
      { option_name: "C", option_text: "Something you want but don't need", is_correct: true },
      { option_name: "D", option_text: "Something you can't afford", is_correct: false }
    ],
    correct_answer: "C"
  },
  {
    id: 3,
    question_text: "Why is it important to track your spending?",
    options: [
      { option_name: "A", option_text: "To know how much money you have", is_correct: false },
      { option_name: "B", option_text: "To avoid overspending", is_correct: true },
      { option_name: "C", option_text: "To make sure you're saving enough", is_correct: false },
      { option_name: "D", option_text: "To see where you can cut back on spending", is_correct: false }
    ],
    correct_answer: "B"
  },
  {
    id: 4,
    question_text: "What is the purpose of a budget?",
    options: [
      { option_name: "A", option_text: "To plan and control income and expenses", is_correct: true },
      { option_name: "B", option_text: "To save money for the future", is_correct: false },
      { option_name: "C", option_text: "To invest in stocks or mutual funds", is_correct: false },
      { option_name: "D", option_text: "To buy things you want without thinking about the cost", is_correct: false }
    ],
    correct_answer: "A"
  },
  {
    id: 5,
    question_text: "What does it mean to 'diversify' your investments?",
    options: [
      { option_name: "A", option_text: "Spreading money across different assets to reduce risk", is_correct: true },
      { option_name: "B", option_text: "Investing in only one type of asset", is_correct: false },
      { option_name: "C", option_text: "Investing in assets that are similar to each other", is_correct: false },
      { option_name: "D", option_text: "Investing in assets that are completely unrelated", is_correct: false }
    ],
    correct_answer: "A"
  }
];
