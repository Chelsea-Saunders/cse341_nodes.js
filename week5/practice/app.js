require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB database');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
            console.log(`GraphQL Interface: http://localhost${PORT}/graphql`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
