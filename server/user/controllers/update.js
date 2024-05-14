const userSchema = require("../schemes/user");
const { updateUser } = require("../services/user.service");
const { StatusCodes } = require("http-status-codes");

const update = async (req, res) => {
  const { error } = await Promise.resolve(userSchema.validate(req.body));

  if (error?.details) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  const user = {
    fullName: req.body.fullName,
    photo: req.body.photo,
    gender: req.body.gender,
    birthday: req.body.birthday,
  };

  const newUser = await updateUser(req.params.id, user);

  res.status(StatusCodes.CREATED).json({
    message: "User updated successfully",
    user: newUser,
  });
};

module.exports = update;
