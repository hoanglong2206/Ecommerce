const joi = require("joi");

const loginSchema = joi.object().keys({
  username: joi.alternatives().conditional(joi.string().email(), {
    then: joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
    }),
    otherwise: joi.string().min(4).max(12).required().messages({
      "string.base": "Username must be of type string",
      "string.min": "Invalid username",
      "string.max": "Invalid username",
      "string.empty": "Username is a required field",
    }),
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

module.exports = loginSchema;
