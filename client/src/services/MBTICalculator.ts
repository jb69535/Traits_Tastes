// MBTICalculator.ts

// Calculate MBTI result based on user's answers
export const calculateMBTIResult = (answers: {
    [key: string]: boolean;
  }): string => {
    const dichotomies: { [key: string]: number[] } = {
      E: [0, 6, 10, 13], // Extraversion
      N: [1, 4, 8, 12], // Intuition
      F: [3, 5, 9, 11, 14], // Feeling
      J: [7, 8, 9, 15], // Judging
      // Add more dichotomies if needed
    };
  
    const counters: { [key: string]: number } = {
      E: 0,
      I: 0,
      N: 0,
      S: 0,
      F: 0,
      T: 0,
      J: 0,
      P: 0,
    };
  
    for (const [questionId, answer] of Object.entries(answers)) {
      // Ensure dichotomies has entries and questionId is valid
      if (Object.keys(dichotomies).length === 0 || !Number.isInteger(parseInt(questionId))) {
        console.error('Invalid dichotomies or questionId');
        continue; // Skip iteration
      }
  
      const dichotomyEntry = Object.entries(dichotomies).find(([, ids]) =>
        ids.includes(parseInt(questionId))
      );
  
      // Check if dichotomyEntry is found
      if (!dichotomyEntry) {
        console.error(`Dichotomy entry not found for questionId ${questionId}`);
        continue; // Skip iteration
      }
  
      const dichotomy = dichotomyEntry[0];
      if (answer) {
        counters[dichotomy]++;
      } else {
        counters[dichotomy === "E" || dichotomy === "I" ? "I" : "P"]++;
      }
    }
  
    let result = "";
    result += counters.E > counters.I ? "E" : "I";
    result += counters.N > counters.S ? "N" : "S";
    result += counters.F > counters.T ? "F" : "T";
    result += counters.J > counters.P ? "J" : "P";
  
    return result;
  };
  
