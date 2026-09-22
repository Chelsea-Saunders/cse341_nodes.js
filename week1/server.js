// require('dotenv').config(); // loads .env for the entire application

const express = require("express");
const connectDB = require('./mongoosedbconnection/db/connection');

const app = express();

connectDB();
app.use(express.json({extended: false}));

app.use('/api/userModel', require('./mongoosedbconnection/api/user'));
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Server started!!');
});
