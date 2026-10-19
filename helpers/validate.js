const Validator = require('validatorjs');

const saveContact = (req, res, next) => {
    // treat four of five fields as required settings
    const rules = {
        firstName: 'required|string',
        lastName: 'required|string', 
        email: 'required|string',
        favoriteColor: 'requred|string',
        birthday: Date
    };

    const validation = new Validator(req.body, rules);

    if (validation.passes()) {
        return next();
    }

    return res.status(400).json({
        message: 'Validation failed',
        errors: validation.errors.all()
    });
};

module.exports = saveContact;
