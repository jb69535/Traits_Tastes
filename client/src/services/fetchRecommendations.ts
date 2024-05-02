// fetchRecommendations.ts
// Author: Jun Beom
// Define the type for your answers and recommendations somewhere accessible
export interface WineRecommendation {
  Title: string;
  imageUrl: string;
  WineID: number;
  Country: string;
  Grape: string;
  Characteristics: string;
  Vintage: string;
}

// This function could be in a separate file, e.g., fetchRecommendations.ts
export const fetchRecommendations = async (mbtiResult: string | null): Promise<WineRecommendation[]> => {
  try {
    const response = await fetch("http://localhost:3001/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mbti: mbtiResult }),
    });
    console.log("response", response);

    if (!response.ok) throw new Error("Failed to fetch recommendations");

    const data: WineRecommendation[] = await response.json();
    return data;
  } catch (error) {
    console.error("fetchRecommendations error:", error);
    return []; // Returns an empty array if there's an error
  }
};
