const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
// const { module } = require('mongoose');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

module.exports = router;