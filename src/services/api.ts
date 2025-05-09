
import { ApiQuestionResponse, AnswerSubmissionRequest, AnswerSubmissionResponse, QuizQuestion } from "@/types/quiz";

const API_BASE_URL = "http://localhost:8000/quiz/api"; // Update with the local API URL

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_questionnaire/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data: ApiQuestionResponse = await response.json();
    return data.questions;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

export const submitAnswer = async (
  questionId: number, 
  selectedOption: string
): Promise<AnswerSubmissionResponse> => {
  try {
    // Generate a unique user name (could be replaced with actual user identification)
    const userName = `user-${Math.random().toString(36).substring(2, 10)}`;
    
    const payload: AnswerSubmissionRequest = {
      user_name: userName,
      user_response: {
        questionnaire_id: 1, // Assuming questionnaire_id is 1 for now
        question_id: questionId,
        user_selected_option: selectedOption
      }
    };
    
    const response = await fetch(`${API_BASE_URL}/submit_answer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit answer: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Map the response to the expected format
    return {
      isCorrect: result.isCorrect || result.is_correct || false,
      message: result.message || ''
    };
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
