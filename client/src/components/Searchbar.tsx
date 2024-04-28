// Searchbar.tsx
// Author: Jun Beom

import React, { useState } from "react";
import { Wine } from "../types/wineSearch";

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wines, setWines] = useState<Wine[]>([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/search-wines?search=${searchTerm}`
      );
      const data = await response.json();
      setWines(data);
    } catch (error) {
      console.error("Failed to fetch wines:", error);
    }
  };

  return (
    <div>
      <div className="search__container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search your Wine"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input type="submit" value="Search" className="search__button" />
        </form>
        <div className="wine__results">
          {wines.map((wine, index) => (
            <div key={index}>
              <div>{wine.Title}</div>
              <div>{wine.Grape}</div>
              <div>{wine.Vintage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
