const { StatusCodes } = require("http-status-codes");
const {
  getAuthUserByVerificationToken,
  updateVerifyEmailField,
  getAuthUserById,
} = require("../services/auth.service");

async function verifyEmail(req, res) {
  const { token } = req.body;
  const checkUser = await getAuthUserByVerificationToken(token);

  if (!checkUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Invalid verification token",
    });
  }

  await updateVerifyEmailField(checkUser.id, 1);
  const updatedUser = await getAuthUserById(checkUser.id);

  res.status(StatusCodes.OK).json({
    message: "Email verified successfully",
    user: updatedUser,
  });
}

module.exports = verifyEmail;
