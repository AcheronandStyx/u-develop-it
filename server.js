const express = require('express'); //  import express

const PORT = process.env.PORT || 3001; // PORT designation and the app expression, by adding the following code:
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
// this is a catchall route and will override all other. so it must be the last route
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});