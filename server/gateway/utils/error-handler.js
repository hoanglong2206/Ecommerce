const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, comingFrom) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeErrors() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = "error";

  constructor(message, comingFrom) {
    super(message, comingFrom);
  }
}

class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = "error";

  constructor(message, comingFrom) {
    super(message, comingFrom);
  }
}

class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = "error";

  constructor(message, comingFrom) {
    super(message, comingFrom);
  }
}

class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = "error";

  constructor(message, comingFrom) {
    super(message, comingFrom);
  }
}

class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = "error";

  constructor(message, comingFrom) {
    super(message, comingFrom);
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  FileTooLargeError,
  ServerError,
};
