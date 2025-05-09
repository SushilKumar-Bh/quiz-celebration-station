
import { useEffect } from "react";
import { Star } from "lucide-react";
import Confetti from "./Confetti";

interface CelebrationProps {
  show: boolean;
  onComplete: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Confetti active={show} />
      <div className="bg-white rounded-xl p-6 text-center animate-scale-in max-w-sm">
        <div className="text-4xl mb-2">🎉</div>
        <div className="flex justify-center space-x-1 mb-4">
          <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
          <Star className="w-8 h-8 text-yellow-400 animate-float" />
          <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-quiz-primary mb-2">Correct!</h2>
        <p className="text-gray-600">Great job! You got it right!</p>
      </div>
    </div>
  );
};

export default Celebration;
