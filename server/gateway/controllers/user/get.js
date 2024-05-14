const { userService } = require("../../services/api/user.service");
const { StatusCodes } = require("http-status-codes");

class get {
  async id(req, res) {
    try {
      const response = await userService.getUserById(req.params.id);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.response.data.message,
      });
    }
  }

  async username(req, res) {
    try {
      const response = await userService.getUserByUsername(req.params.username);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.response.data.message,
      });
    }
  }

  async email(_req, res) {
    try {
      const response = await userService.getUserByEmail();
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.response.data.message,
      });
    }
  }
}

module.exports = get;
