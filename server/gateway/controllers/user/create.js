const { userService } = require("../../services/api/user.service");
const { StatusCodes } = require("http-status-codes");

class create {
  async create(req, res) {
    try {
      const response = await userService.createUser(req.body);
      res.status(StatusCodes.CREATED).json({
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

module.exports = create;
