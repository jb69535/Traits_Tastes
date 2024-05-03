// interfaces.ts

export interface CountResult {
  total: number;
}

export interface WineDetails {
  WineID: number;
  Title: string;
  Grape: string;
  SecondaryGrapeVarieties: string;
  Closure: string;
  Country: string;
  Region: string;
  Appellation: string;
  Type: string;
  Style: string;
  Vintage: string;
}

export interface WinePricingVolume {
  WineID: number;
  Price: number;
}


// Define a type for MBTI preferences mapping
type MBTIPreferences = { [key: string]: string[] };

// Function to retrieve wine grape preferences based on MBTI types
export function getWinePreferencesByMBTI(mbti: string): string[] {
  const preferences: MBTIPreferences = {
    "ESTJ": ["Cabernet Sauvignon", "Merlot", "Chardonnay"],
    "ESFJ": ["Prosecco", "Pinot Noir", "Riesling"],
    "ESTP": ["Zinfandel", "Syrah", "Barbera"],
    "ESFP": ["Moscato", "Beaujolais", "Grenache"],
    "ENFJ": ["Prosecco", "Cabernet Franc", "Chardonnay"],
    "ENFP": ["Beaujolais", "Gewürztraminer", "Malbec"],
    "ENTJ": ["Shiraz", "Nebbiolo", "Bordeaux"],
    "ENTP": ["Zinfandel", "Sauvignon Blanc", "Barbera"],
    "ISTJ": ["Bordeaux", "Sauvignon Blanc", "Cabernet Franc"],
    "ISFJ": ["Merlot", "Chardonnay", "Pinot Grigio"],
    "ISTP": ["Shiraz", "Cabernet Sauvignon", "Malbec"],
    "ISFP": ["Riesling", "Rosé", "Pinot Noir"],
    "INTJ": ["Cabernet Sauvignon", "Barolo", "Bordeaux"],
    "INTP": ["Pinot Noir", "Chenin Blanc", "Riesling"],
    "INFJ": ["Merlot", "Pinot Grigio", "Syrah"],
    "INFP": ["Moscato", "Rosé", "Grenache"]
  };

  // Check if the MBTI type is present in the preferences mapping, otherwise return an empty array
  return preferences[mbti] || [];
}
