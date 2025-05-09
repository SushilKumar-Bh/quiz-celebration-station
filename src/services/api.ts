
import { QuizQuestion } from "@/types/quiz";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

export interface QuizApiResponse {
  questions: QuizQuestion[];
}

export interface AnswerSubmissionRequest {
  questionId: number;
  selectedOption: number;
}

export interface AnswerSubmissionResponse {
  isCorrect: boolean;
  message?: string;
}

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/questions`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data: QuizApiResponse = await response.json();
    return data.questions;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

export const submitAnswer = async (
  questionId: number, 
  selectedOption: number
): Promise<AnswerSubmissionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        selectedOption,
      } as AnswerSubmissionRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit answer: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
