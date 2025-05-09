
import { useState } from "react";
import { QuizQuestion, QuizState } from "@/types/quiz";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Celebration from "./Celebration";
import QuizResults from "./QuizResults";
import { toast } from "sonner";

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: Array(questions.length).fill(null),
    showCelebration: false,
    isCompleted: false
  });
  
  const handleSubmitAnswer = (selectedOption: number) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
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
      toast.error("Sorry! That's not correct. Try the next question!", {
        duration: 3000
      });
      
      // Move to next question after a delay
      setTimeout(() => {
        goToNextQuestion();
      }, 1500);
    }
  };
  
  const handleCelebrationComplete = () => {
    setQuizState(prev => ({ ...prev, showCelebration: false }));
    goToNextQuestion();
  };
  
  const goToNextQuestion = () => {
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
      answers: Array(questions.length).fill(null),
      showCelebration: false,
      isCompleted: false
    });
  };
  
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
