const Validator = require('validatorjs');

const validationRules = {
        firstName: 'required|string', 
        lastName: 'required|string', 
        email: 'required|email', 
        favoriteColor: 'string',
        birthday: 'required|date'
    };

const saveContact = (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ message: 'Request body is required' });
    }
    const validation = new Validator(req.body, validationRules);

    if (validation.passes()) {
        return next();
    }

    return res.status(400).json({
        message: 'Validation failed', 
        errors: validation.errors.all()
    });
};

module.exports = {
    saveContact
};