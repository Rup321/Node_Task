import httpStatus from 'http-status';

/**
 * Validates a specific request object property against a Joi schema.
 * @param {Object} schema - The Joi validation schema
 * @param {String} source - The request property to validate ('body', 'query', or 'params')
 */
export const validate =
  (schema, source = 'body') =>
  async (req, res, next) => {
    try {
      const dataToValidate = req[source];

      const validatedData = await schema.validateAsync(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      req[source] = validatedData;

      next();
    } catch (error) {
      const cleanMessage = error.isJoi ? error.message.replace(/"/g, '') : error.message;

      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: cleanMessage,
      });
    }
  };
