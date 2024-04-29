// QuestionCard.tsx

import React from 'react';

interface Question {
    id: number;
    text: string;
}

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: boolean) => void;
    onNext: () => void;
    onPrevious: () => void;
    canGoBack: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onNext, onPrevious, canGoBack }) => {
    return (
        <div className="question-card">
            <p>{question.text}</p>
            <button onClick={() => onAnswer(true)}>Yes</button>
            <button onClick={() => onAnswer(false)}>No</button>
            <div>
                {canGoBack && <button onClick={onPrevious}>Previous</button>}
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

export default QuestionCard;