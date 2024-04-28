"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const db = mysql2_1.default.createConnection({
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
app.get("/", (req, res) => {
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
app.get("/search-wines", (req, res) => {
    const searchTerm = req.query.search;
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
