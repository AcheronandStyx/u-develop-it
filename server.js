const express = require('express'); //  import express
const db = require('./db/connections'); // import the connection function
const inputCheck = require('./utils/inputCheck'); // Import the validation functions

const PORT = process.env.PORT || 3001; // PORT designation and the app expression, by adding the following code:
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add near the top of the file
const apiRoutes = require('./routes/apiRoutes');

// Add after Express middleware
app.use('/api', apiRoutes); // By adding the /api prefix here, we can remove it from the individual route expressions after we move them to their new home.

// Default response for any other request (Not Found)
// this is a catchall route and will override all other. so it must be the last route
app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('Database Conencted.');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});