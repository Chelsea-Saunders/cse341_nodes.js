const express = require('express');
const connectDB = require('./mongoose/db/connections');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.send('API is running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!!`);
});