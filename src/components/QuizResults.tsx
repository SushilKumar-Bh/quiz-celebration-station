
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizQuestion } from "@/types/quiz";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: (string | null)[];
  score: number;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, answers, score, onRestart }) => {
  const percentage = Math.round((score / questions.length) * 100);
  
  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <Card className="bg-quiz-card shadow-lg">
        <CardHeader className="bg-quiz-primary text-white rounded-t-lg text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="text-3xl sm:text-4xl font-bold text-quiz-primary mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-lg text-gray-600">
              You scored {percentage}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4 mb-6">
              <div 
                className={`rounded-full h-4 transition-all duration-1000 ease-out ${
                  percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Question Summary</h3>
            {questions.map((q, idx) => (
              <div key={idx} className="border-b pb-3">
                <div className="flex items-start">
                  {answers[idx] === q.correct_answer ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{q.question_text}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your answer: <span className={answers[idx] === q.correct_answer ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {answers[idx] !== null ? answers[idx] : "No answer"}
                      </span>
                    </p>
                    {answers[idx] !== q.correct_answer && (
                      <p className="text-sm text-gray-600">
                        Correct answer: <span className="text-green-600 font-medium">{q.correct_answer}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            onClick={onRestart} 
            className="w-full bg-quiz-secondary hover:bg-quiz-primary text-white"
          >
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResults;
