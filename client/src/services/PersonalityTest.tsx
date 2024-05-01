// PersonalityTest.tsx
// Author: Jun Beom
// Sample questions data with custom answers

// Count how many points the user scores toward each preference in the dichotomies.
// For example, if a user chooses more A answers in the E vs. I aligned questions,
// they would lean towards Extraversion (E). You do this for each set of dichotomy-aligned questions.

export const questions = [
  {
    id: 0,
    text: "When attending a social event, you usually...",
    answers: {
      trueText: "Enjoy mingling and meeting new people.",
      falseText: "Stick to discussing familiar topics with close friends.",
    }, // Answers trueText and falseText correspond to Extraversion and Introversion, respectively.
  },
  {
    id: 1,
    text: "When choosing a wine, you prefer:",
    answers: {
      trueText: "Trying new and exotic varieties.",
      falseText: "Sticking to your tried-and-true favorites.",
    }, // Answers trueText and falseText correspond to Intuition and Sensing, respectively.
  },
  {
    id: 3,
    text: "In your free time, you would rather:",
    answers: {
      trueText: "Explore creative hobbies or learn something new.",
      falseText: "Relax with your favorite book or movie.",
    }, // Answers A and B correspond to Feeling and Thinking, respectively.
  },
  {
    id: 4,
    text: "When pairing wine with food, you:",
    answers: {
      trueText: " Like to experiment with unusual combinations.",
      falseText: "Prefer classic pairings that are tried and tested.",
    }, // Answers A and B correspond to Intuition and Sensing, respectively.
  },
  {
    id: 5,
    text: "At work or while studying, you are more likely to:",
    answers: {
      trueText:
        "Start multiple projects but sometimes struggle to finish them.",
      falseText: "Focus on one task at a time until it's completed.",
    }, // Answers A and B correspond to Thinking and Feeling, respectively.
  },
  {
    id: 6,
    text: "When you hear about a new restaurant or bar, you:",
    answers: {
      trueText: "Can't wait to check it out yourself.",
      falseText: "Wait to hear reviews before you consider going.",
    }, // Answers A and B correspond to Extraversion and Introversion, respectively.
  },
  {
    id: 7,
    text: "Your approach to vacations is more:",
    answers: {
      trueText: "Spontaneous and adventurous.",
      falseText: "Planned and organized.",
    }, // Answers A and B correspond to Perceiving and Judging, respectively.
  },
  {
    id: 8,
    text: "Regarding wine tasting, you:",
    answers: {
      trueText:
        "Are excited to learn about the wine's history and production process.",
      falseText: "Focus more on whether you simply like the taste or not.",
    }, // Answers A and B correspond to Judging and Perceiving, respectively.
  },
  {
    id: 9,
    text: "When making decisions, you usually go with:",
    answers: {
      trueText: "Your gut feeling.",
      falseText: "Detailed analysis and data.",
    }, // Answers A and B correspond to Feeling and Thinking, respectively.
  },
  {
    id: 10,
    text: "When at a wine tasting event, you prefer:",
    answers: {
      trueText: "Discussing the nuances of each wine with others.",
      falseText: "Quietly enjoying and savoring each sip.",
    }, // Answers A and B correspond to Extraversion and Introversion, respectively.
  },
  {
    id: 11,
    text: "In discussions, you tend to:",
    answers: {
      trueText: "Enjoy debating and exploring all perspectives.",
      falseText: "Seek harmony and consensus.",
    }, // Answers A and B correspond to Thinking and Feeling, respectively.
  },
  {
    id: 12,
    text: "Your favorite type of wine is usually chosen based on:",
    answers: {
      trueText: "Recommendations from sommeliers or experts.",
      falseText: "Personal past experiences and enjoyment.",
    }, // Answers A and B correspond to Intuition and Sensing, respectively.
  },
  {
    id: 13,
    text: "Which place do you prefer to hang out and drink:",
    answers: {
      trueText: "Nice and cozy wine bar with jazz music.",
      falseText: "A lively and bustling wine festival.",
    }, // Answers A and B correspond to Introversion and Extraversion, respectively.
  },
  {
    id: 14,
    text: "Your friend says -I had a bottle of wine because I was feeling down- You would:",
    answers: {
      trueText: "What happen to you? I'm here for you.",
      falseText: "Really? What kind of wine was it?",
    }, // Answers A and B correspond to Feeling and Thinking, respectively.
  },
  {
    id: 15,
    text: "When having a potluck, you would bring:",
    answers: {
      trueText: "A bottle of wine that pairs well with the dishes.",
      falseText: "A bottle of wine that you enjoy.",
    }, // Answers A and B correspond to Judging and Perceiving, respectively.
  }
  // Add more questions as needed
];
