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
import { calculateMBTIResult } from "../services/MBTICalculator";
import "../style/pages/personalitytestpage.css";
import mainLogo from "../assets/MainLogo_BGRemove.svg";


/**
 * Component for conducting a personality test based on user responses to questions, leading to personalized wine recommendations.
 * 
 * @remarks
 * This component manages the state for the current question index, user answers, test submission status, and resulting MBTI type. It leverages the QuestionCard and WineCard components to interact with the user and display results.
 * 
 * @property currentQuestionIndex - State tracking the index of the current question being displayed.
 * @property answers - State storing the user's answers as a dictionary.
 * @property testSubmitted - State indicating whether the test has been submitted.
 * @property mbtiResult - State holding the calculated MBTI result from the user's answers.
 * 
 * @method handleAnswer - Handles the selection of an answer for the current question.
 * @method changeQuestion - Navigates between questions.
 * @method handleSubmit - Submits the completed test and calculates the MBTI result.
 * @method refreshTest - Resets the test to its initial state for a new session.
 */
const PersonalityTestPage: React.FC = () => {
  // State for tracking the current question index and the answers collected
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [mbtiResult, setMBTIResult] = useState<string | null>(null);

  // Function to handle when an answer is selected
  const handleAnswer = (answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestionIndex].id]: answer }));
    console.log(`Question ${questions[currentQuestionIndex].id} answered: ${answer ? 'True' : 'False'}`);
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
      const result = calculateMBTIResult(answers);
      setMBTIResult(result);
    }
  };

  const refreshTest = () => {
    // Reset state related to the test
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestSubmitted(false);
    setMBTIResult(null);
  };

  return (
    <div>
      {testSubmitted ? (
        <WineCard answers={answers} onTryAgain={refreshTest} mbtiResult={mbtiResult} />
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