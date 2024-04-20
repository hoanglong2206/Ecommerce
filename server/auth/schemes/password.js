const joi = require("joi");

const emailSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    "string.base": "Field must be valid",
    "string.required": "Field must be valid",
    "string.email": "Field must be valid",
  }),
});

const passwordSchema = joi.object().keys({
  password: joi.string().required().min(4).max(12).messages({
    "string.base": "Password should be of type string",
    "string.min": "Invalid password",
    "string.max": "Invalid password",
    "string.empty": "Password is a required field",
  }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "any.only": "Passwords should match",
    "any.required": "Confirm password is a required field",
  }),
});

const changePasswordSchema = joi.object().keys({
  currentPassword: joi.string().required().min(4).max(12).messages({
    "string.base": "Password should be of type string",
    "string.min": "Invalid password",
    "string.max": "Invalid password",
    "string.empty": "Password is a required field",
  }),
  newPassword: joi.string().required().min(4).max(12).messages({
    "string.base": "Password should be of type string",
    "string.min": "Invalid password",
    "string.max": "Invalid password",
    "string.empty": "Password is a required field",
  }),
  confirmNewPassword: joi
    .string()
    .required()
    .valid(joi.ref("newPassword"))
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm new password is a required field",
    }),
});

module.exports = {
  emailSchema,
  passwordSchema,
  changePasswordSchema,
};
