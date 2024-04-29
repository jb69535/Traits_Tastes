// PersonalityTestPage.tsx
// Author: Jun Beom

// Inside questions array(From ../components/PersonalityTest.tsx), each question has an ID and text property.
// QuestionCard.tsx(../card/QuestionCard) has a QuestionCardProps to communicate with this component.
// Inside the QuestionCardProps interface, it has an onAnswer, which is a boolean type.
// End of the question, user will encounter the completion function
// which sends the answers to the backend.

import React, { useState } from "react";
import QuestionCard from "../card/QuestionCard";
import WineCard from "../card/WineCard";
import { questions } from "../services/PersonalityTest";
import "../style/pages/personalitytestpage.css";
import mainLogo from "../assets/MainLogo_BGRemove.svg";

const PersonalityTestPage: React.FC = () => {
  // State for tracking the current question index and the answers collected
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Function to handle when an answer is selected
  const handleAnswer = (answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestionIndex].id]: answer }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to move to the next or previous question
  const changeQuestion = (direction: 'next' | 'previous') => {
    const newIndex = direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
    if (newIndex >= 0 && newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  // Function to handle submission of the test
  const handleSubmit = () => {
    if (!testSubmitted) {  // Prevent multiple submissions
      console.log('Submit button clicked, completion handler called');
      setTestSubmitted(true);  // This triggers the display of WineCard
      // Optionally, call fetchRecommendations or any other async operations here
    }
  };

  const refreshTest = () => {
    // Reset state related to the test
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestSubmitted(false);
  };

  return (
    <div>
      {testSubmitted ? (
        <WineCard answers={answers} onTryAgain={refreshTest} />
      ) : (
        <section id="mbtiTest">
          <div className="mainLogo">
            <img src={mainLogo} alt="Main Logo" />
          </div>
          <div className="test__container">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNext={() => changeQuestion('next')}
              onPrevious={() => changeQuestion('previous')}
              onSubmit={handleSubmit}
              isLast={currentQuestionIndex === questions.length - 1}
              canGoBack={currentQuestionIndex > 0}
              testSubmitted={testSubmitted}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default PersonalityTestPage;