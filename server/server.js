"use strict";

// Helper function to support importing ES modules in CommonJS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

// Enable usage of ES modules in CommonJS
Object.defineProperty(exports, "__esModule", { value: true });

// Importing express, mysql2, and cors with default imports to streamline usage in a CommonJS module setup
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));

// Initialize the express application
const app = (0, express_1.default)();

// Middleware to enable Cross-Origin Resource Sharing
app.use((0, cors_1.default)());

// Middleware to parse JSON bodies
app.use(express_1.default.json());

// Set up a MySQL connection using the mysql2 library
const db = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Junmysql99!',
    database: 'Traits_Tastes'
});

/**
 * HTTP GET endpoint to the root of the server that sends a welcoming JSON message.
 * @param {express_1.Request} req - The request object representing the HTTP request.
 * @param {express_1.Response} res - The response object used to send back a desired HTTP response.
 */
app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Start the server on port 3001 and log the success message
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
