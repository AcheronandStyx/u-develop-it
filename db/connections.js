const mysql = require('mysql2'); // import the mysql2 package

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'AppleDapple978#',
    database: 'election'
});

module.exports = db; // export the connection function