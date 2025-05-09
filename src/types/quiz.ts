
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in options array
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[]; // Index of selected answer for each question or null if unanswered
  showCelebration: boolean;
  isCompleted: boolean;
}
