// QuestionCard.tsx
// Author: Jun Beom

import React from "react";
import "../style/card/questionCard.css";

interface Question {
  id: number;
  text: string;
  answers: {
    trueText: string;
    falseText: string;
  };
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void; // Submit handler
  canGoBack: boolean;
  isLast: boolean; // Flag to check if this is the last question
  testSubmitted: boolean; // Pass the testSubmitted state
}

/**
 * Represents a single quiz question with answers and navigation controls.
 * 
 * @remarks
 * This component displays a question text, answer buttons, and navigational buttons like previous, next, and submit.
 * 
 * @param props - The props for the QuestionCard component.
 * @param props.question - The question object containing the ID, text, and answers.
 * @param props.onAnswer - Function to handle when an answer is selected.
 * @param props.onNext - Function to navigate to the next question.
 * @param props.onPrevious - Function to navigate to the previous question.
 * @param props.onSubmit - Function to submit the quiz.
 * @param props.canGoBack - Boolean indicating if the user can navigate to the previous question.
 * @param props.isLast - Boolean indicating if this is the last question in the quiz.
 * @param props.testSubmitted - Boolean indicating if the test has been submitted.
 */

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit,
  canGoBack,
  isLast,
  testSubmitted,
}) => {
  return (
    <div className="question-card">
      <div className="question-text">{question.text}</div>
      <div className="answer-buttons">
        <button className="answer-button" onClick={() => onAnswer(true)}>
          {question.answers.trueText}
        </button>
        <button className="answer-button" onClick={() => onAnswer(false)}>
          {question.answers.falseText}
        </button>
      </div>
      <div className="navigation-buttons">
        {canGoBack && (
          <button className="nav-button" onClick={onPrevious}>
            Previous
          </button>
        )}
        {!isLast && (
          <button className="nav-button" onClick={onNext}>
            Next
          </button>
        )}
        {isLast && (
          <button
            className="submit-button"
            onClick={onSubmit}
            disabled={testSubmitted}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
