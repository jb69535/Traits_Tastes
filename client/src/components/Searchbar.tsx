// Searchbar.tsx
// Author: Jun Beom

import React, { useState } from "react";
import { Wine } from "../types/wineSearch";
import "../style/components/searchbar.css";

function debounce(
  func: (...args: any[]) => void,
  wait: number
): (...args: any[]) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWines = async (query: string, isDropdown: boolean = false) => {
    if (!query.trim()) {
      // Handle empty search query before making a request.
      setError("Please enter a search term");
      setIsLoading(false);
      setFilteredWines([]);
      setWines([]);
      return;
    }

    setIsLoading(true);
    setError("");
    const url = `http://localhost:3001/search-wines?search=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (isDropdown) {
          setFilteredWines(data);
        } else {
          setWines(data);
          setFilteredWines([]);
        }
      } else {
        // Handle responses other than 2xx.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Failed to fetch wines:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchWines = debounce(() => fetchWines(searchTerm, true), 300);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchWines(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      debouncedFetchWines();
    } else {
      setFilteredWines([]); // Clear suggestions if the input is empty
    }
  };

  const handleSelect = (wineTitle: string) => {
    setSearchTerm(wineTitle); // Update the search term with the selected title
    setFilteredWines([]); // Clear dropdown after selection
    fetchWines(wineTitle); // Fetch and update the main wines list with the selected wine
  };

  return (
    <div className="search__container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search your Wine"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <input type="submit" value="Search" className="search__button" />
        <div className="dropdown">
          {filteredWines.map((wine, index) => (
            <div
              key={index}
              onClick={() => handleSelect(wine.Title)}
              className="dropdown-content"
            >
              {wine.Title}
            </div>
          ))}
        </div>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="wine__results">
        {wines.map((wine, index) => (
          <div key={index}>
            <div>{wine.Title}</div>
            <div>{wine.Grape}</div>
            <div>{wine.Country} | {wine.Region}</div>
            <div>{wine.Vintage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
