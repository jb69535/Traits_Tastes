// server.ts

// Additional imports
import express from "express";
import mysql from "mysql2";
import { Request, Response } from "express";
import cors from "cors";
import { CountResult, WineDetails } from "./types/interfaces"; // Make sure the path is correct

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
  const searchTerm = req.query.search as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  if (!searchTerm) {
    res.status(400).send("Search term is required");
    return;
  }

  const likeTerm = `%${searchTerm}%`;
  const countQuery = `SELECT COUNT(*) AS total FROM WineDetails WHERE 
      Title LIKE ? OR Grape LIKE ? OR Country LIKE ? OR 
      Region LIKE ? OR Appellation LIKE ? OR Type LIKE ? OR 
      Style LIKE ? OR Vintage LIKE ?`;

  db.query(countQuery, Array(8).fill(likeTerm), (error, results) => {
    if (error) {
      return res.status(500).send("Error occurred: " + error.message);
    }

    const countResults = results as CountResult[]; // Cast to CountResult[]
    const totalItems = countResults[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const query = `SELECT * FROM WineDetails WHERE 
        Title LIKE ? OR Grape LIKE ? OR Country LIKE ? OR 
        Region LIKE ? OR Appellation LIKE ? OR Type LIKE ? OR 
        Style LIKE ? OR Vintage LIKE ? LIMIT ? OFFSET ?`;

    db.query(
      query,
      [...Array(8).fill(likeTerm), limit, offset],
      (error, dataResults) => {
        if (error) {
          return res.status(500).send("Error occurred: " + error.message);
        }
        res.json({
          data: dataResults as WineDetails[], // Cast to WineDetails[]
          totalItems,
          totalPages,
          currentPage: page,
        });
      }
    );
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
  const answers = req.body.answers; // Assume answers are passed as an object with question IDs as keys
  console.log("Received answers:", answers);

  // Here you would typically process these answers to query the database for matching wines
  // For now, let's just return a mock response
  const mockRecommendations = [
    {
      id: 1,
      name: "Chardonnay",
      description: "A delightful white.",
      imageUrl: "/images/chardonnay.png",
    },
    {
      id: 2,
      name: "Merlot",
      description: "A soft and smooth red.",
      imageUrl: "/images/merlot.png",
    },
  ];

  // Simulate a database call
  setTimeout(() => {
    res.json(mockRecommendations);
  }, 500);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
