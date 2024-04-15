const joi = require("joi");

const registerSchema = joi.object().keys({
  username: joi.string().min(4).max(20).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is a required field",
    "string.min": "Username must be at least 4 characters long",
    "string.max": "Username must be at most 20 characters long",
  }),
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
  browserName: joi.string().optional(),
  deviceType: joi.string().optional(),
});

module.exports = registerSchema;
