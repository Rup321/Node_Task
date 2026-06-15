import crypto from "crypto";

// Safely catches operational errors and forwards them to your global error handler middleware.
export const errorWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Generates a cryptographically secure 6-digit numeric OTP
export const generateSecureOTP = () =>
  crypto.randomInt(100000, 1000000).toString();

// Computes database-ready limit and offset pagination fields
export const getPagination = ({ page = 1, limit = 10 }) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;

  const offset = (parsedPage - 1) * parsedLimit;

  return { offset, limit: parsedLimit, page: parsedPage };
};

// Formats data lists into structured pagination metadata objects
export const paginatedResponse = ({ page, limit, totalCount, responses }) => {
  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;

  return {
    page: parsedPage,
    limit: parsedLimit,
    totalCount,
    totalPages: Math.ceil(totalCount / parsedLimit) || 0,
    responses,
  };
};

export const isTrue = (value) => ["true", "yes", 1, true].includes(value);

export function handleSuccess(message, data = {}) {
  const response = {
    success: true,
    message: message,
    data,
  };
  return response;
}
