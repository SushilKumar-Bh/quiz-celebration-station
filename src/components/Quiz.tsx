import { useState, useEffect } from "react";
import { QuizQuestion, QuizState } from "@/types/quiz";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Celebration from "./Celebration";
import QuizResults from "./QuizResults";
import { toast } from "sonner";
import { fetchQuizQuestions, submitAnswer } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { quizQuestions } from "@/data/quizQuestions"; // Import static questions

interface QuizProps {
  questions?: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions: initialQuestions }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    showCelebration: false,
    isCompleted: false
  });
  
  // Fetch questions from API with fallback to static questions
  const { 
    data: fetchedQuestions, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['quizQuestions'],
    queryFn: fetchQuizQuestions,
    enabled: !initialQuestions, // Only fetch if questions weren't provided as props
    onError: (error) => {
      console.error("Failed to load questions from API, using static questions instead:", error);
      toast.error("Failed to load questions from server. Using offline questions instead.", {
        duration: 3000
      });
    }
  });
  
  // Use initialQuestions if provided, then fetchedQuestions if API call was successful, 
  // otherwise fall back to static questions from data folder
  const questions = initialQuestions || (fetchedQuestions && !error ? fetchedQuestions : quizQuestions);
  
  // Initialize answers array once questions are loaded
  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuizState(prev => ({
        ...prev,
        answers: Array(questions.length).fill(null)
      }));
    }
  }, [questions]);
  
  const handleSubmitAnswer = async (selectedOption: string) => {
    if (!questions || questions.length === 0) return;
    
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const questionId = currentQuestion.id || (quizState.currentQuestionIndex + 1); // Fallback to index+1 if no ID
    
    try {
      // Submit answer to the server
      const result = await submitAnswer(questionId, selectedOption);
      // Check if the selected option matches the correct answer for this question
      const isCorrect = selectedOption === currentQuestion.correct_answer;
      
      // Update answers array
      const newAnswers = [...quizState.answers];
      newAnswers[quizState.currentQuestionIndex] = selectedOption;
      
      // Update state with answer and show celebration if correct
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: isCorrect ? prev.score + 1 : prev.score,
        showCelebration: isCorrect
      }));
      
      // Show toast notification for incorrect answers
      if (!isCorrect) {
        toast.error(result.message || "Sorry! That's not correct. Try the next question!", {
          duration: 3000
        });
        
        // Move to next question after a delay
        setTimeout(() => {
          goToNextQuestion();
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      toast.error("Failed to submit your answer. Please try again.", {
        duration: 3000
      });
    }
  };
  
  const handleCelebrationComplete = () => {
    setQuizState(prev => ({ ...prev, showCelebration: false }));
    goToNextQuestion();
  };
  
  const goToNextQuestion = () => {
    if (!questions || questions.length === 0) return;
    
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex < questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex
      }));
    } else {
      // Quiz completed
      setQuizState(prev => ({
        ...prev,
        isCompleted: true
      }));
      toast.success("Quiz completed! Let's see how you did.", {
        duration: 3000
      });
    }
  };
  
  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: questions ? Array(questions.length).fill(null) : [],
      showCelebration: false,
      isCompleted: false
    });
  };
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center py-12">
        <div className="animate-pulse bg-gray-200 h-8 w-40 mx-auto rounded mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-40 w-full mx-auto rounded"></div>
      </div>
    );
  }
  
  // Handle error state
  if (error || (!questions && !isLoading)) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center py-12">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Failed to load quiz questions
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the quiz questions. Please try again later.
        </p>
        <button 
          className="bg-quiz-primary text-white px-4 py-2 rounded hover:bg-quiz-secondary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // If no questions available
  if (questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center py-12">
        <h2 className="text-xl font-bold text-quiz-primary mb-4">
          No questions available
        </h2>
        <p className="text-gray-600">
          There are no quiz questions available at the moment.
        </p>
      </div>
    );
  }
  
  const currentQuestion = questions[quizState.currentQuestionIndex];
  
  return (
    <>
      <Celebration 
        show={quizState.showCelebration} 
        onComplete={handleCelebrationComplete} 
      />
      
      {!quizState.isCompleted ? (
        <div className="w-full max-w-2xl mx-auto px-4">
          <ProgressBar 
            currentQuestion={quizState.currentQuestionIndex} 
            totalQuestions={questions.length} 
          />
          <QuestionCard 
            question={currentQuestion} 
            onSubmit={handleSubmitAnswer}
            selectedOption={quizState.answers[quizState.currentQuestionIndex]}
          />
        </div>
      ) : (
        <QuizResults 
          questions={questions}
          answers={quizState.answers}
          score={quizState.score}
          onRestart={handleRestartQuiz}
        />
      )}
    </>
  );
};

export default Quiz;
