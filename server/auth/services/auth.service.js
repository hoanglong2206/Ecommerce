const config = require("../config");
const jwt = require("jsonwebtoken");
const { authChannel } = require("../server");
const AuthModel = require("../models/auth.schema");
const { publishDirectMessage } = require("../queues/auth.producer");
const { omit } = require("lodash");
const winstonLogger = require("../utils/logger");
const { Op } = require("sequelize");
const { firstLetterUppercase, lowerCase } = require("../utils/helper");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "authService",
  "debug"
);

async function createAuthUser(data) {
  try {
    const result = await AuthModel.create(data);
    const messageDetails = {
      username: result.dataValues.username,
      email: result.dataValues.email,
      photo: result.dataValues.photo,
      createAt: result.dataValues.createAt,
      type: "auth",
    };

    await publishDirectMessage(
      authChannel,
      "app-users",
      "auth-users",
      JSON.stringify(messageDetails),
      "Auth user created successfully"
    );

    const userData = omit(result.dataValues, ["password"]);
    return userData;
  } catch (error) {
    log.error(error);
  }
}

async function getAuthUserById(id) {
  try {
    const user = await AuthModel.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}
async function getUserByUsernameOrEmail(username, email) {
  try {
    const user = await AuthModel.findOne({
      where: {
        [Op.or]: [
          { username: firstLetterUppercase(username) },
          { email: lowerCase(email) },
        ],
      },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function getUserByUsername(username) {
  try {
    const user = await AuthModel.findOne({
      where: { username: firstLetterUppercase(username) },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await AuthModel.findOne({
      where: { email: lowerCase(email) },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function getAuthUserByVerificationToken(token) {
  try {
    const user = await AuthModel.findOne({
      where: { emailVerificationToken: token },
      attributes: {
        exclude: ["password"],
      },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function getAuthUserByPasswordToken(token) {
  try {
    const user = await AuthModel.findOne({
      where: {
        [Op.and]: [
          { passwordResetToken: token },
          { passwordResetExpires: { [Op.gt]: new Date() } },
        ],
      },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function getAuthUserByOTP(otp) {
  try {
    const user = await AuthModel.findOne({
      where: {
        [Op.and]: [{ otp }, { otpExpiration: { [Op.gt]: new Date() } }],
      },
    });
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

async function updateVerifyEmailField(
  authId,
  emailVerified,
  emailVerificationToken
) {
  try {
    await AuthModel.update(
      !emailVerificationToken
        ? {
            emailVerified,
          }
        : {
            emailVerified,
            emailVerificationToken,
          },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

async function updatePasswordToken(authId, token, tokenExpiration) {
  try {
    await AuthModel.update(
      {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiration,
      },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

async function updatePassword(authId, password) {
  try {
    await AuthModel.update(
      {
        password,
        passwordResetToken: "",
        passwordResetExpires: new Date(),
      },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

async function updateUserOTP(authId, otp, otpExpiration) {
  try {
    await AuthModel.update(
      {
        otp,
        otpExpiration,
      },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

function signToken(id, email, username) {
  return jwt.sign(
    {
      id,
      email,
      username,
    },
    config.JWT_TOKEN
  );
}

module.exports = {
  createAuthUser,
  getAuthUserById,
  getUserByUsernameOrEmail,
  getUserByUsername,
  getUserByEmail,
  getAuthUserByVerificationToken,
  getAuthUserByPasswordToken,
  getAuthUserByOTP,
  updateVerifyEmailField,
  updatePasswordToken,
  updatePassword,
  updateUserOTP,
  signToken,
};
