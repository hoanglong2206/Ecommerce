const { userService } = require("../../services/api/user.service");
const { StatusCodes } = require("http-status-codes");

class update {
  async update(req, res) {
    try {
      const response = await userService.updateUser(req.params.id, req.body);
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

module.exports = update;
