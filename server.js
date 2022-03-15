const express = require('express'); //  import express
const mysql = require('mysql2'); // import the mysql2 package
const inputCheck = require('./utils/inputCheck'); // Import the validation functions

const PORT = process.env.PORT || 3001; // PORT designation and the app expression, by adding the following code:
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'AppleDapple978#',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => { // HTTP request method post() to insert a candidate into the candidates table.
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) { // If the inputCheck() function returns an error, an error message is returned to the client as a 400 status code
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


// Get a single candidate
app.get('/api/candidate/:id', (req, res) => { // the endpoint has a route parameter that will hold the value of the id to specify which candidate we'll select from the database.
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id]; // we'll assign the captured value populated in the req.params object with the key id to params

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`; // The SQL statement SELECT * FROM candidates is assigned to the sql variable.
    // Instead of logging the error, we'll send a status code of 500 and place the error message within a JSON object. 
    // This will all be handled within the error-handling conditional. The 500 status code indicates a server error—
    db.query(sql, (err, rows) => {
        if (err) { // 
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ // If there was no error, then err is null and the response is sent back using the following statement:
            message: 'success',
            data: rows
        });
    });
});


// Default response for any other request (Not Found)
// this is a catchall route and will override all other. so it must be the last route
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});