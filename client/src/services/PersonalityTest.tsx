// PersonalityTest.tsx
// Author: Jun Beom
// Sample questions data with custom answers

// - Questions 1, 6, and 10 might influence Extraversion (E) vs. Introversion (I).
// - Questions 2, 4, and 12 focus on Sensing (S) vs. Intuition (N).
// - Questions 9 and 11 could help distinguish Thinking (T) from Feeling (F).
// - Questions 3, 5, and 7 might be used to differentiate Judging (J) from Perceiving (P).

// Count how many points the user scores toward each preference in the dichotomies. 
// For example, if a user chooses more A answers in the E vs. I aligned questions, 
// they would lean towards Extraversion (E). You do this for each set of dichotomy-aligned questions.

// ### **Example of Scoring and Determining Type:**

// Suppose a user's answers are A, A, B, A, B, A, B, A, B, A, B, A. Here's how you'd score and determine their type:

// - **E vs. I**: Answers to Q1, Q6, Q10 are A, A, A (3 points for E, 0 for I) – Predominant: E
// - **S vs. N**: Answers to Q2, Q4, Q12 are A, A, A (3 points for N, 0 for S) – Predominant: N
// - **T vs. F**: Answers to Q9, Q11 are B, B (0 points for T, 2 points for F) – Predominant: F
// - **J vs. P**: Answers to Q3, Q5, Q7 are B, B, B (0 points for J, 3 points for P) – Predominant: P

export const questions = [
  {
    id: 0,
    text: "When attending a social event, you usually...",
    answers: {
      trueText: "Enjoy mingling and meeting new people.",
      falseText: "Stick to discussing familiar topics with close friends.",
    },
  },
  {
    id: 1,
    text: "When choosing a wine, you prefer:",
    answers: {
      trueText: "Trying new and exotic varieties.",
      falseText: "Sticking to your tried-and-true favorites.",
    },
  },
  {
    id: 3,
    text: "In your free time, you would rather:",
    answers: {
      trueText: "Explore creative hobbies or learn something new.",
      falseText: "Relax with your favorite book or movie.",
    },
  },
  {
    id: 4,
    text: "When pairing wine with food, you:",
    answers: {
      trueText: " Like to experiment with unusual combinations.",
      falseText: "Prefer classic pairings that are tried and tested.",
    },
  },
  {
    id: 5,
    text: "At work or while studying, you are more likely to:",
    answers: {
      trueText:
        "Start multiple projects but sometimes struggle to finish them.",
      falseText: "Focus on one task at a time until it's completed.",
    },
  },
  {
    id: 6,
    text: "When you hear about a new restaurant or bar, you:",
    answers: {
      trueText:
        "Can't wait to check it out yourself.",
      falseText: "Wait to hear reviews before you consider going.",
    },
  },
  {
    id: 7,
    text: "Your approach to vacations is more:",
    answers: {
      trueText: "Spontaneous and adventurous.",
      falseText: "Planned and organized.",
    },
  },
  {
    id: 8,
    text: "Regarding wine tasting, you:",
    answers: {
      trueText: "Are excited to learn about the wine's history and production process.",
      falseText:
        "Focus more on whether you simply like the taste or not.",
    },
  },
  {
    id: 9,
    text: "When making decisions, you usually go with:",
    answers: {
      trueText: "Your gut feeling.",
      falseText: "Detailed analysis and data.",
    },
  },
  {
    id: 10,
    text: "When at a wine tasting event, you prefer:",
    answers: {
      trueText:
        "Discussing the nuances of each wine with others.",
      falseText: "Quietly enjoying and savoring each sip.",
    },
  },
  {
    id: 11,
    text: "In discussions, you tend to:",
    answers: {
      trueText: "Enjoy debating and exploring all perspectives.",
      falseText:
        "Seek harmony and consensus.",
    },
  },
  {
    id: 12,
    text: "Your favorite type of wine is usually chosen based on:",
    answers: {
      trueText:
        "Recommendations from sommeliers or experts.",
      falseText: "Personal past experiences and enjoyment.",
    },
  },
  // Add more questions as needed
];
