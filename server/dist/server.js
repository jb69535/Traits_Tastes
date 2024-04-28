"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Additional imports
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
db.connect(err => {
    if (err) {
        console.error("An error occurred while connecting to the DB:", err);
        throw err;
    }
    console.log("Connected to database!");
});
app.get("/search-wines", (req, res) => {
    const searchTerm = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
        const countResults = results; // Cast to CountResult[]
        const totalItems = countResults[0].total;
        const totalPages = Math.ceil(totalItems / limit);
        const query = `SELECT * FROM WineDetails WHERE 
        Title LIKE ? OR Grape LIKE ? OR Country LIKE ? OR 
        Region LIKE ? OR Appellation LIKE ? OR Type LIKE ? OR 
        Style LIKE ? OR Vintage LIKE ? LIMIT ? OFFSET ?`;
        db.query(query, [...Array(8).fill(likeTerm), limit, offset], (error, dataResults) => {
            if (error) {
                return res.status(500).send("Error occurred: " + error.message);
            }
            res.json({
                data: dataResults, // Cast to WineDetails[]
                totalItems,
                totalPages,
                currentPage: page
            });
        });
    });
});
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
