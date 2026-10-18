const Validator = require('validatorjs');

const validator = (body, rules, customMessage, callback) => {
    const validation = new Validator(body, rules, customMessage);
    
    if (validation.passes()) {
        callback(null, true);
    } else {
        callback(validation.errors, false);
    }
};

module.exports = validator;
