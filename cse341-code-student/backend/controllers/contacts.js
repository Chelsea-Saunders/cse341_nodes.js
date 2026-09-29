const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET all contacts
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('contacts').find();
        const list = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single contact by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
        const list = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create contact
const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating this contact.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update contact
const updateContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating this contact");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE contact
const deleteContact = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid contact id to delete a contact.' });
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .deleteOne({ _id: userId });
        
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json(response.error || 'Contact not found');
        }
    }
    catch (err) { 
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createContact,
    updateContact, 
    deleteContact 
};