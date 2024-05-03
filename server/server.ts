// server.ts

// Additional imports
import express from "express";
import mysql from "mysql2";
import { Request, Response } from "express";
import cors from "cors";
import {
  CountResult,
  WineDetails,
  getWinePreferencesByMBTI,
  WinePricingVolume,
} from "./types/interfaces";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Junmysql99!",
  database: "Traits_Tastes",
});

db.connect((err) => {
  if (err) {
    console.error("An error occurred while connecting to the DB:", err);
    throw err;
  }
  console.log("Connected to database!");
});

function getCurrentWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (today.getTime() -
      firstDayOfYear.getTime() +
      ((firstDayOfYear.getDay() + 6) % 7) * 86400000) /
    86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

app.get("/search-wines", (req: Request, res: Response) => {
  console.log("Received request with query params:", req.query);

  const searchTerm = req.query.search as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || "Title"; // Default sorting by title
  const filterBy = req.query.filterBy as string; // Filter parameter
  const offset = (page - 1) * limit;

  if (!searchTerm) {
    res.status(400).send("Search term is required");
    return;
  }

  console.log(
    `Processing search for term: ${searchTerm}, page: ${page}, limit: ${limit}, sortBy: ${sortBy}, filterBy: ${filterBy}`
  );

  const likeTerm = `%${searchTerm}%`;
  const whereClause = filterBy
    ? `(wd.Title LIKE ? OR wd.Grape LIKE ? OR wd.Country LIKE ? OR wd.Region LIKE ? OR wd.Appellation LIKE ?) AND wd.Type = ?`
    : `wd.Title LIKE ? OR wd.Grape LIKE ? OR wd.Country LIKE ? OR wd.Region LIKE ? OR wd.Appellation LIKE ?`;

  const orderClause =
    sortBy === "priceHighToLow"
      ? "ORDER BY wpv.Price DESC"
      : sortBy === "priceLowToHigh"
      ? "ORDER BY wpv.Price ASC"
      : "ORDER BY wd.Title ASC"; // Sorting

  const countParams = filterBy
    ? [...Array(5).fill(likeTerm), filterBy]
    : Array(5).fill(likeTerm);
  const countQuery = `SELECT COUNT(*) AS total FROM WineDetails wd
      LEFT JOIN WinePricingVolume wpv ON wd.WineID = wpv.WineID
      WHERE ${whereClause}`;

  console.log("Count Query:", countQuery);
  console.log("Count Parameters:", countParams);

  db.query(countQuery, countParams, (error, results) => {
    if (error) {
      console.error("Error during count query:", error);
      return res.status(500).send("Error occurred: " + error.message);
    }

    const countResults = results as CountResult[]; // Cast to CountResult[]
    const totalItems = countResults[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    console.log(`Total items: ${totalItems}, Total pages: ${totalPages}`);

    const queryParams = filterBy
      ? [...Array(5).fill(likeTerm), filterBy, limit, offset]
      : [...Array(5).fill(likeTerm), limit, offset];
    const dataQuery = `SELECT wd.WineID, wd.Title, wd.Grape, wd.Country, wd.Region, 
        wd.Appellation, wd.Type, wd.Style, wd.Vintage, wpv.Price FROM WineDetails wd
        LEFT JOIN WinePricingVolume wpv ON wd.WineID = wpv.WineID
        WHERE ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;

    console.log("Data Query:", dataQuery);
    console.log("Query Parameters:", queryParams);

    db.query(dataQuery, queryParams, (error, dataResults) => {
      if (error) {
        console.error("Error during data query:", error);
        return res.status(500).send("Error occurred: " + error.message);
      }
      console.log("Data Results:", dataResults);
      res.json({
        data: dataResults as WineDetails[], // Cast to WineDetails[]
        totalItems,
        totalPages,
        currentPage: page,
      });
    });
  });
});

app.get("/weekly-rankings", async (req: Request, res: Response) => {
  try {
    const query = `
    SELECT w.WineID, w.Title, w.Grape, w.Country, w.Region, w.Vintage, s.searchCount
    FROM WineSearchCounts s
    JOIN WineDetails w ON s.wineId = w.WineID
    WHERE s.weekOfYear = WEEK(CURDATE(), 1) AND s.year = YEAR(CURDATE())
    ORDER BY s.searchCount DESC
    LIMIT 5;
`;
    const [rankings] = await db.promise().query(query);
    res.json(rankings);
  } catch (error) {
    console.error("Failed to fetch weekly rankings:", error);
    res.status(500).send("Error fetching weekly rankings");
  }
});

app.post("/record-selection", async (req: Request, res: Response) => {
  const { wineId } = req.body;
  const weekOfYear = getCurrentWeekNumber();
  const year = new Date().getFullYear();

  const updateCountQuery = `
      INSERT INTO WineSearchCounts (wineId, searchCount, weekOfYear, year)
      VALUES (?, 1, ?, ?)
      ON DUPLICATE KEY UPDATE searchCount = searchCount + 1;
  `;

  db.query(updateCountQuery, [wineId, weekOfYear, year], (error, results) => {
    if (error) {
      console.error("Error updating search count:", error);
      return res.status(500).send("Failed to record selection");
    }
    res.status(200).send("Selection recorded successfully");
  });
});

// POST endpoint to receive answers and return wine recommendations
app.post("/api/recommendations", async (req: Request, res: Response) => {
  const mbti = req.body.mbti; // MBTI result from the client

  if (!mbti) {
    res.status(400).send("MBTI result is required.");
    return;
  }

  try {
    const winePreferences = getWinePreferencesByMBTI(mbti); // Assuming you have a function that maps MBTI to wine preferences

    // Construct the SQL query to select wines only from the specified grape preferences
    const placeholders = winePreferences.map(() => "?").join(","); // Generate placeholders
    const query = `
    SELECT 
        wd.Title AS Title, 
        wd.Grape, 
        wd.Vintage AS Vintage, 
        wc.Characteristics AS Characteristics
    FROM WineDetails wd
    JOIN WineCharacteristics wc ON wd.WineID = wc.WineID
    WHERE wd.Grape IN (${placeholders})
    ORDER BY RAND()
    LIMIT 2;`;

    const values = winePreferences; // Prepare array of parameter values
    const wines = await db.promise().query(query, values);

    res.json(wines[0]);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).send("Error fetching recommendations");
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
