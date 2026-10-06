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

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers', 
            'Origin, x-Requested-with, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}.`);
            console.log(`Docs: http://localhost:${PORT}/api-docs`);
        });
    }
});