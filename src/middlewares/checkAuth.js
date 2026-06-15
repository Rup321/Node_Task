import { verifyAccessToken } from '../../utils/jwt.js';
import { UnauthorizedError } from '../../utils/customErrors.js';

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required. Please provide a valid Bearer token.');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Malformed authorization header. Token missing.');
    }

    const decodedPayload = verifyAccessToken(token);
    req.userData = decodedPayload;

    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        return next(new UnauthorizedError('Access token has expired. Please use your refresh token.'));
      case 'JsonWebTokenError':
        return next(new UnauthorizedError('Invalid access token signature or format.'));
      default:
        // For any other unexpected errors, forward them to the global handler
        next(error);
    }
  }
};
