const express = require('express');
const router = express.Router();

const swaggerUi = require ('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// route for documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//route for professional module
router.use('/contacts', require('./contacts'));

module.exports = router;