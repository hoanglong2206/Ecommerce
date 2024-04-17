const joi = require("joi");

const loginSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    "string.base": "Email must be of type string",
    "string.email": "Invalid email",
    "string.empty": "Email is a required field",
  }),
  password: joi.string().min(4).max(12).required().messages({
    "string.base": "Password must be of type string",
    "string.min": "Invalid password",
    "string.max": "Invalid password",
    "string.empty": "Password is a required field",
  }),
});

module.exports = loginSchema;
