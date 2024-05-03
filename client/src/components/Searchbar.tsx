// Searchbar.tsx
// Author: Jun Beom

import React, { useState } from "react";
import { Wine } from "../types/wineSearch";
import "../style/components/searchbar.css";
import FontLogo from "../assets/FontLgoBGRemove.svg";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(""); // State for sorting criteria
  const [filterBy, setFilterBy] = useState<string>(""); // State for filtering criteria

  const fetchWines = async (
    query: string,
    page: number,
    isDropdown: boolean = false
  ) => {
    if (!query.trim()) {
      setError("Please enter a search term");
      setIsLoading(false);
      setFilteredWines([]);
      setWines([]);
      return;
    }

    setIsLoading(true);
    setError("");
    // Include both sortBy and filterBy in the request URL
    const url = `http://localhost:3001/search-wines?search=${encodeURIComponent(
      searchTerm
    )}&page=${currentPage}&limit=${resultsPerPage}&sortBy=${sortBy}&filterBy=${filterBy}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (isDropdown) {
          setFilteredWines(jsonResponse.data); // Populate dropdown with search results
        } else {
          setWines(jsonResponse.data); // Populate main search results
          setTotalPages(jsonResponse.totalPages);
          setFilteredWines([]); // Clear dropdown after a full search
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Failed to fetch wines:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchWines = debounce(
    () => fetchWines(searchTerm, 1, true),
    300
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      debouncedFetchWines(); // This will now manage dropdown suggestions.
    } else {
      setFilteredWines([]); // Clear suggestions if the input is empty.
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    await fetchWines(searchTerm, 1, false); // Make sure the search is not for dropdown.
  };

  const handleSelect = async (wine: Wine) => {
    setSearchTerm(wine.Title);
    setFilteredWines([]);
    fetchWines(wine.Title, 1); // Assume selecting from dropdown always takes you to the first page of results

    // Notify the backend about the wine selection
    try {
      const response = await fetch(`http://localhost:3001/record-selection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wineId: wine.WineID }),
      });

      if (!response.ok) {
        throw new Error("Failed to record wine selection");
      }

      console.log("Selection recorded");
    } catch (error) {
      console.error("Error recording selection:", error);
    }
  };

  // Function to handle normal page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchWines(searchTerm, newPage);
  };

  // Function to handle jumping to the first page
  const handleFirstPage = () => {
    setCurrentPage(1);
    fetchWines(searchTerm, 1);
  };

  // Function to handle jumping to the last page
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    fetchWines(searchTerm, totalPages);
  };

  // Function to generate page numbers
  const getPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, idx) => startPage + idx
    );
  };

  // Function to handle shop click
  const handleShopClick = (wine: any) => {
    const query = `${wine.Title} ${wine.Grape} Vintage ${wine.Vintage}`;
    const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(
      query
    )}`;
    window.open(url, "_blank");
  };

  const Sidebar = () => {
    const handleSortChange = (value: string) => {
      setSortBy(value);
      fetchWines(searchTerm, 1, false); // Refetch the wines with the new sort order
      console.log("Sort BY: ", value);
    };

    const handleFilterChange = (value: string) => {
      setFilterBy(value);
      console.log("Filtering by: ", value, "Country: ", searchTerm);
      fetchWines(searchTerm, 1, false); // Refetch the wines with the new filter
      console.log(wines);
    };
    return (
      <div className="sidebar">
        <ul>
          <h4>Sort By:</h4>
          <li
            onClick={() => handleSortChange("")}
            className={sortBy === "Title" ? "active" : ""}
          >
            Default
          </li>
          <li
            onClick={() => handleSortChange("priceHighToLow")}
            className={sortBy === "priceHighToLow" ? "active" : ""}
          >
            Price High to Low
          </li>
          <li
            onClick={() => handleSortChange("priceLowToHigh")}
            className={sortBy === "priceLowToHigh" ? "active" : ""}
          >
            Price Low to High
          </li>
        </ul>
        <ul>
          <h4>Type</h4>
          <li
            onClick={() => handleFilterChange("")}
            className={filterBy === "Type" ? "active" : ""}
          >
            Default
          </li>
          <li
            onClick={() => handleFilterChange("Brown")}
            className={filterBy === "Brown" ? "active" : ""}
          >
            Brown
          </li>
          <li
            onClick={() => handleFilterChange("Orange")}
            className={filterBy === "Orange" ? "active" : ""}
          >
            Orange
          </li>
          <li
            onClick={() => handleFilterChange("Red")}
            className={filterBy === "Red" ? "active" : ""}
          >
            Red
          </li>
          <li
            onClick={() => handleFilterChange("Rose")}
            className={filterBy === "Rose" ? "active" : ""}
          >
            Rose
          </li>
          <li
            onClick={() => handleFilterChange("Tawny")}
            className={filterBy === "Tawny" ? "active" : ""}
          >
            Tawny
          </li>
          <li
            onClick={() => handleFilterChange("White")}
            className={filterBy === "White" ? "active" : ""}
          >
            White
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="search__container">
      <img className="mainLogo" src={FontLogo} alt="logo" />
      <form onSubmit={handleSearch}>
        <div className="searchbar__container">
          <input
            type="text"
            placeholder="Search your Wine"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <input type="submit" value="Search" className="search__button" />
        </div>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="dropdown">
        {filteredWines.map((wine, index) => (
          <div
            key={index}
            onClick={() => handleSelect(wine)}
            className="dropdown-content"
          >
            {wine.Title}
          </div>
        ))}
      </div>
      <div className="wine__results">
        {wines.map((wine, index) => (
          <div
            key={index}
            onClick={() => handleSelect(wine)}
            style={{ cursor: "pointer" }}
          >
            <div>{wine.Title}</div>
            <div>{wine.Grape}</div>
            <div>
              {wine.Country} | {wine.Region}
            </div>
            <div>{wine.Vintage}</div>
            <div className="goShop">
              <button onClick={() => handleShopClick(wine)}>GO Shop</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
      <Sidebar />
    </div>
  );
};

export default Searchbar;
