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
