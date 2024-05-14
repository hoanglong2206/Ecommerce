const User = require("../models/user.scheme");
const mongoose = require("mongoose");

const getUserById = async (id) => {
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(id),
    role: "user",
  }).exec();

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email, role: "user" }).exec();

  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username, role: "user" }).exec();

  return user;
};

const createUser = async (user) => {
  const checkUser = await getUserByEmail(`${user.email}`);
  if (checkUser) {
    return { error: "Email already exists" };
  } else {
    await User.create(user);
  }
};

const updateUser = async (id, user) => {
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        fullName: user.fullName,
        username: user.username,
        photo: user.photo,
        gender: user.gender,
        birthday: user.birthday,
      },
    },
    {
      new: true,
    }
  ).exec();

  return updatedUser;
};

// const getAllUsers = async () => {
//   const users = await User.find({ role: "user" }).exec();

//   return users;
// };

const updateUserPurchase = async (userId, productId, type) => {
  await User.updateOne(
    { _id: userId },
    type === "add-product"
      ? { $push: { productPurchased: productId } }
      : { $pull: { productPurchased: productId } }
  ).exec();
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
  updateUser,
  updateUserPurchase,
};
