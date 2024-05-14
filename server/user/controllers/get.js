const {
  getUserById,
  getUserByEmail,
  getUserByUsername,
} = require("../services/user.service");
const { StatusCodes } = require("http-status-codes");

const id = async (req, res) => {
  const user = await getUserById(req.currentUser.id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
  }

  res.status(StatusCodes.OK).json({
    message: "User Profile",
    user,
  });
};

const email = async (req, res) => {
  const user = await getUserByEmail(req.params.email);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
  }

  res.status(StatusCodes.OK).json({
    message: "User Profile",
    user,
  });
};

const username = async (req, res) => {
  const user = await getUserByUsername(req.params.username);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
  }

  res.status(StatusCodes.OK).json({
    message: "User Profile",
    user,
  });
};

module.exports = {
  id,
  email,
  username,
};
