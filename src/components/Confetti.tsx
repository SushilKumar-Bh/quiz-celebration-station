
import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [confettiPieces, setConfettiPieces] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (active) {
      const colors = ["#FEC6A1", "#D6BCFA", "#9b87f5", "#6E59A5", "#FFDEE2"];
      const shapes = ["square", "circle"];
      const newConfetti: JSX.Element[] = [];
      
      // Generate 50 confetti pieces
      for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = `${Math.random() * 100}%`;
        const size = `${Math.random() * 0.7 + 0.5}rem`;
        const delay = `${Math.random() * 2}s`;
        const duration = `${Math.random() * 2 + 3}s`;
        
        newConfetti.push(
          <div 
            key={i}
            className={`absolute ${shape === 'circle' ? 'rounded-full' : ''}`}
            style={{
              left,
              width: size,
              height: size,
              backgroundColor: color,
              animation: `confetti-fall ${duration} linear forwards`,
              animationDelay: delay,
              zIndex: 50,
            }}
          />
        );
      }
      
      setConfettiPieces(newConfetti);
      
      // Reset confetti after animation
      const timer = setTimeout(() => {
        setConfettiPieces([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [active]);
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces}
    </div>
  );
};

export default Confetti;
