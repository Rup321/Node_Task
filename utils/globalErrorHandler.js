import { CustomError } from './customErrors.js';
import * as dbOperations from '../utils/dbOperations.js';
import db from '../src/models/index.js';

export function globalErrorHandler(err, req, res, next) {
  console.log(err);
  setImmediate(() => {
    const userData = req.userData;

    dbOperations
      .create({
        model: db.errorLogger,
        body: {
          message: err.message,
          method: req.method,
          base_url: req.originalUrl,
          user_data: typeof userData === 'object' ? JSON.stringify(userData) : userData,
          meta: err.stack,
          error: String(err),
        },
      })
      .catch((dbError) => {
        console.error('[Error Logger DB Insert Failed] =>', dbError);
        console.error('[Original Unlogged Error] =>', err);
      });
  });

  const isCustomError = err instanceof CustomError;
  const isSequelizeValidationError = err.name === 'SequelizeValidationError';
  const isSequelizeUniqueConstraintError = err.name === 'SequelizeUniqueConstraintError';

  const statusCode = isSequelizeValidationError
    ? 400
    : isSequelizeUniqueConstraintError
      ? 409
      : err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  let responseMessage =
    isProduction && statusCode === 500 && !isCustomError
      ? 'An unexpected internal system error occurred. Please try again later.'
      : err.message;

  const errorResponse = {
    success: false,
    statusCode: statusCode,
    error: isSequelizeValidationError
      ? 'Validation Error'
      : isSequelizeUniqueConstraintError
        ? 'Conflict'
        : err.name === 'BadRequestError'
          ? 'Bad Request'
          : err.name || 'InternalServerError',
    message: responseMessage,
  };

  if (isSequelizeValidationError) {
    errorResponse.message = err.errors?.map((validationError) => validationError.message).join(', ') || err.message;
  }

  if (isSequelizeUniqueConstraintError) {
    errorResponse.error = 'Conflict';
    errorResponse.message = err.errors?.map((validationError) => validationError.message).join(', ') || err.message;
  }

  if (!isProduction && !isCustomError) {
    errorResponse.stack = err.stack;
    if (err.keyValue) errorResponse.keyValue = err.keyValue;
  }

  return res.status(statusCode).json(errorResponse);
}
