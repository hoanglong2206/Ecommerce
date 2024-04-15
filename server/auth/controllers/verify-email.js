const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../utils/error-handler");
const {
  getAuthUserByVerificationToken,
  updateVerifyEmailField,
  getAuthUserById,
} = require("../services/auth.service");

async function verifyEmail(req, res) {
  const { token } = req.body;
  const checkUser = await getAuthUserByVerificationToken(token);

  if (!checkUser) {
    throw new BadRequestError(
      "Verification token is either invalid or is already used.",
      "Verify email error"
    );
  }

  await updateVerifyEmailField(checkUser.id, 1);
  const updatedUser = await getAuthUserById(checkUser.id);

  res.status(StatusCodes.OK).json({
    message: "Email verified successfully",
    user: updatedUser,
  });
}

module.exports = verifyEmail;
