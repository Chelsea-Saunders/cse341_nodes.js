require('dotenv').config();

const express = require('express');
const app = express();
const mongodb = require('./db/connect');
// const MongoClient = require('mongodb').MongoClient;
// const path = require('path');
const port = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./routes'));

// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));

// connect mongo
// const mongodb = process.env.MONGO_URI;
// if (!mongodb) {
//     console.error("error: MONGO_URI is not defined in you .env/!");
// }

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`);
        });
    }
});

// console.log('May Node be with you');

// MongoClient.connect(mongodb)
//     .then(client => {
//         console.log('Connected to Database');
//         const db = client.db('star_wars');
//         const quotesCollection = db.collection('quotes');

//         // tells express to use ejs for templates
//         app.set('views', path.join(__dirname, 'views'));
//         app.set('view engine', 'ejs');

//         app.put('/quotes', (req, res) => {
//             quotesCollection
//                 .findOneAndUpdate(
//                     { name: 'yoda' }, 
//                     {
//                         $set: {
//                             name: req.body.name,
//                             quote: req.body.quote
//                         }
//                     },
//                     { upsert: true }
//                 )
//                 .then(result => {
//                     res.json('Success');
//                 })
//                 .catch(error=> console.error(error));
//         });

//         // GET route to fetch quotes from DB and pass them to indes.ejs
//         app.get('/', (req, res) => {
//             quotesCollection
//                 .find()
//                 .toArray()
//                 .then(results => {
//                     console.log(results)
//                     res.render('index.ejs', { quotes: results });
//             })
//             .catch(error => console.error(error))
//         });

//         app.post('/quotes', (req, res) => {
//             console.log('Form received:', req.body);

//             quotesCollection
//                 .insertOne(req.body)
//                 .then(result => {
//                     console.log('Quote inserted successfully!');
//                     res.redirect('/'); // refresh browser and stop loading
//                 })
//                 .catch(error=> console.error(error))
//         });

//         app.delete('/quotes', (req, res) => {
//             quotesCollection
//                 .deleteOne({ name: req.body.name })
//                 .then(result => {
//                     if (result.deletedCount === 0) {
//                         return res.json('No quote to delete')
//                     }
//                     res.json(`Delete Darth Vader's quote`)
//                 })
//                 .catch(error => console.error(error))
//         })
        
//         app.listen(3000, function() {
//             console.log('listening on 3000');
//         });
//     })
//     .catch(error => {
//         console.error('Failed to connect to MongoDB:', error);
//     });
