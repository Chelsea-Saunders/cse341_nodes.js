const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
      const lists = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find()
      .toArray()
    res.status(200).json(lists);

  } catch(err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
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
    
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json(contact);
  } catch(err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
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
      
    res.status(201).json({ _id: response.insertedId });
  } catch(err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
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

    if(response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
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
      return res.status(404).json({ message: 'Contact not found'});
    }

      res.status(200).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
