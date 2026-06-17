import httpStatus from 'http-status';

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation Error') {
    super(message, httpStatus.BAD_REQUEST);
  }
}

export class NoDataFoundError extends CustomError {
  constructor(message = 'No Data Found') {
    super(message, httpStatus.NOT_FOUND);
  }
}

export class DataFoundError extends CustomError {
  constructor(message = 'Data Found') {
    super(message, httpStatus.CONFLICT);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, httpStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, httpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(message, httpStatus.FORBIDDEN);
  }
}

export class UnprocessableEntityError extends CustomError {
  constructor(message = 'Unprocessable Entity') {
    super(message, httpStatus.UNPROCESSABLE_ENTITY);
  }
}
