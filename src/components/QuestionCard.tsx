
import { useState } from "react";
import { QuizQuestion } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  onSubmit: (selectedOption: string) => void;
  selectedOption: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSubmit, selectedOption }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(selectedOption);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (selectedValue === null) {
      toast.error("Please select an answer before submitting");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate a slight delay for better UX
    setTimeout(() => {
      onSubmit(selectedValue);
      setIsSubmitting(false);
    }, 500);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-scale-in bg-quiz-card shadow-lg">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          {question.question_text}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <RadioGroup
          value={selectedValue !== null ? selectedValue : undefined}
          onValueChange={(value) => setSelectedValue(value)}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 border rounded-md p-3 transition-all",
                selectedValue === option.option_name 
                  ? "border-quiz-primary bg-quiz-background" 
                  : "border-gray-200 hover:border-quiz-secondary"
              )}
            >
              <RadioGroupItem value={option.option_name} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-grow cursor-pointer text-base sm:text-lg"
              >
                <span className="font-medium mr-2">{option.option_name}:</span> {option.option_text}
              </Label>
              {selectedValue === option.option_name && (
                <Check className="w-5 h-5 text-quiz-primary animate-pulse" />
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={selectedValue === null || isSubmitting}
          className="w-full bg-quiz-secondary hover:bg-quiz-primary text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
