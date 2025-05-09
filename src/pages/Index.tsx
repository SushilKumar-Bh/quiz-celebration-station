
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <div className="min-h-screen bg-quiz-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-quiz-primary mb-2">
            Quiz Celebration Station
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Test your knowledge with these fun questions. 
            Get ready for celebrations when you answer correctly!
          </p>
        </header>
        
        <Quiz />
      </div>
    </div>
  );
};

export default Index;
