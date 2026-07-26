const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Connect to SQLite Database
const dbPath = path.join(__dirname, 'vibe_earn.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite Database successfully!');
        
        // Create tables
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            balance REAL DEFAULT 0
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS withdrawals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            method TEXT,
            account TEXT,
            amount REAL,
            status TEXT DEFAULT 'Pending'
        )`);
    }
});

const server = http.createServer((req, res) => {
    console.log(`Request received for: ${req.url}`);

    if (req.url === '/' || req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'success', 
            message: 'Vibe Earn Cloud Backend & Database are running smoothly!',
            version: '1.0.2'
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'error', 
            message: 'Endpoint not found' 
        }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running live on port ${PORT}`);
});