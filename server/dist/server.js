"use strict";
// server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Additional imports
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const interfaces_1 = require("./types/interfaces");
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
        console.error("An error occurred while connecting to the DB:", err);
        throw err;
    }
    console.log("Connected to database!");
});
function getCurrentWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.getTime() -
        firstDayOfYear.getTime() +
        ((firstDayOfYear.getDay() + 6) % 7) * 86400000) /
        86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
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
                currentPage: page,
            });
        });
    });
});
app.get("/weekly-rankings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
    SELECT w.WineID, w.Title, w.Grape, w.Country, w.Region, w.Vintage, s.searchCount
    FROM WineSearchCounts s
    JOIN WineDetails w ON s.wineId = w.WineID
    WHERE s.weekOfYear = WEEK(CURDATE(), 1) AND s.year = YEAR(CURDATE())
    ORDER BY s.searchCount DESC
    LIMIT 5;
`;
        const [rankings] = yield db.promise().query(query);
        res.json(rankings);
    }
    catch (error) {
        console.error("Failed to fetch weekly rankings:", error);
        res.status(500).send("Error fetching weekly rankings");
    }
}));
app.post("/record-selection", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// POST endpoint to receive answers and return wine recommendations
app.post("/api/recommendations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mbti = req.body.mbti; // MBTI result from the client
    if (!mbti) {
        res.status(400).send("MBTI result is required.");
        return;
    }
    try {
        const winePreferences = (0, interfaces_1.getWinePreferencesByMBTI)(mbti); // Assuming you have a function that maps MBTI to wine preferences
        const query = `
    SELECT 
    MAX(wd.Title) AS Title, 
    wd.Grape, 
    MAX(wd.Vintage) AS Vintage, 
    MAX(wc.Characteristics) AS Characteristics
    FROM WineDetails wd
    JOIN WineCharacteristics wc ON wd.WineID = wc.WineID
    WHERE wd.Grape IN (?)
    GROUP BY wd.Grape
    ORDER BY RAND()
    LIMIT 2;`;
        const wines = yield db.promise().query(query, [winePreferences]); // Pass the wine preferences here
        res.json(wines[0]);
    }
    catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).send("Error fetching recommendations");
    }
}));
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
