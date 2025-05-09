
export interface QuizOption {
  option_name: string;
  option_text: string;
  is_correct?: boolean;
}

export interface QuizQuestion {
  id?: number;
  question_text: string;
  options: QuizOption[];
  correct_answer?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (string | null)[];
  showCelebration: boolean;
  isCompleted: boolean;
}

export interface ApiQuestionResponse {
  questions: QuizQuestion[];
}

export interface AnswerSubmissionRequest {
  user_name: string;
  user_response: {
    questionnaire_id: number;
    question_id: number;
    user_selected_option: string;
  };
}

export interface AnswerSubmissionResponse {
  isCorrect: boolean;
  message?: string;
}
