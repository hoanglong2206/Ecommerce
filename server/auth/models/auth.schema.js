const { sequelize } = require("../database");
const bcryptjs = require("bcryptjs");
const { DataTypes } = require("sequelize");

const SALT_ROUND = 12;

const AuthModel = sequelize.define(
  "auth",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://res.cloudinary.com/dalz888e7/image/upload/v1684910195/my_image_user/default-user.jpg.jpg",
    },
    passwordResetToken: { type: DataTypes.STRING, allowNull: true },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    otp: {
      type: DataTypes.STRING,
    },
    otpExpiration: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    createAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["username"],
      },
      {
        unique: true,
        fields: ["emailVerificationToken"],
      },
    ],
  }
);

AuthModel.addHook("beforeCreate", async (auth) => {
  const hashedPassword = await bcryptjs.hash(
    auth.dataValues.password,
    SALT_ROUND
  );
  auth.dataValues.password = hashedPassword;
});

AuthModel.prototype.comparePassword = async function (
  password,
  hashedPassword
) {
  return bcryptjs.compare(password, hashedPassword);
};

AuthModel.prototype.hashPassword = async function (password) {
  return bcryptjs.hash(password, SALT_ROUND);
};

AuthModel.sync({});

module.exports = AuthModel;
