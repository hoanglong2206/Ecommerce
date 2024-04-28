const joi = require("joi");

const userSchema = joi.object().keys({
  fullName: joi.string().required().messages({
    "string.base": "FullName must be of type string",
    "string.empty": "FullName is required",
    "any.required": "FullName is required",
  }),
  _id: joi.string().optional(),
  id: joi.string().optional(),
  username: joi.string().required().messages({
    "string.base": "Username must be of type string",
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  email: joi.string().email().required().messages({
    "string.base": "Email must be of type string",
    "string.email": "Invalid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  photo: joi.string().optional(),
  gender: joi.string().optional(),
  birthday: joi.date().optional(),
  role: joi.string().optional(),
  createAt: joi.string().optional(),
});

module.exports = userSchema;
