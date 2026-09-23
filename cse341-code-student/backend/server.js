// connect to mongo
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}.`);
        });
    }
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port${PORT}`);
        });
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
}

// startServer();