const userSchema = require("../schemes/user");
const { createUser, getUserByEmail } = require("../services/user.service");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
  const { error } = await Promise.resolve(userSchema.validate(req.body));

  if (error?.details) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  const { email } = req.body;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already exists",
    });
  }

  const user = {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    photo: req.body.photo,
  };

  const newUser = await createUser(user);

  res.status(StatusCodes.CREATED).json({
    message: "User created successfully",
    user: newUser,
  });
};

module.exports = create;
