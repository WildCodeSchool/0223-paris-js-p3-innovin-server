const joi = require("joi");

const userSchema = joi.object({
    lastName: joi.string().min(2).required(),
    firstName: joi.string().min(2).required(),
    birthday: joi.string().min(2).required(),
    phone: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   repeatPassword: joi.ref("password")
    // repeatPassword: joi.string().required().equal(joi.ref('password'))

}).with('password', 'repeatPassword');

module.exports = userSchema;

