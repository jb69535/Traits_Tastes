// PersonalityTestPage.tsx
// Author: Jun Beom

// Inside questions array, each question has an ID and text property.
// QuestionCard.tsx(../card/QuestionCard) has a QuestionCardProps to communicate with this component.
// Inside the QuestionCardProps interface, it has an onAnswer, which is a boolean type.
// End of the question, user will encounter the completion function 
// which sends the answers to the backend.


import React, { useState } from 'react';
import QuestionCard from '../card/QuestionCard'; // Adjust the path as necessary
import '../style/pages/personalitytestpage.css';

// Sample questions data
const questions = [
    { id: 1, text: "Do you prefer social gatherings?" },
    { id: 2, text: "I think a lot more than doing a task without plans." },
    // Add more questions as needed
];

const PersonalityTestPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});

    const handleAnswer = (answer: boolean) => {
        const question = questions[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [question.id]: answer }));

        // Optionally move to next question automatically
        handleNext();
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleCompletion();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleCompletion = () => {
        console.log("Answers:", answers);
        // Send answers to backend for wine recommendations
    };

    return (
        <div>
            <section id="mbtiTest">
                <div className="test__container">
                    <QuestionCard
                        question={questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        canGoBack={currentQuestionIndex > 0}
                    />
                </div>
            </section>
        </div>
    );
};

export default PersonalityTestPage;

