// server.ts

import express from "express";
import { Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";

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
    console.error("An error occurred while connecting to the DB");
    throw err;
  }
  console.log("Connected to database!");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

app.get("/get-data", (req, res) => {
  db.query("SELECT * FROM WineDetails", (error, results, fields) => {
    if (error) {
      return res.status(500).send("Error occurred: " + error.message);
    }
    res.json(results);
  });
});

app.get("/search-wines", (req: Request, res: Response) => {
  const searchTerm = req.query.search as string;
  if (!searchTerm) {
    res.status(400).send("Search term is required");
    return;
  }
  const query = `SELECT * FROM WineDetails WHERE 
      Title LIKE ? OR 
      Grape LIKE ? OR 
      Country LIKE ? OR 
      Region LIKE ? OR 
      Appellation LIKE ? OR 
      Type LIKE ? OR 
      Style LIKE ? OR 
      Vintage LIKE ?`;
  const likeTerm = `%${searchTerm}%`;
  db.query(query, Array(8).fill(likeTerm), (error, results) => {
    if (error) {
      return res.status(500).send("Error occurred: " + error.message);
    }
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
