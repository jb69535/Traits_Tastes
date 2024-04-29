// fetchRecommendations.ts

// Define the type for your answers and recommendations somewhere accessible
export interface WineRecommendation {
  name: string;
  description: string;
  imageUrl: string;
}

// This function could be in a separate file, e.g., fetchRecommendations.ts
export const fetchRecommendations = async (answers: {
  [key: number]: boolean;
}): Promise<WineRecommendation[]> => {
  try {
    const response = await fetch("http://localhost:3001/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) throw new Error("Failed to fetch recommendations");

    const data: WineRecommendation[] = await response.json();
    return data;
  } catch (error) {
    console.error("fetchRecommendations error:", error);
    return []; // Return an empty array in case of an error
  }
};
