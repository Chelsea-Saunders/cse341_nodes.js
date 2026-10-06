// connect to mongo
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

// app.use('/', require('./routes'));

app
    .use(cors())
    .use(express.json())
    .use((req, res, next) => {
        const path = req.originalUrl || req.url || '';
        res.setHeader(
            'Access-Control-Allow-Origin',
            '*'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );

            if (!path.includes('/api-docs')) {
                res.setHeader('Content-Type', 'application/json');
            }
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