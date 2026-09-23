const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));

// route for professional (week 2 group activiy/assignment)
// app.use('/professional', require('./professional'));

// const mongodb = require(./connect');
// const getProfessionalData = async (req, res) => {
//     const result = await mongodb.getDb().db().collection('user').find();
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/js');
//         res.status(200).json(lists[0]);
//     });
// };

module.exports = router;