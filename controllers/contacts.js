const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
      const lists = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find()
      .toArray()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Invalid contact id' });
      return;
    }
    const userId = new ObjectId(req.params.id);
    const contact = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({ _id: userId });

    res.setHeader('Content-Type', 'application/json');
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json(contact);
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
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
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ _id: response.insertedId });
    } else {
      res.status(500).json(response.error || 
        'Some error occurred while creating the contact.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Invalid contact id' });
      return;
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
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
    if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Invalid contact id' });
      return;
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: userId });
    if (response.deletedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    console.error(err);
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
