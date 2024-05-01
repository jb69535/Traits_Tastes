// Rankings.tsx
// Author: Jun Beom

import React from "react";
import { useState, useEffect } from "react";
import { Wine } from "../types/wineSearch";
import "../style/components/rankings.css";

const Rankings: React.FC = () => {
  const [rankings, setRankings] = useState<Wine[]>([]); // Add type annotation for rankings state variable
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle shop click
  const handleShopClick = (wine: any) => {
    const query = `${wine.Title} ${wine.Grape} Vintage ${wine.Vintage}`;
    const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("http://localhost:3001/weekly-rankings");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Rankings Data:", data);
        setRankings(data);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch weekly rankings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (isLoading) {
    return <div className="ranking-loading">Loading...</div>;
  } else if (error) {
    return <div className="ranking-error">{error}</div>;
  }

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Weekly Rankings</h2>
      <ul className="ranking-list">
        {rankings.map((wine, index) => (
          <li key={index}>
            <div>
              <span className="ranking-number">{index + 1}. - </span>
              <strong>{wine.Title}</strong> - {wine.Grape}
            </div>
            <br />
            <div>
              Country: {wine.Country} | Region: {wine.Region || "N/A"}
            </div>
            <br />
            <div>Vintage: {wine.Vintage}</div>
            <div className="goShop">
              <button onClick={() => handleShopClick(wine)}>GO Shop</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
